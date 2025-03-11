function ListView(params) {
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
    tableRow, // table rows (d3 selection)
    tBody, // table body div
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

    tBody = table
      .patternify({
        tag: "div",
        selector: "table-body",
      })
      .style("position", "relative");

    drawAll();
  }

  function drawAll(resize) {
    sumOfRatios = d3.sum(headers, (d) => d.widthRatio || 1);
    tBody.classed("h-scrollable", true);

    addTableBody();

    if (attrs.sortable) {
      if (currentSort) {
        sortTableBy(currentSort, false);
      }
    }
  }

  function addTableBody() {
    const rankHeader = headers.find((d) => d.id === 0);
    const companyHeader = headers.find((d) => d.id === 2);
    const scoreHeader = headers.find((d) => d.id === 5);

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

    const toggler = tableRow.patternify({
      tag: "button",
      selector: "toggler",
      data: (d) => [d],
    });

    const companyAndRank = toggler
      .patternify({
        tag: "div",
        selector: "table-company-and-rank",
        data: (d) => [d],
      })
      .html((d) => {
        const rank = d[rankHeader.propName];
        const name = d[companyHeader.propName];
        return `
          ${ordinal_suffix_of(rank)} ${name} ${scoreHeader.cellTemplate({
          value: d[scoreHeader.propName],
        })}
        `;
      });

    toggler
      .patternify({
        tag: "div",
        selector: "toggler-arrow",
        data: (d) => [d],
      })
      .html(ARROW_DOWN_LIST);

    const visibleRows = [0, 1, 3, 4];

    const listItemContent = tableRow.patternify({
      tag: "div",
      selector: "list-item-content",
      data: (d) => [d],
    });

    const contentItems = listItemContent
      .patternify({
        tag: "div",
        selector: "content-item",
        data: (d) =>
          headers
            .filter((d) => visibleRows.includes(d.id))
            .map((x) => {
              return {
                header: x,
                datum: d,
              };
            }),
      })
      .html((d) => {
        let htmlContent = getValue(d.datum, d.header.propName);

        if (
          d.header.cellTemplate &&
          typeof d.header.cellTemplate === "function"
        ) {
          htmlContent = d.header.cellTemplate({
            ...d.datum,
            value: getValue(d.datum, d.header.propName),
          });
        }

        return `
          <div class="item-name">${d.header.name}</div>
          <div class="item-value">${htmlContent}</div>
        `;
      });

    const dur = 350;

    toggler.on("click", function (e, d) {
      d.open = !d.open;

      const el = d3
        .select(this.parentElement)
        .classed("open", d.open)
        .select(".list-item-content")
        .classed("toggling", true);

      if (d.open) {
        el.classed("open", true);

        setTimeout(() => {
          el.style("height", "200px");
        }, 0);
      } else {
        el.style("height", null);
        setTimeout(() => {
          el.classed("open", false)
        }, dur / 3);
      }

      setTimeout(() => el.classed("toggling", false).style("height", null), dur);
    });
  }

  function sortTableBy(d, animate = true) {
    if (!d.sort) return;

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
