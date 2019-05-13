import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { BusLineService } from 'src/app/services/busline.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { StartTime } from 'src/app/models/start-time.model';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-busline',
  templateUrl: './edit-busline.component.html',
  styleUrls: ['./edit-busline.component.css']
})
export class EditBuslineComponent implements OnInit, OnDestroy {
  private id: number;
  private busLine: {};
  private idSubscription: Subscription;
  private busLineTypes: [] = [];
  private timetable: StartTime[] = [];
  private invalidTimeFormat: boolean = false;
  private timetableActive: boolean = false;

  constructor(private notificationService: NotificationService,
              private route: ActivatedRoute,
              private busLineService: BusLineService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.busLineService.getAllBusLineTypes().subscribe(
      (response) => this.busLineTypes = response.json(),
      (error) => console.log('Error in EditBuslineComponent / ngOnInit() -> getAllBusLines()')
    );

    this.idSubscription = this.route.params.subscribe( 
      (params: Params) => {
          this.id = +params['id'];     
          this.updateForm();
      } );
  }

  ngOnDestroy() {
    this.idSubscription.unsubscribe();
  }

  updateForm(): void {
    this.busLineService.getById(this.id).subscribe(
      (response) => {
        let busLineJSON = response.json();
        this.busLine = busLineJSON;        

        for(let i = 0; i < busLineJSON.Timetable.length; i++) {
          let time = moment.utc(busLineJSON.Timetable[i].Time).format("HH:mm");
          this.onAddTime(time);
        }
      },

      (error) => {
        this.router.navigate(['/buslines']);
      }
    );
  }

  onAddTime(time: string): void {

    if(!this.validateTimeFormat(time)) {
      this.invalidTimeFormat = true;
      return;
    }

    this.invalidTimeFormat = false;;
    let st = new StartTime(moment.utc(time, 'HH:mm'));

    for(let i = 0; i < this.timetable.length; i++) {
      if((this.timetable[i].time.hours().toString() == st.time.hours().toString()) 
         &&  (this.timetable[i].time.minutes().toString() == st.time.minutes().toString())) {
           return;
         }
    }

    if(!this.timetable.includes(st)) {
      this.timetable.push(st);
    }

    if(this.timetable.length > 0) {
      this.timetableActive = true;
    }
  }

  onRemoveTime(time: string): void {
    let st = new StartTime(moment.utc(time, 'HH:mm'));

    for(let i = 0; i < this.timetable.length; i++) {
      if((this.timetable[i].time.hours().toString() == st.time.hours().toString()) 
         &&  (this.timetable[i].time.minutes().toString() == st.time.minutes().toString())) {
            this.timetable.splice(i, 1);
         }
    }  

    if(this.timetable.length == 0) {
      this.timetableActive = false;
    }
  }

  validateTimeFormat(time: string): boolean {
    return /^([01]\d|2[0-3]):([0-5]\d)$/g.test(time);
  }

  onSubmit(f: NgForm): void {
    let data = {
      id: this.id,
      name: f.value.name,
      description: f.value.description,
      timetable: this.timetable,
      busLineTypeId: f.value.busLineType
     };

     this.busLineService.editBusLine(this.id, data).subscribe(
       (response) => {
        console.log(response.json());
       },

       (error) => {
         console.log(error.json());
       }
     );
     
  }

}
