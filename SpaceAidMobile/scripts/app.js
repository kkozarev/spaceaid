(function (global) {

    // store a reference to the application object that will be created
    // later on so that we can use it if need be
    var app = global.app = global.app || {};

    // create an object to store the models for each view
    window.APP = {
      models: {
        home: {
          title: 'Forecast'
        },
        settings: {
          title: 'Settings'
        },
        contacts: {
          title: 'Contacts',
          ds: new kendo.data.DataSource({
            data: [{ id: 1, name: 'Bob' }, { id: 2, name: 'Mary' }, { id: 3, name: 'John' }]
          }),
          alert: function(e) {
            alert(e.data.name);
          }
        }
      }
    };
    
    window.position = {
        latitude: 0,
        longitude: 0
    };

    // this function is called by Cordova when the application is loaded by the device
    document.addEventListener('deviceready', function () {  
      
        // hide the splash screen as soon as the app is ready. otherwise
        // Cordova will wait 5 very long seconds to do it for you.
        navigator.splashscreen.hide();
        
        app = new kendo.mobile.Application(document.body, {
        
          // comment out the following line to get a UI which matches the look
          // and feel of the operating system
          skin: 'flat',

          // the application needs to know which view to load first
          initial: 'views/home.html'
        });
        
        navigator.geolocation.getCurrentPosition(function(position) {
            window.position.latitude = position.coords.latitude;
            window.position.longitude = position.coords.longitude;
            console.log(window.position);
            global.app.forecastService.onLoad();
        }, function() {
            navigator.notification.alert("Could not get your location. Forecast can't be shown", 
                                          null, 
                                         "No geolocation", 
                                         "OK");
        }, {
            enableHighAccuracy: true
        }); 
        
    }, false);
    
    document.addEventListener("offline", onOffline, false);
    
    function onOffline() {
        navigator.notification.vibrate(100);
        navigator.notification.alert("You need a connection to get the forecast info.", null, "No connection", "OK");
    }


})(window);