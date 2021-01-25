// Cookie settings for cross-site access
document.cookie = 'cookie1=value1; SameSite=Lax';
document.cookie = 'cookie2=value2; SameSite=None; Secure';
//API-1 link + key https://api.airvisual.com/v2/nearest_city?key=40f410cd-9102-4b7b-9aed-cdbbce23a985



var getCurrentAirInfo = function() {
    var apiUrl = "https://api.airvisual.com/v2/nearest_city?key=40f410cd-9102-4b7b-9aed-cdbbce23a985";
    fetch(apiUrl).then(function(response) {

        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                getWeather(data);
            });
        } else {
            alert("Error: " + response.statusText);

        }
    });
};

var getWeather = function(results) {
    var contentEl = document.getElementById("content");
    var iconIdEl = results.data.current.weather.ic;
    var link = "https://openweathermap.org/img/wn/" + iconIdEl + "@2x.png";;
    var imgCode = "<img src='" + link + "' alt='icon'>";
    /* for testing purposes only */
    contentEl.innerHTML = "<div class='heads'><h1>Ahoy, " + results.data.city + "!</h1></div><br>Temp: " +
        convertToF(results.data.current.weather.tp) + "F" +
        "<br><br>Current AQI (US): " + results.data.current.pollution.aqius + imgCode +
        "<br><br><h6>This is the AirVisual App at work.</h6>";

};

function convertToF(celsius) {
    return celsius * 9 / 5 + 32;
}
getCurrentAirInfo();