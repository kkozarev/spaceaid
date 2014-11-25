(function(global) {
    var ForecastViewModel,
    app = global.app = global.app || {};
    
    ForecastViewModel = kendo.data.ObservableObject.extend({
        forecastUrl: "http://forecastapi.apphb.com/api/forecast?",
        temperature: 0,
        temperatureFeel: 0,
        isVeryCold: false,
        alerts: {},
        timezone: "",
        weatherIcon: "",
        summary: "",
        precipIntensity: 0,
        precipProbability: 0,
        humidity: 0,
        dewPoint: 0,
        wind: 0,
        pressure: 0,
        hourly: "",
        daily: "",    
        sendForecastRequest: function(url) {
            d3.json(url, function(data) {
                var that = global.app.forecastService.viewModel;
		        var dataJson = JSON.parse(data);
                console.log(dataJson);
                
                that.set ("temperature", that.degreesToCelsius(dataJson.currently.temperature));
                that.set ("temperatureFeel", that.degreesToCelsius(dataJson.currently.apparentTemperature));
                if (that.temperatureFeel < 10) {
                    that.set("isVeryCold", true);
                    //TODO: Send notification to the user
                }
                that.set ("timezone", dataJson.timezone);
                that.set ("weatherIcon", dataJson.currently.icon);
                var forecastIcon = document.getElementById("icon");
                forecastIcon.className += dataJson.currently.icon;
                that.set ("summary", dataJson.currently.summary);
                that.set ("precipIntensity", dataJson.currently.precipIntensity);
                that.set ("precipProbability", dataJson.currently.precipProbability * 100);
                that.set ("humidity", dataJson.currently.humidity * 100);
                that.set ("dewPoint", dataJson.currently.dewPoint);
                that.set ("wind", dataJson.currently.windSpeed);
                that.set ("pressure", dataJson.currently.pressure);
                that.set ("hourly", dataJson.hourly.summary);
                that.set ("daily", dataJson.daily.summary);
                if (dataJson.alerts != null) {
                	that.set("alerts", dataJson.alerts);
                }
                console.log(that);
            });
        },
        degreesToCelsius: function(temp) {
             return (((parseInt(temp)- 32)*5)/9 ).toFixed(2);
        }
    });
    
    function onLoad() {
        var that =  global.app.forecastService.viewModel;
        var url = that.forecastUrl
                  + "latitude=" + window.position.latitude 
                  + "&longitude=" + window.position.longitude;
        that.set("forecastUrl", url);
            
        console.log(that.forecastUrl);
        that.sendForecastRequest(that.forecastUrl);
    }
    
    app.forecastService = {
        viewModel: new ForecastViewModel(),
        onLoad: onLoad
    };
})(window);