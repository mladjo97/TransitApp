import { Component, OnInit } from '@angular/core';

import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';

import { fromLonLat } from 'ol/proj';
import { DrawService } from '../services/draw.service';
import { BusLine } from '../models/busline.model';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView;

  constructor(private drawService: DrawService)
   {
     // subscribe for drawing
    this.drawService.drawEvent.subscribe((busLine: BusLine) => this.onDraw(busLine));
   }

  ngOnInit() {
    console.log('Initilazing map...');
    
    this.source = new OlXYZ({
      url: 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
    });

    this.layer = new OlTileLayer({
      source: this.source
    });

    this.view = new OlView({
      center: fromLonLat([19.837131, 45.251774]),
      zoom: 13
    });

    this.map = new OlMap({
      target: 'map',
      layers: [this.layer],
      view: this.view
    });
  }

  onDraw(busLine: BusLine): void {
    console.log(busLine);
  }

}
