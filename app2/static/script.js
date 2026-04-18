const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const resultCount = document.getElementById("result-count");
const resultsDiv = document.getElementById("results");
const docListDiv = document.getElementById("doc-list");

searchButton.addEventListener("click", doSearch);
searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") doSearch();
});

async function doSearch() {
  const query = searchInput.value.trim();
  if (!query) return;

  const response = await fetch("/search?query=" + encodeURIComponent(query));
  const data = await response.json();

  resultCount.textContent = "(" + data.results.length + " documents, ranked by distance)";
  resultsDiv.innerHTML = "";

  data.results.forEach(function (result, rank) {
    var isTop = rank === 0;
    var div = document.createElement("div");
    div.className = "result-item" + (isTop ? " top-match" : "");

    var dist = result.distance;
    var distColor = dist < 0.5 ? "#4ade80" : dist < 1.0 ? "#fbbf24" : dist < 1.5 ? "#f97316" : "#ef4444";

    div.innerHTML =
      '<div class="result-header">' +
        '<div><span class="result-rank">' + (rank + 1) + "</span>" +
        '<span class="result-id">' + result.id + "</span></div>" +
        '<span class="result-distance" style="color: ' + distColor + '">distance: ' + result.distance.toFixed(4) + "</span>" +
      "</div>" +
      '<div class="result-text">' + result.text + "</div>";

    resultsDiv.appendChild(div);
  });
}

async function loadDocuments() {
  var response = await fetch("/documents");
  var data = await response.json();

  docListDiv.innerHTML = "";
  data.documents.forEach(function (doc) {
    var div = document.createElement("div");
    div.className = "doc-item";
    div.innerHTML =
      '<span class="doc-id">' + doc.id + "</span>" +
      '<span class="doc-text">' + doc.text + "</span>";
    docListDiv.appendChild(div);
  });
}

loadDocuments();
