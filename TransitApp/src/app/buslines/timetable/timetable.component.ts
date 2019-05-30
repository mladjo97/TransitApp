import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BusLineService } from 'src/app/_services/busline.service';
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

  private days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  private formattedTimetable: Array<Array<Array<string>>> = new Array<Array<Array<string>>>();
  private singleDaySelected: Array<Array<string>> = new Array<Array<string>>();

  constructor (private route: ActivatedRoute, 
              private busLineService: BusLineService,
              private router: Router) { }

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
        this.router.navigate(['/timetables']);
      }
    );
  }

  onChange(day: string): void {
    this.singleDaySelected = this.formattedTimetable[day];
  }

  formatTimetable(timetable: any) {
    // add all days
    for(let i = 0; i < this.days.length; i++) {
      this.formattedTimetable[this.days[i]] = new Array();
    }

    // add all times
    for(let i = 0; i < timetable.length; i++) {
      
      const day = this.days[timetable[i].DayOfWeek];
      const time = moment.utc(timetable[i].Time).format("HH:mm"); 
      const hour = time.split(':')[0];
      const minute = time.split(':')[1];

      if(hour in this.formattedTimetable[day]) {
        this.formattedTimetable[day][hour].push(minute);
      } else {
        this.formattedTimetable[day][hour] = new Array();
        this.formattedTimetable[day][hour].push(minute);
      }
      
    }
    
    // sort timetables by minute
    for(let prop in this.formattedTimetable) {
      for(let subprop in this.formattedTimetable[prop]){
        this.formattedTimetable[prop][subprop].sort((a, b) => {
          if(a < b) { return -1; }
          if(a > b) { return 1; }
          return 0;
        });
      }
    }

    // select 'Monday'
    this.singleDaySelected = this.formattedTimetable[this.days[0]];

  }

}
