/*
 * Author: Mladen Milosevic
 * Date: 23.06.2018
 * Modified: 15.05.2019
 */

 // Novi Sad coordinates
var globLong = 19.837059974670407;
var globLat = 45.251929952692876;

var map;
var clickedMarkerLayer;
var markerLayers = [];
var routeLayers = [];

/**
 * Elements that make up the popup.
 */
var container;
var content;
var closer;
var overlay;


$(document).ready(function() {
    // map loading
    $('#map').data('loaded', false);    
    $('#routesButton').click(function() {
        loadMap();
    });
});


function loadMap() {    
    if($('#map').data('loaded'))
        return;

     // setting up the popup
     container = document.getElementById('popup');
     content = document.getElementById('popup-content');
     closer = document.getElementById('popup-closer');
     overlay = new ol.Overlay({
         element: container,
         autoPan: true,
         autoPanAnimation: {
         duration: 250
         }
     });
     
     closer.onclick = function() {
         overlay.setPosition(undefined);
         closer.blur();
         return false;
     };

    map = new ol.Map({
        overlays: [overlay],
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([globLong, globLat]),
            zoom: 13
        })
    });     

    map.on('click', function(event) {
        map.forEachFeatureAtPixel(event.pixel, function(feature) {
            if(feature.get('name') !== undefined){
                content.innerHTML = `<p>${feature.get('name')}<hr><i>${feature.get('address')}</i></p>`;
                overlay.setPosition(event.coordinate);
            }            
        });
    });

    $('#map').data('loaded', true);

}

function addStationOnMap(lon, lat, name, address){

    let position = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat]))
    });
    
    position.set('name', name);
    position.set('address', address);

    position.setStyle(new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
            crossOrigin: 'anonymous',
            src: 'assets/img/map-station.png'
        }))
    }));

    let markerLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [position]
        })
    });

    markerLayers.push(markerLayer);

    map.addLayer(markerLayer);
}

function addBusOnMap(lon, lat){

    let position = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat]))
    });
    
    position.setStyle(new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
            crossOrigin: 'anonymous',
            src: 'assets/img/bus_map.png'
        }))
    }));

    let markerLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [position]
        })
    });

    markerLayers.push(markerLayer);

    map.addLayer(markerLayer);
}


function removeLayersFromMap() {
    map.removeLayer(clickedMarkerLayer);
    
    for(let i = 0; i < markerLayers.length; i++)
        map.removeLayer(markerLayers[i]);

    for(let i = 0; i < routeLayers.length; i++)
        map.removeLayer(routeLayers[i]);
}


function addRouteOnMap(start_lon, start_lat, end_lon, end_lat) {
    var start_point = ol.proj.fromLonLat([start_lon, start_lat]);
    var end_point = ol.proj.fromLonLat([end_lon, end_lat]);

    let route = new ol.Feature({
        geometry: new ol.geom.LineString([start_point, end_point])
    });

    route.setStyle(new ol.style.Style({
        stroke : new ol.style.Stroke({color: 'blue', width: 4}) 
    }));

    let routeLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [route]
        })
    });

    routeLayers.push(routeLayer);
    map.addLayer(routeLayer);
}


function enableClickOnMap(callback) {
     map.on('click', function (evt) {
        let lonlat = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
        let clickedLon = lonlat[0];
        let clickedLat = lonlat[1];
        console.log('Lon: ' + clickedLon);
        console.log('Lat: ' + clickedLat);

        removeLayersFromMap();

        let clickedPosition = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat([clickedLon, clickedLat]))
        });

        clickedPosition.setStyle(new ol.style.Style({
            image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                crossOrigin: 'anonymous',
                src: 'assets/img/map-station.png'
            }))
        }));

        clickedMarkerLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [clickedPosition]
            })
        });

        map.addLayer(clickedMarkerLayer);
        
        callback(null, [clickedLon, clickedLat]);
    });
}