function Table(params) {
  const attrs = Object.assign(
    {
      id: getRandomId(),
      container: document.body,
      data: [], // all data
      headers: [], // column configs
      cellHeight: 60, // height of each cells in table body
      sortable: true,
      gap: 10,
      onSort: () => {}
    },
    params
  );

  let store,
    container, // container div (d3 selection)
    table, // table.choropleth div
    tableHeader, // header div
    tableRow, // table rows (d3 selection)
    tBody, // table body div
    tableHeadCells, // table header cells (d3 selection)
    transitionDuration = 1000, // how long should the transition take
    headers = attrs.headers, // headers passed from main.js
    currentSort = null, // current sort column
    sumOfRatios;

  const getValue = (d, propName) => {
    let prop = propName;
    if (typeof propName === "function") {
      prop = propName(d);
    }
    return d[prop];
  };

  function main() {

    store = new DataStore(attrs.data);
    container = d3.select(attrs.container);
    currentSort = headers.find((d) => d.order);

    table = container.patternify({
      tag: "div",
      selector: "table-grid",
    });

    tableHeader = table.patternify({
      tag: "div",
      selector: "table-header",
    });

    tBody = table
      .patternify({
        tag: "div",
        selector: "table-body",
      })
      .style("position", "relative");

    drawAll();
  }

  function drawAll(resize) {
    sumOfRatios = d3.sum(headers, d => d.widthRatio || 1);
    tBody.classed("h-scrollable", true);

    addTableHead(resize);
    addTableBody();

    if (attrs.sortable) {
      if (currentSort) {
        sortTableBy(currentSort, false);
      }
    }
  }

  function addTableHead(resize) {
    tableHeadCells = tableHeader
      .patternify({
        tag: "div",
        selector: "table-head",
        data: headers,
      })
      .attr("class", (d, i) => {
        return (
          "table-head" +
          (d.isMainColumn ? " main-column" : "") +
          (d.class ? " " + d.class : "")
        );
      })
      .style("width", getWidth);

    tableHeadCells.each(function (d) {
      if (resize && d.isMainColumn) {
        return;
      }

      if (d.headerTemplate && typeof d.headerTemplate === "function") {
        d.headerTemplate(d).then((html) => {
          d3.select(this).html(html);
        });
      } else {
        d3.select(this).html(d.name);
      }
    });

    // click events for the columns with has sort true
    tableHeadCells
      .filter((d) => d.sort)
      .on("click", (e, d) => {
        if (d.order == "asc") {
          d.order = "desc";
        } else {
          d.order = "asc";
        }

        sortTableBy(d);
      });
  }

  function addTableBody() {
    tableRow = tBody
      .patternify({
        tag: "div",
        selector: "table-row",
        data: store.currentData,
      })
      .style("left", "0px")
      .style("top", function (d, i) {
        return i * (attrs.cellHeight + attrs.gap) + "px";
      });

    tableRow.each(function (d, i) {
      const that = d3.select(this);

      const tableData = that
        .patternify({
          tag: "div",
          selector: "table-data",
          data: headers,
        })
        .attr("class", (d) => {
          return (
            "table-data" +
            (d.isMainColumn ? " main-column" : " value-column") +
            (d.class ? " " + d.class : "")
          );
        })
        .style("width", getWidth)
        .style("height", attrs.cellHeight + "px");

      tableData
        .patternify({
          tag: "div",
          selector: "table-data-inner",
          data: (m) => [m],
        })
        .html((x) => {
          if (x.cellTemplate && typeof x.cellTemplate === "function") {
            return x.cellTemplate({
              ...d,
              value: getValue(d, x.propName),
            });
          }

          return getValue(d, x.propName);
        });
    });
  }

  function sortTableBy(d, animate = true) {
    if (!d.sort) return;

    // grey out all icons and clear order property for other headers
    tableHeadCells
      .filter((d) => d.sort)
      .each(function (x) {
        const icon = d3.select(this);

        if (x.id === d.id) {
          icon.classed("active", true);
          icon.classed(x.order === "asc" ? "desc" : "asc", false);
          icon.classed(x.order, true);
        } else {
          x.order = null;
          icon.classed("active", false);
          icon.classed("desc", false);
          icon.classed("asc", false);
        }
      });

    // sorting table rows
    tableRow
      .sort((a, b) => d.sort(a, b, d.order))
      .transition()
      .duration(animate ? transitionDuration : 0)
      .style("top", (_, i) => {
        return i * (attrs.cellHeight + attrs.gap) + "px";
      });

    currentSort = d;

    tBody.node().scrollTop = 0;

    attrs.onSort(d);
  }

  function getWidth(d) {
    const percent = (d.widthRatio || 1) / sumOfRatios;
    return percent * 100 + "%";
  }

  main.filter = function (filterFunction) {
    store.filter(filterFunction);

    addTableBody();

    if (currentSort && attrs.sortable) {
      sortTableBy(currentSort, false);
    }
    
    return main;
  };

  main.highlight = function (searchFunction) {
    tableRow.classed("selected", searchFunction);

    let found = null;

    tBody.style("scroll-behavior", "initial");
    
    tableRow.filter(searchFunction).each(function(d, i) {
      if (i === 0) {
        found = this;
      }
    });

    if (found) {
      tBody.node().scrollTop = found.offsetTop;
    } else {
      tBody.node().scrollTop = 0;
    }

    tBody.style("scroll-behavior", null);

    return main;
  };

  main.render = function () {
    main();

    let tableWidth = window.innerWidth;

    // window resize
    d3.select(window).on("resize." + attrs.id, function () {
      
      if (tableWidth !== window.innerWidth) {
        drawAll(true);
      }

      tableWidth = window.innerWidth;
    });

    return main;
  };

  main.sortTableBy = sortTableBy;

  return main;
}