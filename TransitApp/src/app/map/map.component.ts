import { Component, OnInit } from '@angular/core';
import { DrawService } from '../services/draw.service';
import { BusLine } from '../models/busline.model';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private drawService: DrawService)
    {
      // subscribe for drawing
      this.drawService.drawEvent.subscribe((busLine: BusLine) => this.onDraw(busLine));
    }

  ngOnInit() {
  }

  onDraw(busLine: BusLine): void {
    console.log(busLine);
  }

}
