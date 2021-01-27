// Locate Elements in HTML
const popDensityEl = document.getElementById('pop-density');

function locationDemographics(fips) {
    console.log(fips);
    if (fips.length == 7) {
        var cityFips = fips.substring(2);
        var stateFips = fips.substring(0,2);
        fetch('https://api.census.gov/data/2019/pep/population?get=COUNTY,DATE_CODE,DATE_DESC,DENSITY,POP,NAME,STATE&for=place:' + cityFips + '&in=state:' + stateFips)
        .then(response => response.json())
        .then(function(data) {
            popDensity = data[data.length - 1][3];
            popDensityEl.innerHTML = Math.round(popDensity) + " per sq. mi.";
        });
    }
    else if (fips.length == 5) {
        var countyFips = fips.substring(2);
        var stateFips = fips.substring(0,2);
        fetch('https://api.census.gov/data/2019/pep/population?get=COUNTY,DATE_CODE,DATE_DESC,DENSITY,POP,NAME,STATE&for=county:' + countyFips + '&in=state:' + stateFips)
        .then(response => response.json())
        .then(function(data) {
            popDensity = data[data.length - 1][3];
            popDensityEl.innerHTML = Math.round(popDensity) + " per sq. mi.";
        });
    }
    else {
        fetch('https://api.census.gov/data/2019/pep/population?get=COUNTY,DATE_CODE,DATE_DESC,DENSITY,POP,NAME,STATE&for=state:' + fips)
        .then(response => response.json())
        .then(function(data) {
            popDensity = data[data.length - 1][3];
            popDensityEl.innerHTML = Math.round(popDensity) + " per sq. mi.";
        });
    }
}