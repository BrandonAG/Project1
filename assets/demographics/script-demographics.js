// Locate Elements in HTML
const popDensityEl = document.getElementById('pop-density');
const medAgeEl = document.getElementById('median-age');
const povRateEl = document.getElementById('poverty-rate');

const lowRiskDensity = 3000;
const highRiskDensity = 10000;
const lowRiskAge = 30;
const highRiskAge = 40;
const lowRiskPov = 10;
const highRiskPov = 20;

function demographicRisk(val,lowRisk,highRisk) {
    if (val < lowRisk) {
        return "green";
    }
    else if(val > highRisk) {
        return "red";
    }
    else {
        return "yellow";
    }
}

function locationDemographics(cityFips, fips) {
    // City Level FIPS
    if (cityFips.length == 7) {
        var placeFips = cityFips.substring(2);
        var countyFips = fips.substring(2);
        var stateFips = cityFips.substring(0,2);
        fetch('https://api.census.gov/data/2019/pep/population?get=COUNTY,DATE_CODE,DATE_DESC,DENSITY,POP,NAME,STATE&for=place:' + placeFips + '&in=state:' + stateFips)
        .then(response => response.json())
        .then(function(data) {
            popDensity = data[data.length - 1][3];
            var risk = demographicRisk(popDensity,lowRiskDensity,highRiskDensity);
            popDensityEl.setAttribute("style", "background-color: " + risk + ";");
            popDensityEl.innerHTML = Math.round(popDensity) + " per sq. mi.";
        });
        
        fetch('https://api.census.gov/data/2019/acs/acsse?get=NAME,K200103_001E&for=place:' + placeFips + '&in=state:' + stateFips)
        .then(response => response.json())
        .then(function(data) {
            medAge = data[data.length - 1][1];
            var risk = demographicRisk(medAge,lowRiskAge,highRiskAge);
            medAgeEl.setAttribute("style", "background-color: " + risk + ";");
            medAgeEl.innerHTML = Math.round(medAge);
        });

        fetch('https://api.census.gov/data/timeseries/poverty/saipe?get=COUNTY,YEAR,SAEPOVRTALL_PT,SAEPOVALL_PT,SAEMHI_PT,NAME&for=county:' + countyFips + '&in=state:' + stateFips)
        .then(response => response.json())
        .then(function(data) {
            povRate = data[data.length - 1][2];
            var risk = demographicRisk(povRate,lowRiskPov,highRiskPov);
            povRateEl.setAttribute("style", "background-color: " + risk + ";");
            povRateEl.innerHTML = Math.round(povRate) + "%";
        });
    }
    else {
        // County Level FIPS
        if (fips.length == 5) {
            var countyFips = fips.substring(2);
            var stateFips = fips.substring(0,2);
            fetch('https://api.census.gov/data/2019/pep/population?get=COUNTY,DATE_CODE,DATE_DESC,DENSITY,POP,NAME,STATE&for=county:' + countyFips + '&in=state:' + stateFips)
            .then(response => response.json())
            .then(function(data) {
                popDensity = data[data.length - 1][3];
                var risk = demographicRisk(popDensity,lowRiskDensity,highRiskDensity);
                popDensityEl.setAttribute("style", "background-color: " + risk + ";");
                popDensityEl.innerHTML = Math.round(popDensity) + " per sq. mi.";
            });

            fetch('https://api.census.gov/data/2019/acs/acsse?get=NAME,K200103_001E&for=county:' + countyFips + '&in=state:' + stateFips)
            .then(response => response.json())
            .then(function(data) {
                medAge = data[data.length - 1][1];
                var risk = demographicRisk(medAge,lowRiskAge,highRiskAge);
                medAgeEl.setAttribute("style", "background-color: " + risk + ";");
                medAgeEl.innerHTML = Math.round(medAge);
            });

            fetch('https://api.census.gov/data/timeseries/poverty/saipe?get=COUNTY,YEAR,SAEPOVRTALL_PT,SAEPOVALL_PT,SAEMHI_PT,NAME&for=county:' + countyFips + '&in=state:' + stateFips)
            .then(response => response.json())
            .then(function(data) {
                povRate = data[data.length - 1][2];
                var risk = demographicRisk(povRate,lowRiskPov,highRiskPov);
                povRateEl.setAttribute("style", "background-color: " + risk + ";");
                povRateEl.innerHTML = Math.round(povRate) + "%";
            });
        }
        // State Level FIPS
        else {
            fetch('https://api.census.gov/data/2019/pep/population?get=COUNTY,DATE_CODE,DATE_DESC,DENSITY,POP,NAME,STATE&for=state:' + fips)
            .then(response => response.json())
            .then(function(data) {
                popDensity = data[data.length - 1][3];
                var risk = demographicRisk(popDensity,lowRiskDensity,highRiskDensity);
                popDensityEl.setAttribute("style", "background-color: " + risk + ";");
                popDensityEl.innerHTML = Math.round(popDensity) + " per sq. mi.";
            });

            fetch('https://api.census.gov/data/2019/acs/acsse?get=NAME,K200103_001E&for=state:' + fips)
            .then(response => response.json())
            .then(function(data) {
                medAge = data[data.length - 1][1];
                var risk = demographicRisk(medAge,lowRiskAge,highRiskAge);
                medAgeEl.setAttribute("style", "background-color: " + risk + ";");
                medAgeEl.innerHTML = Math.round(medAge);
            });

            fetch('https://api.census.gov/data/timeseries/poverty/saipe?get=COUNTY,YEAR,SAEPOVRTALL_PT,SAEPOVALL_PT,SAEMHI_PT,NAME&for=state:' + fips)
            .then(response => response.json())
            .then(function(data) {
                povRate = data[data.length - 1][2];
                var risk = demographicRisk(povRate,lowRiskPov,highRiskPov);
                povRateEl.setAttribute("style", "background-color: " + risk + ";");
                povRateEl.innerHTML = Math.round(povRate) + "%";
            });
        }
    }
}