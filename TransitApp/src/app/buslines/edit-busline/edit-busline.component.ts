import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from 'src/app/_services/notification.service';
import { BusLineService } from 'src/app/_services/busline.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { StartTime } from 'src/app/_models/start-time.model';
import * as moment from 'moment';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Station } from 'src/app/_models/station.model';
import { StationsService } from 'src/app/_services/station.service';

@Component({
  selector: 'app-edit-busline',
  templateUrl: './edit-busline.component.html',
  styleUrls: ['./edit-busline.component.css']
})
export class EditBuslineComponent implements OnInit, OnDestroy {

  private id: number;
  private previousPage: string;

  private busLine: any;
  private idSubscription: Subscription;
  private busLineTypes: [] = [];
  private timetable: StartTime[] = [];
  private stationsSelect: any[] = [];
  private stations: Station[] = [];

  private invalidTimeFormat: boolean = false;
  private timetableActive: boolean = false;
  private submitted: boolean = false;
  private stationsActive: boolean = false;

  private buslineForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null),
    description: new FormControl(null),
    busLineTypeId: new FormControl(null),
    timetable: new FormControl(null),
    busLineStations: new FormControl(null)
  });

  constructor(private notificationService: NotificationService,
              private route: ActivatedRoute,
              private busLineService: BusLineService,
              private stationsService: StationsService,
              private router: Router) { }

  ngOnInit() {
    // update all busline type (for select)
    this.busLineService.getAllBusLineTypes().subscribe(
      (response) => this.busLineTypes = response.json(),
      (error) => console.log('Error in EditBuslineComponent / ngOnInit() -> getAllBusLines()')
    );

     // update all station (for select)
     this.stationsService.getAll().subscribe(
      (response) => this.stationsSelect = response.json(),
      (error) => console.log(error)
    );

    this.idSubscription = this.route.params.subscribe( 
      (params: Params) => {
          this.id = +params['id'];     
          this.updateForm();
    } );

    this.previousPage = `/${this.router.url.split('/')[1]}`;
  }

  ngOnDestroy() {
    this.idSubscription.unsubscribe();
  }

  updateForm(): void {
    this.busLineService.getById(this.id).subscribe(
      (response) => {
        // get busline information
        this.busLine = response.json();
        
        // get busline stations
        for(let i = 0; i < this.busLine.BusLineStations.length; i++)
          this.stations.push(this.busLine.BusLineStations[i].Station);

        if(this.stations.length > 0)
          this.stationsActive = true;

        // update form values
        this.buslineForm.patchValue({
          name: this.busLine.Name,
          description: this.busLine.Description,
          busLineTypeId: this.busLine.BusLineTypeId,
          busLineStations: this.stations
        });

        // update side timetable 
        for(let i = 0; i < this.busLine.Timetable.length; i++) {
          let time = moment.utc(this.busLine.Timetable[i].Time).format("HH:mm");
          this.onAddTime(time);
        }

      },

      (error) => {
        this.router.navigate([this.previousPage]);
      }
    );
  }

  onAddStation(stationId: number): void {

    let station = this.stationsSelect.find(s => { return s.Id == stationId});

    if(station !== undefined) {
      if(this.stations.find(s => s.Id == station.Id) === undefined) {
        this.stations.push(station);
        this.stationsActive = true;
      }
    }
  }

  onRemoveStation(stationIndex: number): void {

    this.stations.splice(stationIndex, 1);

    if(this.stations.length == 0)
      this.stationsActive = false;
  }

  onMoveUpStation(stationIndex: number): void {
    if(stationIndex !== 0) {
      let temp = this.stations[stationIndex];
      this.stations[stationIndex] = this.stations[stationIndex - 1];
      this.stations[stationIndex - 1] = temp;
    }
  }

  onMoveDownStation(stationIndex: number): void {
    if(stationIndex !== this.stations.length - 1){
      let temp = this.stations[stationIndex];
      this.stations[stationIndex] = this.stations[stationIndex + 1];
      this.stations[stationIndex + 1] = temp;
    }
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
    this.submitted = true;

    // dummy object array for busline stations
    let busLineStations = [];
    for(let i = 0; i < this.stations.length; i++){
      busLineStations.push({
        stationId: this.stations[i].Id,
        station: this.stations[i],
        stopOrder: i
      });
    }

    // update timetable, id & stations
    this.buslineForm.patchValue({
      id: this.id,
      timetable: this.timetable,
      busLineStations: busLineStations
    });
    
    // PUT to api
    this.busLineService.editBusLine(this.id, this.buslineForm.value).subscribe(
      (response) => {
        this.submitted = false;
        this.notificationService.notifyEvent.emit('Successfully edited busline.');
        this.router.navigate([this.previousPage]);
      },

      (error) => {
        this.submitted = false;
        console.log(error);
        this.notificationService.notifyEvent.emit('An error occurred during editing.');
      }
    );
     
  }

}
