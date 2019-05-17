import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BusLineService } from 'src/app/services/busline.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit, OnDestroy {
  private id: number;
  private idSubscription: Subscription;
  private busLine: {} = {};
  private formattedTimetable: Array<Array<string>> = new Array<Array<string>>();

  constructor (private route: ActivatedRoute, 
              private busLineService: BusLineService,
              private router: Router) {                
               }

  ngOnInit() {
    console.log('TIMETABLE INIT')

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
        this.router.navigate(['/timetables']);
      }
    );
  }

  formatTimetable(timetable: any) {
    const keys = [];

    for(let i = 0; i < timetable.length; i++) {
      let time = moment.utc(timetable[i].Time).format("HH:mm"); 
      
      let hour = time.split(':')[0];
      let minute = time.split(':')[1];
      
      if(hour in this.formattedTimetable){
        this.formattedTimetable[`${time.split(':')[0]}`].push(time.split(':')[1]);
      } else {
        this.formattedTimetable[`${time.split(':')[0]}`] = new Array();
        keys.push(`${time.split(':')[0]}`);
        this.formattedTimetable[`${time.split(':')[0]}`].push(time.split(':')[1]);
      }
    }

    // sort timetables by minute
    for(var prop in this.formattedTimetable) {
      this.formattedTimetable[prop].sort((a, b) => {
        if(a < b) { return -1; }
        if(a > b) { return 1; }
        return 0;
      });
    }

  }

}
