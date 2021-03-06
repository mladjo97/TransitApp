import { Component, OnInit } from '@angular/core';
import { DrawService } from '../_services/draw.service';
import { BusLine } from '../_models/busline.model';
import { OpenRouteService } from '../_services/open-route.service';

// javascript file to handle map interaction
import * as mapJS from '../_scripts/map.js';
declare var addStationOnMap: any;
declare var addRouteOnMap: any;
declare var loadMap: any;
declare var removeLayersFromMap: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private drawService: DrawService, private routeService: OpenRouteService)
    {
      // subscribe for drawing
      this.drawService.drawEvent.subscribe((busLine: BusLine) => this.onDraw(busLine));
    }

  ngOnInit() {    
    loadMap();
  }

  onDraw(busLine: any): void {
    removeLayersFromMap(); // clear map
    console.log(busLine);
    // foreach busline station get routes and add routes to map
    for(let i = 0; i < busLine.busLineStations.length - 1; i++) {

      setTimeout(() => {

        this.routeService.getRoutes(busLine.busLineStations[i].station.lon, busLine.busLineStations[i].station.lat,
          busLine.busLineStations[i+1].station.lon, busLine.busLineStations[i+1].station.lat).subscribe(

            (response) => {
              const routeCoordinates = response.json().features[0].geometry.coordinates;
              
              for(let i = 0; i < routeCoordinates.length - 1; i++) {
                let start_lon = routeCoordinates[i][0];
                let start_lat = routeCoordinates[i][1];

                let end_lon = routeCoordinates[i+1][0];
                let end_lat = routeCoordinates[i+1][1];

                addRouteOnMap(start_lon, start_lat, end_lon, end_lat);
              }

              // add stations on map
              for(let i = 0; i < busLine.busLineStations.length; i++) {
                addStationOnMap(busLine.busLineStations[i].station.lon,
                                busLine.busLineStations[i].station.lat, 
                                busLine.busLineStations[i].station.name,
                                busLine.busLineStations[i].station.address);
              }

            },

            (error) => {
              console.log("OpenRouteService: Exceeded free rate limit");
            }
          );

      }, 1000);
      
    }

    

  }

}
