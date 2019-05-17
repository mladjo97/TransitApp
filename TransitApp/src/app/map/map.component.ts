import { Component, OnInit } from '@angular/core';
import { DrawService } from '../services/draw.service';
import { BusLine } from '../models/busline.model';

// javascript file to handle map interaction
import * as mapJS from '../../assets/js/map.js';
import { OpenRouteService } from '../services/open-route.service';
declare var addStationOnMap: any;
declare var addRouteOnMap: any;

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
    
  }

  onDraw(busLine: BusLine): void {
    console.log(busLine);

    // foreach busline station get routes and add routes to map
    // for(let i = 0; i < busLine.stations.length - 1; i++) {
    //   this.routeService.getRoutes(busLine.stations[i].Lon, busLine.stations[i].Lat,
    //                               busLine.stations[i+1].Lon, busLine.stations[i].Lat).subscribe(

    //                                 (response) => {
    //                                   const routeCoordinates = response.json().features[0].geometry.coordinates;
    //                                   for(let i = 0; i < routeCoordinates.length - 1; i++) {
    //                                     let start_lon = routeCoordinates[i][0];
    //                                     let start_lat = routeCoordinates[i][1];

    //                                     let end_lon = routeCoordinates[i+1][0];
    //                                     let end_lat = routeCoordinates[i+1][1];

    //                                     addRouteOnMap(start_lon, start_lat, end_lon, end_lat);
    //                                   }
    //                                 },

    //                                 (error) => {
    //                                   console.log(error);
    //                                 }
    //                               );
    // }

    // add stations on map
    for(let i = 0; i < busLine.stations.length; i++) {
      addStationOnMap(busLine.stations[i].Lon, busLine.stations[i].Lat, busLine.stations[i].Name, busLine.stations[i].Address);
    }

  }

}
