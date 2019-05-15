import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { BusLineService } from 'src/app/services/busline.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { StartTime } from 'src/app/models/start-time.model';
import * as moment from 'moment';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
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

  private buslineForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null),
    description: new FormControl(null),
    busLineTypeId: new FormControl(null),
    timetable: new FormControl(null)
  });

  constructor(private notificationService: NotificationService,
              private route: ActivatedRoute,
              private busLineService: BusLineService,
              private router: Router) { }

  ngOnInit() {
    console.log('EDITBUSLINE INIT')

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
        // get busline information
        let busLineJSON = response.json();
        this.busLine = busLineJSON;
        
        // update form values
        this.buslineForm.patchValue({
          name: busLineJSON.Name,
          description: busLineJSON.Description,
          busLineTypeId: busLineJSON.BusLineTypeId
        });

        // update side timetable 
        for(let i = 0; i < busLineJSON.Timetable.length; i++) {
          let time = moment.utc(busLineJSON.Timetable[i].Time).format("HH:mm");
          this.onAddTime(time);
        }

      },

      (error) => {
        this.router.navigate(['/timetables']);
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
    
    // update timetable & id
    this.buslineForm.patchValue({
      id: this.id,
      timetable: this.timetable
    });
    
    // PUT to api
    this.busLineService.editBusLine(this.id, this.buslineForm.value).subscribe(
      (response) => {
        this.notificationService.notifyEvent.emit('Successfully edited busline.');
        this.router.navigate([`/timetables/${this.id}`]);
      },

      (error) => {
        console.log(error);
        this.notificationService.notifyEvent.emit('An error occurred during editing.');
      }
    );
     
  }

}
