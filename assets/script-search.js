// Locate Search Form Entry
const searchEntry = document.getElementById('form-entry');

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

// On Form Submission
document.getElementById('form-submit').addEventListener('click', function(event) {
    event.preventDefault();
    if (searchEntry.value) {
        fetch('https://api.opencagedata.com/geocode/v1/json?q=' + searchEntry.value + '&key=c740ebf9cdd34742986f08e8fd78033c&language=en&pretty=1')
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
            var fipsList = [];
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
                cityFips = getCityFips(fullName).then(function(results) {
                    // NOTE: For Special Function Calls that Require City Level FIPS Only
                    //  
                    // someFunction(someInput,anotherInput)
                    // anotherFunction(someInput,anotherInput)
                    locationDemographics(results);
                    return results;
                });
                fipsList = [data.results[0].annotations.FIPS.county, cityFips]
            }
            // If Location is a County
            else if (data.results[0].components.county) {
                countyName = data.results[0].components.county;
                fullName = countyName + ", " + stateCode;
                fipsList = [data.results[0].annotations.FIPS.county]
            }
            // If Location is a State
            else {
                fullName = stateName;
                fipsList = [data.results[0].annotations.FIPS.state]
            }

            // Call APIs Via Separate Function Calls 
            // NOTE: Place All Functions That do Not Need City Level FIPS Below
            //
            // someFunction(someInput,anotherInput)
            // anotherFunction(someInput,anotherInput)

        });
    }
})