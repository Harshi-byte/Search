let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl=document.getElementById("spinner");

function createAndAppendResult(result) {
    let {
        title,
        link,
        description
    } = result;
    //creating result item (div container-result item)
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultsEl.appendChild(resultItemEl);
    //creating title item (anchor title-result tiltle)
    let resultTitleEl = document.createElement("a");
    resultTitleEl.classList.add("result-title");
    resultTitleEl.textContent = title;
    resultTitleEl.href = link;
    resultTitleEl.target = "_blank";
    resultItemEl.appendChild(resultTitleEl);
    //creating title(title-break)
    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    //creating url(anchor url--result-url)
    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultItemEl.appendChild(urlEl);
    //creating line break
    let lineBreakEl = document.createElement("br");
    resultItemEl.appendChild(lineBreakEl);
    //creating description(paragraph discription)
    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("result-description");
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);

}

function displayResults(searchResults) {
    spinnerEl.classList.toggle("d-none");
    for (let result of searchResults) {
        createAndAppendResult(result);
    }
}

function searchwiki(event) {
    if (event.key === "Enter") {
        searchResultsEl.textContent = "";
        spinnerEl.classList.toggle("d-none");
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        }
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            })
    }
}

searchInputEl.addEventListener("keydown", searchwiki);