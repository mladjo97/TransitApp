import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BusLineService } from '../_services/busline.service';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../_services/notification.service';
import { BusLine } from '../_models/busline.model';
import { DrawService } from '../_services/draw.service';

// javascript file to handle map interaction
import * as mapJS from '../_scripts/map.js';
declare var removeLayersFromMap: any;

@Component({
  selector: 'app-buslines',
  templateUrl: './buslines.component.html',
  styleUrls: ['./buslines.component.css']
})
export class BuslinesComponent implements OnInit {
  private busLines: [];
  private busLineTypes: {}[] = [];
  
  @Input() isBuyTicket: boolean = false;
  private isAdmin: boolean = false;
  private showFilters: boolean = false;
  
  @Input() isRoute: boolean = false;
  @Output() clickEvent: EventEmitter<BusLine> = new EventEmitter<BusLine>();

  constructor(private notificationService: NotificationService,
              private busLineService: BusLineService,
              private authService: AuthService,
              private drawService: DrawService,
              private router: Router) { }

  ngOnInit() {
    if(this.authService.isAdmin()){
      this.isAdmin = true;
    }

    this.getAllBusLineTypes();
    this.getAllBusLines();    
  }

  getAllBusLines(): void {
    this.busLineService.getAll().subscribe(
      (response) => {
        this.busLines = response.json();        
      },
      
      (error) => {
        console.log('Error in BusLinesComponent onNgInit() -> getAll()');        
    });
  }

  getAllBusLineTypes(): void {
    this.busLineService.getAllBusLineTypes().subscribe(
      (response) => { 
        // an additional busline type for default 
        this.busLineTypes.push({Id: "-1", Name: "All bus line types"});
        
        const responseJson = response.json();
        for(let i = 0; i < responseJson.length; i++){            
          this.busLineTypes.push(responseJson[i]);
        }

      },

      (error) => console.log('Error in BUSLINES / ngOnInit() -> getAllBusLines()')
    );
  }

  onBusLineClick(busLineId: number): void {
    if(!this.isRoute){
      this.router.navigate(['/timetables', busLineId]);
    } else {
      
      // fetch busline data
      this.busLineService.getById(busLineId).subscribe(
        (response) => {
          // notify map to draw elements
          this.drawService.drawEvent.emit(response.json());

        },
  
        (error) => {
          this.router.navigate(['/routes']);
        }
      );

    }
  }

  onDelete(id: number): void {    
    this.busLineService.deleteBusLine(id).subscribe(
      (response) => {
        this.getAllBusLines();
        this.notificationService.notifyEvent.emit('Successfully deleted busline: ' + response.json().Name);
        this.router.navigate(['/timetables']);
      },

      (error) => {
        console.log(error.json());
      }
    );    
  }

  onChange(busLineTypeId: string): void {
    if(busLineTypeId == '-1') {
      this.getAllBusLines();
    } else {
      this.busLineService.filterBusLines(+busLineTypeId).subscribe(
        (response) => {
          this.busLines = response.json();
        },

        (error) => {
          console.log(error);
        }
      );
    }
  }

  onShowFilters(): void {
    this.showFilters = true;
  }

  onClearFilters(): void {
    this.showFilters = false;
    this.getAllBusLines();
  }

}
