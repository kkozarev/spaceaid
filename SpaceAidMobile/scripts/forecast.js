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
        precipProbability: 0,
        humidity: 0,
        dewPoint: 0,
        wind: 0,
        pressure: 0,
        hourly: "",
        daily: "",
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
            window.ForecastViewModel.temperature = degreesToCelsius(dataJson.currently.temperature);
            window.ForecastViewModel.temperatureFeel = degreesToCelsius(dataJson.currently.apparentTemperature);
            window.ForecastViewModel.timezone = dataJson.timezone;
            window.ForecastViewModel.weatherIcon = dataJson.currently.icon;
            window.ForecastViewModel.summary = dataJson.currently.summary;
            window.ForecastViewModel.precipIntensity = dataJson.currently.precipIntensity;
            window.ForecastViewModel.precipProbability = dataJson.currently.precipProbability;
            window.ForecastViewModel.humidity = dataJson.currently.humidity;
            window.ForecastViewModel.dewPoint = dataJson.currently.dewPoint;
            window.ForecastViewModel.wind = dataJson.currently.windSpeed;
            window.ForecastViewModel.pressure = dataJson.currently.pressure;
            window.ForecastViewModel.hourly = dataJson.hourly.summary;
            window.ForecastViewModel.daily = dataJson.daily.summary;
            if (dataJson.alerts != null) {
            	window.ForecastViewModel.alerts = dataJson.alerts;
            }
            console.log(window.ForecastViewModel);
            //NEEDS TO UPDATE THE DATA MODEL IN HOME.HTML!!!
        });
    };
    
    function degreesToCelsius(temp) {
       return (((parseInt(temp)- 32)*5)/9 ).toFixed(2);
    }
})(window);