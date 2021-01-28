// Cookie settings for cross-site access
document.cookie = 'cookie1=value1; SameSite=Lax';
document.cookie = 'cookie2=value2; SameSite=None; Secure';

// API KEY: https://api.covidactnow.org/v2/county/{{FIPS}}.json?apiKey=445bc14aef9b4a7798f42f69d834218d
var covidArray = [];


// Function getCovidData(fips) is meant to be called by script-search.js to get Covid Data from a FIPS 5-digit code parameter
var getCovidData = function(fips) {


    // Covid Risk Assessment Guide by Harvard: https://globalepidemics.org/wp-content/uploads/2020/09/key_metrics_and_indicators_v5-1.pdf

    var apiUrl = "https://api.covidactnow.org/v2/county/" +
        fips + ".json?apiKey=445bc14aef9b4a7798f42f69d834218d";
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(dataResult) {
                console.log(dataResult);
                getCovidDataObject(dataResult);
            });

        } else {
            alert("Error: " + response.statusText);
        }
    });

}
var getCovidDataObject = function(results) {
    var currentCases = results.actuals.cases;
    var currentDeaths = results.actuals.deaths;
    var currentRiskFactor = results.riskLevels.overall;
    var currentNewCases = results.actuals.newCases;
    var covidDataObject = {
        cases: currentCases,
        deaths: currentDeaths,
        riskFactor: currentRiskFactor,
        newCases: currentNewCases
    };
    covidArray.push(covidDataObject);
    console.log(covidDataObject);
}


getCovidData(49017);