// Cookie settings for cross-site access
document.cookie = 'cookie1=value1; SameSite=Lax';
document.cookie = 'cookie2=value2; SameSite=None; Secure';

// API KEY: https://api.covidactnow.org/v2/county/{{FIPS}}.json?apiKey=445bc14aef9b4a7798f42f69d834218d
var covidArray = [];
var getCovidData = function() {

    // Covid Risk Assessment Guide by Harvard: https://globalepidemics.org/wp-content/uploads/2020/09/key_metrics_and_indicators_v5-1.pdf

    var apiUrl = "https://api.covidactnow.org/v2/county/49017.json?apiKey=445bc14aef9b4a7798f42f69d834218d";
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
getCovidData();