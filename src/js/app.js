const data = [
  {
    id: 26,
    title: "Побег из Шоушенка",
    imdb: 9.3,
    year: 1994,
  },
  {
    id: 25,
    title: "Крёстный отец",
    imdb: 9.2,
    year: 1972,
  },
  {
    id: 27,
    title: "Крёстный отец 2",
    imdb: 9.0,
    year: 1974,
  },
  {
    id: 1047,
    title: "Тёмный рыцарь",
    imdb: 9.0,
    year: 2008,
  },
  {
    id: 223,
    title: "Криминальное чтиво",
    imdb: 8.9,
    year: 1994,
  },
];

const sortParams = {
  1: ["id", "↑"],
  2: ["id", "↓"],
  3: ["title", "↑"],
  4: ["title", "↓"],
  5: ["year", "↑"],
  6: ["year", "↓"],
  7: ["imdb", "↑"],
  8: ["imdb", "↓"],
};

let sortParamsIndex = 0;

const appContainer = document.querySelector(".app");
const table = document.createElement("table");
addTitleTR(table);
for (const row of data) {
  addDataTR(table, row, "id", "title", "year", "imdb");
}
appContainer.appendChild(table);

setInterval(() => {
  appContainer.removeChild(appContainer.firstChild);
  sortParamsIndex += 1;
  if (sortParamsIndex > 8) {
    sortParamsIndex = 1;
  }
  const param = sortParams[sortParamsIndex][0];
  const direction = sortParams[sortParamsIndex][1];
  data.sort((a, b) => {
    if (direction === "↑") {
      return a[param] > b[param] ? 1 : -1;
    }
    return a[param] < b[param] ? 1 : -1; // > - по возрастанию
  });
  const table = document.createElement("table");
  addTitleTR(table, param, direction);
  for (const row of data) {
    addDataTR(table, row, "id", "title", "year", "imdb");
  }
  appContainer.appendChild(table);
}, 1000);

function addTitleTR(table, param = "", direction = "") {
  const titles = {
    id: "id",
    title: "title",
    year: "year",
    imdb: "imdb",
  };
  if (param) {
    titles[param] += direction;
  }
  const tr = document.createElement("tr");
  tr.innerHTML = `<td>${titles.id}</td><td>${titles.title}</td><td>${titles.year}</td><td>${titles.imdb}</td>`;
  table.appendChild(tr);
}

function addDataTR(table, row, ...params) {
  const tr = document.createElement("tr");
  for (const param of params) {
    const td = document.createElement("td");
    if (param === "year") {
      td.innerHTML = `(${row[param]})`;
    } else if (param === "imdb") {
      td.innerHTML = `imdb: ${row[param].toFixed(2)}`;
    } else {
      td.innerHTML = row[param];
    }
    tr.appendChild(td);
  }
  table.appendChild(tr);
}
