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
    var contentEl = document.getElementById("content");
    var iconIdEl = results.data.current.weather.ic;
    var link = "https://openweathermap.org/img/wn/" + iconIdEl + "@2x.png";;
    var imgCode = "<img src='" + link + "' alt='icon'>";

    var aqiBadgeElement = createBadge(results.data.current.pollution.aqius);
    /* Displayed this way for testing purposes only so I can see my output */
    contentEl.innerHTML = "<div><h1>Ahoy, " + results.data.city + "!</h1></div><div>" + imgCode + "</div><br>Temp: " +
        convertToF(results.data.current.weather.tp) + "F" +
        "<br><br><div><div>Current AQI (US):</div><div> " + aqiBadgeElement + "</div></div>" +
        "<br><br><h6>This is the AirVisual App at work.</h6></div>";

};
var createBadge = function(aqiValue) {
    var badgeCode = "<h3><span class='badge text-light bg-";

    if (aqiValue <= 50) {
        badgeCode += "primary";
    } else if (aqiValue <= 100) {
        badgeCode += "success";
    } else if (aqiValue <= 150) {
        badgeCode += "warning";
    } else if (aqiValue <= 200) {
        badgeCode += "danger";
    } else if (aqiValue <= 300) {
        badgeCode += "secondary";
    } else if (aqiValue > 301) {
        badgeCode += "dark";
    }
    badgeCode += "'>" + aqiValue + "</span></h3>";
    return badgeCode;
};

function convertToF(celsius) {
    return celsius * 9 / 5 + 32;
};
var getPollutant = function(data) {
    // Main pollutant for US AQI
    var mainUS = data.pollution.mainus;
    // Turn pollutant conde into a human readable string
    var pollutantString = getPollutantString(mainUS);
    var units = getUnits(mainUS);
    // Pollutant concentration
    var concentration = data.pollution.conc;
    var thisPollutant = {
        name: ""
    }

    console.log(unitValue);
};

var getUnits = function(pollutantCode) {}


var getPollutantString = function(pollutantCode) {}
getCurrentAirInfo();