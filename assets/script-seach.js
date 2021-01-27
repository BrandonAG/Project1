// Locate Search Entry
const searchEntry = document.getElementById('form-entry');

// On Form Submission
document.getElementById('form-submit').addEventListener('click', function(event) {
    event.preventDefault();
    if (searchEntry.value) {
        fetch('http://open.mapquestapi.com/geocoding/v1/address?key=lHu4LRcxFxGZwQjZd3pRI0UJrUnmYsKV&location=' + searchEntry.value)
        .then(response => response.json())
        .then(function(data) {

            // Location Name and Lattitue/Longitue to be Passed into API Functions
            var cityName = data.results[0].locations[0].adminArea5;
            var countyName = data.results[0].locations[0].adminArea4;
            var stateName = data.results[0].locations[0].adminArea3;
            var fullName = cityName + ", " + stateName;
            var lat = data.results[0].locations[0].latLng.lat;
            var lon = data.results[0].locations[0].latLng.lng;

            // Convert Accented Characters to Standard Characters
            var plainFullName = fullName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            // Call APIs Via Separate Function Calls
            // someFunction(someInput,anotherInput)
            // anotherFunction(someInput,anotherInput)

            // Convert Address to FIPS ID
            fetch('https://datausa.io/api/searchLegacy/?q=' + plainFullName)
            .then(response => response.json())
            .then(function(data) {
                var fips = data.results[0].id;
                usFips = fips.split("US");
                stateFips = usFips[1].substring(0,2);
                placeFips = usFips[1].substring(2);

                // Call APIs Requiring FIPS ID
                // someFunction(someInput,anotherInput)
                // anotherFunction(someInput,anotherInput)
            });
        });
    }
})