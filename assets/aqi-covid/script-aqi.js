// Cookie settings for cross-site access
document.cookie = 'cookie1=value1; SameSite=Lax';
document.cookie = 'cookie2=value2; SameSite=None; Secure';
// https://api.airvisual.com/v2/nearest_city?key=40f410cd-9102-4b7b-9aed-cdbbce23a985
// 3812ea6836536b0581712ffd66f54fa5


var getCurrentAirInfo = function() {
    var apiUrl = "https://api.airvisual.com/v2/nearest_city?key=40f410cd-9102-4b7b-9aed-cdbbce23a985";
    fetch(apiUrl).then(function(response) {

        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                getAQIInformation(data);
            });
        } else {
            alert("Error: " + response.statusText);

        }
    });
};


var getAQIInformation = function(results) {
    getPollutant(results);
    var headerEl = document.getElementById("current-conditions-header");

    /* Displayed this way for testing purposes only so I can see my output */
    headerEl.innerHTML = "<div><h1>Ahoy, " + results.data.city + "!</h1></div>";

    var contentEl = document.getElementById("content");
    var iconIdEl = results.data.current.weather.ic;
    var link = "https://openweathermap.org/img/wn/" + iconIdEl + "@2x.png";;
    var imgCode = "<img src='" + link + "' alt='icon'>";

    var aqiBadgeElement = createBadge(results.data.current.pollution.aqius);
    contentEl.innerHTML = "<div>" + imgCode + "</div><br>Temp: " +
        convertToF(results.data.current.weather.tp) + "F" +
        "<br><br><div class ='center-align'><div>Current AQI (US):</div><div> " + aqiBadgeElement + "</div></div>" +
        "<br><br><h6>This is the AirVisual App at work.</h6></div>";

};
var createBadge = function(aqiValue) {
    var badgeCode = "<h3><a class='btn-floating btn-large waves-effect waves-light ";

    if (aqiValue <= 50) {
        badgeCode += "green";
    } else if (aqiValue <= 100) {
        badgeCode += "yellow";
    } else if (aqiValue <= 150) {
        badgeCode += "orange";
    } else if (aqiValue <= 200) {
        badgeCode += "red";
    } else if (aqiValue <= 300) {
        badgeCode += "violet";
    } else if (aqiValue > 301) {
        badgeCode += "maroon";
    }
    badgeCode += "'>" + aqiValue + "</a></h3>";
    return badgeCode;
};

function convertToF(celsius) {
    return celsius * 9 / 5 + 32;
};
var getPollutantObj = function(result) {
    // Main pollutant for US AQI
    var mainUS = result.data.current.pollution.mainus;
    // Turn pollutant conde into a human readable string
    var pollutantString = getPollutantString(mainUS);
    var unitType = getUnits(mainUS);
    // Pollutant concentration
    var concentrationValue = result.current.data.current.pollution.conc;
    var thisPollutant = {
        name: pollutantString,
        data: mainUS,
        units: unitType,
        concentration: concentrationValue
    }

    console.log(thisPollutant);
};

var getUnits = function(pollutantCode) {
    return pollutantCode;
};


var getPollutantString = function(pollutantCode) {
    return pollutantCode;
};


getCurrentAirInfo();