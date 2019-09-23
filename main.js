const baseUrl = "https://swapi.co/api/";

// creates a new instance of the XMLHttpRequest object.
// XML stands for Extensible Markup Language, which is similar to HTML in the way it structures its data, and it's a precursor to JSON.
function getData(type, cb) {
    var xhr = new XMLHttpRequest();

    //the GET method is used when we want to retrieve data from a source
    xhr.open("GET", baseUrl + type + "/");
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

//"type"here means the type that comes from the API: ie film, people, starships, vehicles etc
function writeToDocument(type) {
    var el = document.getElementById("data");
    el.innerHTML = "";
    
    getData(type, function(data) {
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);

        data.forEach(function(item) {
            // el.innerHTML += "<p>" + item.name + "</p>";
        });
        
        el.innerHTML = `<table>${tableHeaders}</table>`;

    });
}


//here we're telling the console log to wait 500 milliseconds which gives the onreadystatechange function time to get to state 4.
// setTimeout(function() {
//     console.log(data);
// }, 500);

//document.getElementById("data").innerHTML = this.responseText
