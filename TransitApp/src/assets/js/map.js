/*
 * Author: Mladen Milosevic
 * Date: 23.06.2018
 * Modified: 15.05.2019
 */

var globLong = 19.837059974670407;
var globLat = 45.251929952692876;

var map;
var clickedMarkerLayer, startMarkerLayer;


$(document).ready(function() {
    $('#map').data('loaded', false);
    loadMap();
    $('#routesButton').click(function() {
        loadMap();
    });
});


function loadMap() {
    console.log('Loading map ...');

    if($('#map').data('loaded'))
        return;

    setTimeout(function () {

        map = new ol.Map({
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

        map.on('click', function (evt) {
            let lonlat = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
            let clickedLon = lonlat[0];
            let clickedLat = lonlat[1];
            console.log('Lon: ' + clickedLon);
            console.log('Lat: ' + clickedLat);

            map.removeLayer(clickedMarkerLayer);
            let clickedPosition = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([clickedLon, clickedLat]))
            });

            clickedPosition.setStyle(new ol.style.Style({
                image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                    color: '#0f7ac6',
                    crossOrigin: 'anonymous',
                    src: 'assets/img/dot.png'
                }))
            }));

            clickedMarkerLayer = new ol.layer.Vector({
                source: new ol.source.Vector({
                    features: [clickedPosition]
                })
            });

            map.addLayer(clickedMarkerLayer);

        });
        
        $('#map').data('loaded', true);

    }, 1000);

}
