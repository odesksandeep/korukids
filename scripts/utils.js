const ARROWS = `<svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path class="arrow-down" fill-rule="evenodd" clip-rule="evenodd" d="M4.48284 12.4C4.30466 12.4 4.21543 12.6155 4.34142 12.7414L7.85858 16.2586C7.93668 16.3367 8.06332 16.3367 8.14142 16.2586L11.6586 12.7414C11.7846 12.6155 11.6953 12.4 11.5172 12.4H4.48284Z" fill="currentColor"/>
<path class="arrow-up" fill-rule="evenodd" clip-rule="evenodd" d="M11.5172 9.59998C11.6953 9.59998 11.7846 9.38455 11.6586 9.25855L8.14142 5.7414C8.06332 5.66329 7.93668 5.66329 7.85858 5.7414L4.34142 9.25856C4.21543 9.38455 4.30466 9.59998 4.48284 9.59998L11.5172 9.59998Z" fill="currentColor"/>
</svg>`;

const STAR = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.90357 14.1L4.25357 16.9C4.12024 16.9833 3.97857 17.0208 3.82857 17.0125C3.67857 17.0042 3.54524 16.9583 3.42857 16.875C3.3119 16.7917 3.2244 16.6833 3.16607 16.55C3.10774 16.4167 3.09524 16.2667 3.12857 16.1L4.35357 10.8L0.253571 7.225C0.120238 7.10833 0.0410714 6.97917 0.0160714 6.8375C-0.00892859 6.69583 -0.00476188 6.55833 0.0285715 6.425C0.0619048 6.29167 0.136905 6.17917 0.253571 6.0875C0.370238 5.99583 0.511905 5.94167 0.678572 5.925L6.10357 5.45L8.20357 0.45C8.27024 0.3 8.37024 0.1875 8.50357 0.1125C8.6369 0.0374997 8.77024 0 8.90357 0C9.0369 0 9.17024 0.0374997 9.30357 0.1125C9.4369 0.1875 9.5369 0.3 9.60357 0.45L11.7036 5.45L17.1286 5.925C17.2952 5.94167 17.4369 5.99583 17.5536 6.0875C17.6702 6.17917 17.7452 6.29167 17.7786 6.425C17.8119 6.55833 17.8161 6.69583 17.7911 6.8375C17.7661 6.97917 17.6869 7.10833 17.5536 7.225L13.4536 10.8L14.6786 16.1C14.7119 16.2667 14.6994 16.4167 14.6411 16.55C14.5827 16.6833 14.4952 16.7917 14.3786 16.875C14.2619 16.9583 14.1286 17.0042 13.9786 17.0125C13.8286 17.0208 13.6869 16.9833 13.5536 16.9L8.90357 14.1Z" fill="currentColor"/>
</svg>`;

const ARROW_DOWN_LIST = `<svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 1L6 6L11 1" stroke="#737373" stroke-width="2"/>
</svg>`;

const RESULT_LOGO = `<svg width="67" height="88" viewBox="0 0 67 88" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M46.2063 60.0133L49.2151 57.0226C49.8125 56.4289 50.4985 55.9671 51.2726 55.648L55.1999 54.0318C55.6753 53.8339 56.0519 53.4711 56.251 52.987L57.877 49.0834C58.1981 48.3133 58.6627 47.6206 59.2492 47.0384L62.2596 44.0568C62.6247 43.6939 62.8238 43.2099 62.8238 42.6929V38.4702C62.8238 37.6341 62.9789 36.821 63.2992 36.0509L64.9252 32.1473C65.1243 31.6748 65.1243 31.1463 64.9252 30.6738L63.2992 26.7702C62.9781 26 62.8238 25.1869 62.8238 24.3509V20.1282C62.8238 19.6112 62.6247 19.1271 62.2596 18.7643L59.2508 15.7736C58.6535 15.1799 58.1997 14.498 57.8786 13.7286L56.2526 9.82502C56.0535 9.35252 55.6884 8.98892 55.2015 8.78028L51.2741 7.16406C50.4993 6.84496 49.814 6.38318 49.2167 5.78948L46.2078 2.80938C45.8428 2.44655 45.3559 2.24865 44.8357 2.24865H40.5873C39.7461 2.24865 38.9281 2.08373 38.1533 1.76464L34.226 0.148426C33.7506 -0.0494752 33.2189 -0.0494752 32.7435 0.148426L28.8161 1.76464C28.0413 2.08374 27.2341 2.24865 26.3822 2.24865H22.1338C21.6252 2.24865 21.1267 2.44655 20.7616 2.80938L17.7528 5.78948C17.1662 6.38318 16.4694 6.84496 15.6953 7.16406L11.768 8.78028C11.2926 8.97818 10.9268 9.34101 10.7169 9.82502L9.09086 13.7286C8.76982 14.4988 8.30523 15.1914 7.70791 15.7736L4.7097 18.7643C4.34467 19.1164 4.14556 19.6219 4.14556 20.1282V24.3509C4.14556 25.187 3.97964 26.0001 3.65861 26.7702L2.03257 30.6738C1.83346 31.1463 1.83346 31.6748 2.03257 32.1473L3.65861 36.0509C3.97965 36.8211 4.14556 37.6342 4.14556 38.4702V42.6929C4.14556 43.2099 4.34467 43.694 4.7097 44.0568L7.71858 47.0475C8.30511 47.6305 8.76968 48.3231 9.09072 49.0925L10.7168 52.9961C10.9159 53.4686 11.2809 53.8429 11.7679 54.0408L15.6952 55.657C16.47 55.9646 17.1553 56.4272 17.7526 57.0209L20.7615 60.001C21.1157 60.3638 21.6243 60.5617 22.1336 60.5617H26.382C27.2232 60.5617 28.0412 60.7266 28.816 61.0457L32.7434 62.6619C33.2187 62.8598 33.7613 62.8598 34.2259 62.6619L38.1532 61.0457C38.928 60.7266 39.7461 60.5617 40.5872 60.5617H44.8356C45.3542 60.5632 45.8411 60.3653 46.2062 60.0132L46.2063 60.0133ZM33.4943 51.7766C22.1984 51.7766 13.0149 42.6494 13.0149 31.421C13.0149 20.1934 22.1976 11.0653 33.4943 11.0653C44.7793 11.0653 53.9736 20.1926 53.9736 31.421C53.9736 42.6378 44.7909 51.7766 33.4943 51.7766Z" fill="currentColor"/>
<path d="M33.495 15.4434C24.6333 15.4434 17.4199 22.6024 17.4199 31.4213C17.4199 40.2295 24.6333 47.3885 33.495 47.3885C42.3567 47.3885 49.5593 40.2295 49.5593 31.4213C49.5593 22.6132 42.3567 15.4434 33.495 15.4434Z" fill="currentColor"/>
<path d="M17.6624 63.1022L14.6535 60.1115C14.4768 59.9359 14.2553 59.7924 14.023 59.6935L10.0956 58.0772C10.0848 58.0772 10.0848 58.0665 10.0733 58.0665C9.9737 58.0228 9.88495 57.9898 9.79698 57.9453L0.271484 81.7099L10.7484 78.5213L16.1575 88L25.396 64.9502H22.1431C20.4507 64.9502 18.857 64.3012 17.6624 63.1023L17.6624 63.1022Z" fill="currentColor"/>
<path d="M57.1927 57.9456C57.104 57.9893 57.016 58.0223 56.9272 58.0668C56.9164 58.0668 56.9048 58.0775 56.894 58.0775L52.9667 59.6937C52.8447 59.7374 52.7344 59.7927 52.6348 59.8694C52.5353 59.9461 52.4357 60.0235 52.347 60.111L49.3381 63.1017C49.1166 63.3103 48.8959 63.4975 48.6636 63.6732C47.5685 64.4978 46.2403 64.9488 44.8467 64.9488H41.6055L50.8315 87.9986L56.2413 78.5193L66.7183 81.7079L57.1927 57.9456Z" fill="currentColor"/>
</svg>`;

//----------- PROTOTYPE FUNCTIONS  ----------------------
d3.selection.prototype.patternify = function (params) {
  var container = this;
  var selector = params.selector;
  var elementTag = params.tag;
  var data = params.data || [selector];

  // Pattern in action
  var selection = container.selectAll("." + selector).data(data, (d, i) => {
    if (typeof d === "object") {
      if (d.id) {
        return d.id;
      }
    }
    return i;
  });
  selection.exit().remove();
  selection = selection.enter().append(elementTag).merge(selection);
  selection.attr("class", selector);
  return selection;
};

function ordinal_suffix_of(i) {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
}

function formatThousand(num) {
  if (typeof num === "number") {
    return d3.format(",")(num);
  }

  return num;
}

function formatSi(num) {
  if (typeof num === "number") {
    return d3.format("~s")(num);
  }

  return num;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRandomId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function initDropdown({ list, id, cb, placeholder, ...rest }) {
  const select = document.querySelector(id);
  const options = list.slice();

  const choice = new Choices(select, {
    choices: [
      ...(placeholder
        ? [{ selected: true, disabled: true, value: "", label: placeholder }]
        : []),
      ...options,
    ],
    position: "bottom",
    shouldSort: false,
    itemSelectText: "",
    placeholder: false,
    searchResultLimit: options.length,
    searchEnabled: false,
    ...rest,
  });

  select.addEventListener(
    "change",
    function (event) {
      const value = event.detail.value;
      cb(value);
    },
    false
  );

  return choice;
}

function getRankValue(rank, isSame) {
  return (isSame ? "=" : "") + (rank < 10 ? "0" + rank : rank);
}

const isVisible = function (ele, container) {
  const eleTop = ele.offsetTop;
  const eleBottom = eleTop + ele.clientHeight;

  const containerTop = container.scrollTop;
  const containerBottom = containerTop + container.clientHeight;

  // The element is fully visible in the container
  return (
    eleTop >= containerTop && eleBottom <= containerBottom
    // ||
    // // Some part of the element is visible in the container
    // (eleTop < containerTop && containerTop < eleBottom) ||
    // (eleTop < containerBottom && containerBottom < eleBottom)
  );
};

function isDescendant(parent, child) {
  var node = child.parentNode;
  while (node != null) {
      if (node == parent) {
          return true;
      }
      node = node.parentNode;
  }
  return false;
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function updateCssVar(varName, value) {
  const root = document.documentElement;
  root.style.setProperty(varName, value);
}

function loadSvg(url) {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);

  xhr.overrideMimeType("text/plain");

  return new Promise((res, rej) => {
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          res(xhr.responseText);
        } else {
          rej(new Error("Error"));
        }
      }
    };

    xhr.send();
  });
}

function fakePromise(content) {
  return new Promise((res) => res(content));
}