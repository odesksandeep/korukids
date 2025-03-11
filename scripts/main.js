function App() {
  const siteUrl = "https://www.korukids.co.uk/blog/paternity-league/";
  const API_URL = 'https://eu-central-1.aws.data.mongodb-api.com/app/application-0-jojjw/endpoint/data';
  const SHARE_TITLE = "Koru Kids | #PaternityLeague";
  const SHARE_DESCR = "I just compared my company to the @korukids #paternityleague table. They took the Glassdoor Best Places To Work 2022 list and reordered it based on paternity leave policies. See how your company compares too: ";
  var allIndustries = [{
    value: "all",
    label: "All industries",
    selected: true,
  }];

  const pay_values = {
    100: 480.77,
    90: 432.69,
    80: 384.62,
    70: 336.54,
    60: 288.46,
    50: 240.39,
    40: 192.31,
    30: 144.23,
    20: 96.15,
    10: 48.08,
    statutory: 156.66,
  };

  const scores = {
    gold: "Gold",
    silver: "Silver",
    bronze: "Bronze",
  };

  const average_weeks = 11;
  const average_total_pay = 4179.29;

  function sortFunc(a, b, order) {
    const orderFunc = order === "asc" ? "ascending" : "descending";

    let rankProp = this.rankProp;

    if (a[rankProp] === b[rankProp]) {
      rankProp = "Paternity League ranking";
    }

    return d3[orderFunc](a[rankProp], b[rankProp]);
  }

  function headerTemplate() {
    const name = this.name;
    const icon = this.icon;
    const sortable = this.sort;

    return loadSvg(icon).then((iconStr) => {
      return `<button class="header-btn">
        <div class="table-arrow ${
          sortable ? "" : "visibility-hidden"
        }">${ARROWS}</div>
        <div class="icon">${iconStr}</div>
        <div class="name">${name}</div>
      </button>`;
    });
  }

  const headers = [
    {
      id: 0,
      widthRatio: 1.3,
      name: "Paternity League ranking",
      propName: "Paternity League ranking",
      rankProp: "Paternity League ranking",
      icon: "./images/Paternity-Rank-Icon.svg",
      order: "asc",
      class: "col-sortable",
      sort: sortFunc,
      headerTemplate,
      cellTemplate: ({ value, ...rest }) => {
        const dir = rest["Paternity League ranking ARROW"];
        const arrow = dir === "up" ? "↑" : dir === "down" ? "↓" : "";
        const span = arrow ? `<span class="arrow ${dir}">${arrow}</span>` : "";
        return ordinal_suffix_of(value);
      },
    },
    {
      id: 2,
      widthRatio: 1.5,
      name: "Company",
      propName: "Company",
      rankProp: "Company",
      icon: "./images/Company-Name-Icon.svg",
      class: "company-column",
      headerTemplate,
      cellTemplate: ({ value }) => {
        return value;
      },
    },
    {
      id: 3,
      widthRatio: 2,
      name: "Total leave period",
      propName: "Total leave period (weeks)",
      rankProp: "Leave offered ranking",
      icon: "./images/Leave-offered-Icon.svg",
      class: "col-sortable",
      sort: sortFunc,
      headerTemplate,
      cellTemplate: ({ value }) => {
        return value + `<br class="hidden_mobile" /> weeks`;
      },
    },
    {
      id: 4,
      widthRatio: 1.8,
      name: "Rate of pay",
      propName: "Rate of pay",
      rankProp: "Rate of pay ranking",
      icon: "./images/Pay-offered-Icon.svg",
      class: "col-sortable",
      sort: sortFunc,
      headerTemplate,
      cellTemplate: ({ value }) => {
        return value;
      },
    },
    {
      id: 5,
      widthRatio: 0.7,
      name: "Rating",
      propName: "Paternity Pay Score",
      rankProp: "Paternity Pay Score",
      icon: "./images/Rating-Icon.svg",
      headerTemplate,
      cellTemplate: ({ value }) => {
        return `<span class="star ${value}">${STAR}</span>`;
      },
    },
  ];

  let table,
    tableMobile,
    tableData,
    currentSort = headers[0].rankProp,
    currentResult;


  const loadData = () => {
    return Promise.all([d3.csv("./data/data.csv", d3.autoType)]).then(
      ([data]) => {
        return data.slice();
      }
    );
  };

  var allInds;
  loadData().then((data) => {
    const columnName = 'Industry'; // Replace with your column name
    const values = data.map((row) => row[columnName]);
    allInds = [...new Set(values)];
    allInds.map(function(item){
      var singleObj = {};
      singleObj['value'] = item;
      singleObj['label'] = item;
      allIndustries.push(singleObj);
    });
  });

  const scoresDropdown = initDropdown({
    list: [
      {
        value: "Gold",
        label: "Gold",
      },
      {
        value: "Silver",
        label: "Silver",
      },
      {
        value: "Bronze",
        label: "Bronze",
      },
      {
        value: "all",
        label: "All ratings",
        selected: true,
      },
    ],
    cb: (value) => {
      table.filter((d) => {
        if (value === "all") return true;
        return d["Paternity Pay Score"] === value;
      });
      tableMobile.filter((d) => {
        if (value === "all") return true;
        return d["Paternity Pay Score"] === value;
      });
    },
    id: "#filter_sel",
  });

  setTimeout(function(){
    const indDropdown = initDropdown({
      list: allIndustries,
      cb: (value) => {
        table.filter((d) => {
          if (value === "all") return true;
          return d["Industry"] === value;
        });
        tableMobile.filter((d) => {
          if (value === "all") return true;
          return d["Industry"] === value;
        });
      },
      id: "#filter_ind",
    });
  }, 200);

  const mobileSortDropdown = initDropdown({
    list: headers
      .filter((d) => d.sort)
      .sort((a, b) => a.id - b.id)
      .map((d) => ({
        label: d.name,
        value: d.rankProp,
      })),
    cb: (val) => {
      const header = headers.find((d) => d.rankProp === val);

      if (header) {
        header.order = "asc";

        d3.select("#mobile_sort_btn")
          .datum({ order: header.order })
          .classed("asc", false);

        table.sortTableBy(header, false);
        tableMobile.sortTableBy(header, false);
      }
    },
    id: "#col_sort_sel",
  });

  loadData().then((data) => {
    tableData = data;
    table = Table({
      container: "#table",
      headers: headers,
      data: tableData,
      onSort: ({ rankProp }) => (currentSort = rankProp),
    }).render();

    tableMobile = ListView({
      container: "#table_mobile",
      headers: headers,
      data: tableData,
      onSort: ({ rankProp }) => {
        currentSort = rankProp;
        mobileSortDropdown.setChoiceByValue(currentSort);
      },
    }).render();

    const autoCompleteJS = new autoComplete({
      selector: "#table_search",
      placeHolder: "Search a company",
      data: {
        src: tableData.map((d) => d.Company),
      },
      resultItem: {
        highlight: true,
      },
      events: {
        input: {
          keyup: (event) => {
            if (!event.target.value) {
              table.highlight((d) => false);
              tableMobile.highlight((d) => false);
            }
          },
          selection: (event) => {
            const selection = event.detail.selection.value;
            autoCompleteJS.input.value = selection;

            const matched = tableData
              .filter((d) => d.Company === selection)
              .map((d) => d.Company);

            table.highlight((d) => {
              if (!matched.length) return false;
              return matched.includes(d.Company);
            });

            tableMobile.highlight((d) => {
              if (!matched.length) return false;
              return matched.includes(d.Company);
            });
          },
        },
      },
    });
  });

  d3.select("#mobile_sort_btn")
    .datum({ order: "asc" })
    .on("click", function (e, d) {
      const header = headers.find((d) => d.rankProp === currentSort);

      if (header) {
        d3.select(this).classed("asc", (d) => d.order === "asc");

        if (d.order === "asc") {
          d.order = "desc";
        } else {
          d.order = "asc";
        }

        header.order = d.order;

        table.sortTableBy(header, false);
        tableMobile.sortTableBy(header, false);
      }
    });

  d3.select("#compare_btn_modal").on("click", function (e, d) {
    const companyName = document.querySelector("#company_name_input").value;
    const num_of_weeks = parseInt(
      document.querySelector("#num_of_weeks_input").value
    );
    const pay_offered = document.querySelector("#pay_offered").value;

    // validations

    d3.select("#company_name_input_parent").classed(
      "form-invalid",
      companyName.trim() === ""
    );
    d3.select("#num_of_weeks").classed("form-invalid", isNaN(num_of_weeks));
    d3.select("#pay_offered_parent").classed(
      "form-invalid",
      pay_offered.trim() === ""
    );

    if (
      companyName.trim() === "" ||
      isNaN(num_of_weeks) ||
      pay_offered.trim() === ""
    ) {
      return;
    }

    d3.select("#page_1").classed("d-none", true);
    d3.select("#page_2").classed("d-none", false);

    const total_pay = pay_values[pay_offered] * num_of_weeks;

    let result = "";

    if (total_pay <= 5420) {
      result = "bronze";
    } else if (total_pay <= 10839) {
      result = "silver";
    } else {
      result = "gold";
    }

    const total_pay_difference =
      ((total_pay - average_total_pay) /
        ((total_pay + average_total_pay) / 2)) *
      100;

    d3.select("#weeks_difference").html(
      (num_of_weeks > average_weeks
        ? "+"
        : num_of_weeks < average_weeks
        ? "-"
        : "") + Math.round(Math.abs(average_weeks - num_of_weeks))
    );

    d3.select("#total_pay_difference").html(
      (total_pay_difference > 0 ? "+" : "") +
        Math.round(total_pay_difference) +
        "%"
    );

    d3.select("#result_text_inline").html(capitalizeFirstLetter(result));
    d3.select("#page_2").attr("data-result", result);

    currentResult = result;

    // save to db
    const payload = {
      companyName,
      num_of_weeks,
      pay_offered,
      num_of_weeks_extra: document.querySelector("#num_of_weeks_extra").value,
      pay_offered_extra: document.querySelector("#pay_offered_extra").value
    };

    axios.post(API_URL, payload);
  });

  d3.select("#similar_results_btn").on("click", function () {
    if (currentResult) {
      const value = scores[currentResult];

      scoresDropdown.setChoiceByValue(value);

      table.filter((d) => {
        if (value === "all") return true;
        return d["Paternity Pay Score"] === value;
      });

      tableMobile.filter((d) => {
        if (value === "all") return true;
        return d["Paternity Pay Score"] === value;
      });

      $("#modal").modal("hide");
    }
  });

  d3.selectAll(".input-check.numeric").on("input", function (e) {
    const value = e.target.value;
    d3.select(this)
      .classed("form-invalid", isNaN(value))
      .classed("show-error", isNaN(value));
  });

  d3.selectAll(".input-check.texture").on("input", function (e) {
    const value = e.target.value.trim();
    d3.select(this)
      .classed("form-invalid", value === "")
      .classed("show-error", value === "");
  });

  $("#modal").on("hide.bs.modal", function (e) {
    resetFormInputs();

    d3.select("#page_1").classed("d-none", false);
    d3.select("#page_2").classed("d-none", true);
  });

  document.addEventListener("click", (e) => {
    const id = e.target.id;

    if (e.target.classList.contains("social-share")) {
      const windowFeatures = "left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0";
      const windowTarget = "_blank";

      const encodedUrl = encodeURIComponent(siteUrl);
      const title = encodeURIComponent(SHARE_TITLE);
      const text = encodeURIComponent(id === "twitter_share_btn" ? SHARE_DESCR :  SHARE_DESCR + siteUrl);

      let windowUrl = "";

      if (id === "facebook_share_btn") {
        windowUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
      } else if (id === "twitter_share_btn") {
        windowUrl = `https://twitter.com/share?url=${encodedUrl}&text=${title + ". " + text}`;
      } else if (id === "linkedin_share_btn") {
        windowUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${title}`;
      }

      window.open(windowUrl, windowTarget, windowFeatures);
    }
  });

  tippy(document.querySelector("#share_your_result_btn"), {
    content: `
      <ul class="social-net-list">
        <li id="facebook_share_btn" class="social-share">
          <img src="./images/facebook.svg" /> Facebook
        </li>
        <li id="twitter_share_btn" class="social-share">
          <img src="./images/twitter.svg" /> Twitter
        </li>
        <li id="linkedin_share_btn" class="social-share">
          <img src="./images/linkedin.svg" /> Linkedin
        </li>
      </ul>
    `,
    interactive: true,
    allowHTML: true,
    maxWidth: 260,
    arrow: false,
    theme: "light",
    animation: "scale",
    duration: 0,
    trigger: "click",
    placement: window.innerWidth < 576 ? "top" : "left",
    popperOptions: {
      modifiers: [
        {
          name: "computeStyles",
          options: {
            gpuAcceleration: false, // true by default
          },
        },
      ],
    },
  });

  function resetFormInputs() {
    document.querySelector("#company_name_input").value = "";
    document.querySelector("#num_of_weeks_input").value = "";

    document.querySelector("#num_of_weeks_extra").value = "";

    document.querySelector("#pay_offered").value = "100";

    document.querySelector("#pay_offered_extra").value = "100";
  }

  function getImage() {
    html2canvas(document.querySelector("#share_image")).then((canvas) => {
      // document.body.appendChild(canvas);
      return canvas.toDataURL();
    });
  }
}

window.addEventListener("DOMContentLoaded", App);
