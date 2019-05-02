import { Component, OnInit } from '@angular/core';
import { BusLineService } from '../services/busline.service';

@Component({
  selector: 'app-buslines',
  templateUrl: './buslines.component.html',
  styleUrls: ['./buslines.component.css']
})
export class BuslinesComponent implements OnInit {
  private busLines: [];

  constructor(private busLineService: BusLineService) { }

  ngOnInit() {
    this.busLineService.getAll().subscribe(
      (response) => {
        this.busLines = response.json();
      },
      
      (error) => {
        console.log('Error in BUSLINES onNgInit() -> getAll()');        
      });
  }

}
