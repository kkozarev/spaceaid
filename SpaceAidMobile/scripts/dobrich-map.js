(function(global) {
    var DobrichViewModel,
    app = global.app = global.app || {};
    
    DobrichViewModel = kendo.data.ObservableObject.extend({
        crisis_info_poly: "",
        crisis_info_pt: "",
        hydro_poly: "",
        pt_interest: "",
        settle_pt: "",
        trans_line: "",
        util_poly: "",
        land_cover_corine: "",
        isLoaded: false,
        
        onLoad: function() {
            L.mapbox.accessToken = 'pk.eyJ1Ijoic3BhY2VhaWQiLCJhIjoiMVNQXzJyayJ9.zXReVNp_20W9Zk2BpwDBPQ';
            
            var that = global.app.dobrichMap.viewModel;
            
            if(!that.isLoaded) {
                //var layerCrisysInfoPoly = L.mapbox.featureLayer
                //var layerCrisysInfoPt = L.mapbox.featureLayer
                //etc.
                
                var map = L.mapbox.map('dobrich-map', 'spaceaid.k41knmap').setView([43.53, 27.83], 13);
                
                //var baseLayers = { "First": layerOne, "Second": layerTwo };
                //L.control.layers(baseLayers).addTo(map);
                that.set("isLoaded", true);
            }
        }
    });
    
    app.dobrichMap = {
        viewModel: new DobrichViewModel(),
    };
})(window);
