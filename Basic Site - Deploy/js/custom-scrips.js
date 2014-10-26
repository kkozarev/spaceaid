/// <reference path="vendor/d3.js" />


        L.mapbox.accessToken = 'pk.eyJ1Ijoic3BhY2VhaWQiLCJhIjoiMVNQXzJyayJ9.zXReVNp_20W9Zk2BpwDBPQ';
var map = L.mapbox.map('map', 'spaceaid.k03hjd0g')
    .setView([43.278, 27.987], 9);

var earthquakesLayer = L.geoJson(null, { pointToLayer: scaledPoint })
.addTo(map);

function pointColor(feature) {
    return feature.properties.mag > 5 ? '#f55' : '#a00';
}

function pointRadius(feature) {
    return (feature.properties.mag - 4) * 10;
}

function scaledPoint(feature, latlng) {
    return L.circleMarker(latlng, {
        radius: pointRadius(feature),
        fillColor: pointColor(feature),
        fillOpacity: 0.7,
        weight: 0.5,
        color: '#fff'
    }).bindPopup(
        '<h2>' + feature.properties.place + '</h2>' +
        '<h3>' + new Date(feature.properties.time) + '</h3>' +
        feature.properties.mag + ' magnitude');
}

// Request our data and add it to the earthquakesLayer.
d3.json('../JSON/indiastates1.json', function (err, data) {
    earthquakesLayer.addData(data);
    setBrush(data);
});

function setBrush(data) {
    var container = d3.select('#brush'),
        width = container.node().offsetWidth,
        margin = { top: 0, right: 0, bottom: 0, left: 0 },
        height = 100;

    var timeExtent = d3.extent(data.features, function (d) {
        return new Date(d.properties.time);
    });

    var svg = container.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);

    var context = svg.append('g')
        .attr('class', 'context')
        .attr('transform', 'translate(' +
            margin.left + ',' +
            margin.top + ')');

    var x = d3.time.scale()
        .range([0, width])
        .domain(timeExtent);

    var brush = d3.svg.brush()
        .x(x)
        .on('brushend', brushend);

    context.selectAll('circle.quake')
        .data(data.features)
        .enter()
        .append('circle')
        .attr('transform', function (d) {
            return 'translate(' + [x(new Date(d.properties.time)), height / 2] + ')';
        })
        .attr('r', pointRadius)
        .attr('opacity', 0.5)
        .attr('stroke', '#fff')
        .attr('stroke-width', 0.5)
        .attr('fill', pointColor);

    context.append('g')
        .attr('class', 'x brush')
        .call(brush)
        .selectAll('rect')
        .attr('y', -6)
        .attr('height', height);

    function brushend() {
        var filter;
        // If the user has selected no brush area, share everything.
        if (brush.empty()) {
            filter = function () { return true; }
        } else {
            // Otherwise, restrict features to only things in the brush extent.
            filter = function (feature) {
                return feature.properties.time > +brush.extent()[0] &&
                    feature.properties.time < (+brush.extent()[1]);
            };
        }
        var filtered = data.features.filter(filter);
        earthquakesLayer.clearLayers()
            .addData(filtered);
    }
}


