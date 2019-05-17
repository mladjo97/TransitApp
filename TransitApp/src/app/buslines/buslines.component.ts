import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BusLineService } from '../services/busline.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { BusLine } from '../models/busline.model';
import { DrawService } from '../services/draw.service';

@Component({
  selector: 'app-buslines',
  templateUrl: './buslines.component.html',
  styleUrls: ['./buslines.component.css']
})
export class BuslinesComponent implements OnInit {
  private busLines: [];
  private isAdmin: boolean = false;
  private busLineTypes: {}[] = [];
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

  onBusLineClick(busLineId: number): void {
    if(!this.isRoute){
      this.router.navigate(['/timetables', busLineId]);
    } else {
      console.log('Drawing route on map');
      
      // fetch busline data
      this.busLineService.getById(busLineId).subscribe(
        (response) => {
          let busLineJson = response.json();
          let busLine = new BusLine(busLineJson.Id, busLineJson.Name, busLineJson.Description,
                                    busLineJson.BusLineTypeId, busLineJson.Timetable, busLineJson.Stations);
          // notify map to draw elements
          this.drawService.drawEvent.emit(busLine);

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
