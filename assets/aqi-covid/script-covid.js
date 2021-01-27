// Cookie settings for cross-site access
document.cookie = 'cookie1=value1; SameSite=Lax';
document.cookie = 'cookie2=value2; SameSite=None; Secure';

// So far worksd good!  Will get this using the fips
// API KEY: https://api.covidactnow.org/v2/county/55060.json?apiKey=445bc14aef9b4a7798f42f69d834218d
var attempt = function() {
    var apiUrl = "https://api.covidactnow.org/v2/state/MN.json?apiKey=445bc14aef9b4a7798f42f69d834218d";
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(dataResult) {
                console.log(dataResult);

            });
        } else {
            alert("Error: " + response.statusText);
        }
    });

}
attempt();