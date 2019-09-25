
// creates a new instance of the XMLHttpRequest object.
// XML stands for Extensible Markup Language, which is similar to HTML in the way it structures its data, and it's a precursor to JSON.
function getData(url, cb) {
    var xhr = new XMLHttpRequest();

    //the GET method is used when we want to retrieve data from a source
    xhr.open("GET", url);
    //sends the request
    xhr.send();

    //The xhr object maintains an internal state as it's completing various parts of our request operation. "readyState = =4" means that the operation has been completed.
    //Check out https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState to see the 5 different states
    //The HTTP status code of 200 means "OK. Request succeeded, content delivered".
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };
}

function getTableHeaders(obj) {
    var tableHeaders = [];
    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`);
    });
    
    return `<tr>${tableHeaders}</tr>`;
}

function generatePaginationButtons(next, prev) {
    if (next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>
                <button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (next && !prev) {
        return `<button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (!next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>`;
    }
}

//"type"here means the type that comes from the API: ie film, people, starships, vehicles etc
function writeToDocument(url) {
    var tableRows = [];
    var el = document.getElementById("data");
    el.innerHTML = "";
    
    getData(url, function(data) {
        
        if(data.next || data.previous) {
            var pagination;
            pagination = generatePaginationButtons(data.next, data.previous)
        }
        
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);

        data.forEach(function(item) {
            var dataRow = [];
            Object.keys(item).forEach(function(key) {
                var rowData = item[key].toString();
                var truncatedData = rowData.substring(0, 15);
                dataRow.push(`<td>${truncatedData}</td>`);
            });
            tableRows.push(`<tr>${dataRow}</tr>`);
        });
        
        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>${pagination}`.replace(/,/g, "");

    });
}


//here we're telling the console log to wait 500 milliseconds which gives the onreadystatechange function time to get to state 4.
// setTimeout(function() {
//     console.log(data);
// }, 500);

//document.getElementById("data").innerHTML = this.responseText
