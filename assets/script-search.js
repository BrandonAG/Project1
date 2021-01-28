// Locate Search Form Entry
const searchEntry = document.getElementById('form-entry');
const historyEl = document.getElementById('location-hist');
const locationNameEl = document.getElementById('location-name');
var savedLocations = [];

function getCityFips(locationFullName) {
    // Convert Accented Characters to Standard Characters
    var plainFullName = locationFullName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Convert Address to City or County FIPS ID
    return fetch('https://datausa.io/api/searchLegacy/?q=' + plainFullName)
    .then(response => response.json())
    .then(function(data) {
        var fips = data.results[0].id;
        usFips = fips.split("US")[1];

        return usFips;
    });
}

function GetLocationInfo(location) {
    fetch('https://api.opencagedata.com/geocode/v1/json?q=' + location + '&key=c740ebf9cdd34742986f08e8fd78033c&language=en&pretty=1&countrycode=us')
    .then(response => response.json())
    .then(function(data) {

        // Location Lattitude and Longitude
        var lat = data.results[0].geometry.lat;
        var lng = data.results[0].geometry.lng;

        // Location Name Information
        var cityName;
        var countyName;
        var stateName;
        var stateCode;
        var fullName;
        var fips; // For County or State Level FIPS
        var cityFipsEn; // Used to Determine if City Level FIPS is Available
        if (data.results[0].components.state) {
            stateName = data.results[0].components.state;
            stateCode = data.results[0].components.state_code;
        }
        else {
            alert("Could Not Find Location within US.");
        }

        // If Location is a City
        if (data.results[0].components.city) {
            cityName = data.results[0].components.city;
            countyName = data.results[0].components.county;
            fullName = cityName + ", " + stateCode;
            fips = data.results[0].annotations.FIPS.county;
            cityFipsEn = getCityFips(fullName).then(function(cityFips) {
                // NOTE: For Special Function Calls that Require City Level FIPS Only
                //  
                // someFunction(someInput,anotherInput)
                // anotherFunction(someInput,anotherInput)
                locationDemographics(cityFips, fips);
                return;
            });

        }
        // If Location is a County
        else if (data.results[0].components.county) {
            countyName = data.results[0].components.county;
            fullName = countyName + ", " + stateCode;
            fips = data.results[0].annotations.FIPS.county;
        }
        // If Location is a State
        else {
            fullName = stateName;
            fips = data.results[0].annotations.FIPS.state;
        }

        locationNameEl.innerHTML = fullName;
        saveHistory(fullName);

        // Call APIs Via Separate Function Calls 
        // NOTE: Place All Functions That do Not Need City Level FIPS Below
        //
        // someFunction(someInput,anotherInput)
        locationDemographics(fips, fips);

    });
}

function saveHistory(location) {
    if (savedLocations) {
        // Remove Duplicate Location
        for (var i = 0; i < savedLocations.length; i++) {
            if (savedLocations[i] == location) {
                savedLocations.splice(i, 1);
            }
        }
        while (savedLocations.length > 5) {
            savedLocations.pop();
        }
        savedLocations.unshift(location);
    }
    else {
        savedLocations = [location]
    }
    localStorage.setItem("saved-locations", JSON.stringify(savedLocations));
    loadHistory();
}

function loadHistory() {
    savedLocations = JSON.parse(localStorage.getItem("saved-locations"));
    if(savedLocations) {
        console.log(historyEl.childElementCount);
        while (historyEl.childElementCount > 1) {
            historyEl.removeChild(historyEl.lastElementChild);
        }
        for (var i = 0; i < savedLocations.length; i++) {
            var locationEl = document.createElement("button");
            locationEl.setAttribute("class", "location-btn");
            locationEl.setAttribute("location-num", i);
            locationEl.innerHTML = savedLocations[i];
            historyEl.appendChild(locationEl);
        }
        if (locationNameEl.innerHTML == "") {
            GetLocationInfo(savedLocations[0])
        }
    }
}

historyEl.addEventListener("click", function(e){
    var location = document.querySelector('[location-num="' + e.target.getAttribute("location-num") + '"]').innerHTML;
    GetLocationInfo(location);
});

// On Form Submission
document.getElementById('form-submit').addEventListener('click', function(event) {
    event.preventDefault();
    if (searchEntry.value) {
        GetLocationInfo(searchEntry.value);
    }
})