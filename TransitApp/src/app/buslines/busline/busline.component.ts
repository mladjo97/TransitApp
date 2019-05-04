import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BusLineService } from 'src/app/services/busline.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-busline',
  templateUrl: './busline.component.html',
  styleUrls: ['./busline.component.css']
})
export class BuslineComponent implements OnInit, OnDestroy {
  private id: number;
  private idSubscription: Subscription;
  private busLine: {} = {};
  private formattedTimetable: string[] = [];

  constructor (private route: ActivatedRoute, 
              private busLineService: BusLineService,
              private router: Router) {                
               }

  ngOnInit() {
    this.idSubscription = this.route.params.subscribe( 
      (params: Params) => {
         this.id = +params['id'];     
         this.updateTimetable();
      } );
  }

  ngOnDestroy() {
    this.idSubscription.unsubscribe();
  }

  updateTimetable(): void {
    this.formattedTimetable = [];
    
    this.busLineService.getById(this.id).subscribe(
      (response) => {
        let busLineJSON = response.json();
        this.busLine = busLineJSON;
        this.formatTimetable(busLineJSON.Timetable);
      },

      (error) => {
        this.router.navigate(['/buslines']);
      }
    );
  }

  formatTimetable(timetable: any) {
    for(let i = 0; i < timetable.length; i++) {
      let time = moment.utc(timetable[i].Time).format("HH:mm"); 
      
      let hour = time.split(':')[0];
      let minute = time.split(':')[1];
      
      if(hour in this.formattedTimetable){
        this.formattedTimetable[`${time.split(':')[0]}`].push(time.split(':')[1]);
      } else {
        this.formattedTimetable[`${time.split(':')[0]}`] = new Array();
        this.formattedTimetable[`${time.split(':')[0]}`].push(time.split(':')[1]);
      }
      
    }
  }

}
