(function(global) {
    var forecastViewModel = {
        forecastUrl: "http://forecastapi.apphb.com/api/forecast?",
        temperature: 0,
        temperatureFeel: 0,
        isVeryCold: false,
        alerts: "",
        timezone: "",
        weatherIcon: "",
        summary: "",
        precipIntensity: 0,
        humidity: 0,
        dewPoint: 0,
        wind: 0,
        pressure: 0,
        hourly: "",
        weekly: "",
    };
    
    window.ForecastViewModel = forecastViewModel;
    window.ForecastOnLoad = onLoad;
    
    function onLoad() {
        window.ForecastViewModel.forecastUrl = 
            window.ForecastViewModel.forecastUrl 
                + "latitude=" + window.position.latitude 
                + "&longitude=" + window.position.longitude;
        console.log(window.ForecastViewModel.forecastUrl);
        sendForecastRequest(window.ForecastViewModel.forecastUrl);
    };
    
    function sendForecastRequest(url) {
        d3.json(url, function(data) {
		    var dataJson = JSON.parse(data);
            console.log(dataJson);
            window.ForecastViewModel.timezone = dataJson.timezone;
            //etc etc.
            //NEEDS TO UPDATE THE DATA MODEL IN HOME.HTML!!!
        });
    };
})(window);