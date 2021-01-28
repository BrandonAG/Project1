// Cookie settings for cross-site access
document.cookie = 'cookie1=value1; SameSite=Lax';
document.cookie = 'cookie2=value2; SameSite=None; Secure';

// API KEY: https://api.covidactnow.org/v2/county/{{FIPS}}.json?apiKey=445bc14aef9b4a7798f42f69d834218d
var covidArray = [];


// Function getCovidData(fips) is meant to be called by script-search.js to get Covid Data from a FIPS 5-digit code parameter
var getCovidData = function(fips) {
        var currentCases;
        var currentDeaths;
        var currentRiskFactor;
        var currentNewCases;

        // Covid Risk Assessment Guide by Harvard: https://globalepidemics.org/wp-content/uploads/2020/09/key_metrics_and_indicators_v5-1.pdf

        var apiUrl = "https://api.covidactnow.org/v2/county/" +
            fips + ".json?apiKey=445bc14aef9b4a7798f42f69d834218d";
        fetch(apiUrl).then(function(response) {
            if (response.ok) {
                response.json().then(function(dataResult) {
                    console.log(dataResult);
                    currentCases = dataResult.actuals.cases;
                    // Cumulative number of confirmed or suspected cases
                    currentDeaths = dataResult.actuals.deaths;
                    // Cumulative number of deaths that are suspected or confirmed to have been caused by COVID-19
                    currentRiskFactor = dataResult.riskLevels.overall;
                    // Enum:{ 0 1 2 3 4 5 } Overall risk level for region.
                    currentNewCases = dataResult.actuals.newCases;
                    /* An integer or null (Newcases) 
                    - New confirmed or suspected cases.
                    - New cases are a processed timeseries of cases - summing new cases may not equal the cumulative case count.*/
                });
                var covidDataObject = {
                    cases: currentCases,
                    deaths: currentDeaths,
                    riskFactor: currentRiskFactor,
                    newCases: currentNewCases
                };
                covidArray.push(covidDataObject);
                console.log(covidDataObject);
            } else {
                alert("Error: " + response.statusText);
            }
        });

    }
    /* Test Code:
    getCovidData(49017);*/