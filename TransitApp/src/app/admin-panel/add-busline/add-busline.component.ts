import { Component, OnInit } from '@angular/core';
import { BusLineService } from 'src/app/services/busline.service';
import { NgForm } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { StartTime } from 'src/app/models/start-time.model';
import * as moment from 'moment';
import { StationsService } from 'src/app/services/station.service';
import { Station } from 'src/app/models/station.model';

@Component({
  selector: 'app-add-busline',
  templateUrl: './add-busline.component.html',
  styleUrls: ['./add-busline.component.css']
})
export class AddBuslineComponent implements OnInit {

  private busLineTypes: [] = [];
  private stationSelect: any[] = [];
  private stations: Station[] = [];
  private timetable: StartTime[] = [];

  private invalidTimeFormat: boolean = false;
  private timetableActive: boolean = false;
  private submitted: boolean = false;
  private stationsActive: boolean = false;

  constructor (private busLineService: BusLineService, 
              private notificationService: NotificationService,
              private router: Router,
              private stationsService: StationsService) { }

  ngOnInit() {
    this.busLineService.getAllBusLineTypes().subscribe(
      (response) => this.busLineTypes = response.json(),
      (error) => console.log('Error in ADD_BUSLINE / ngOnInit() -> getAllBusLines()')
    );

    this.stationsService.getAll().subscribe(
      (response) => this.stationSelect = response.json(),
      (error) => console.log(error)
    );
  }

  onAddStation(stationId: number): void {

    let station = this.stationSelect.find(s => { return s.Id == stationId});

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
    this.submitted = true;  // animation 

    let busLineStations = [];
    for(let i = 0; i < this.stations.length; i++){
      busLineStations.push({
        stationId: this.stations[i].Id,
        station: this.stations[i],
        stopOrder: i
      });
    }

    let data = {
      name: f.value.name,
      description: f.value.description,
      timetable: this.timetable,
      busLineTypeId: f.value.busLineType,
      busLineStations: busLineStations
     };

     console.log(data);

     this.busLineService.postBusLine(data).subscribe(
       (response) => {
          this.submitted = false;  //animation
          this.notificationService.notifyEvent.emit('Successfully added a new bus line.');
          this.router.navigate(['/admin']);
       },

       (error) => { 
         this.submitted = false;  //animation
         if(error.status !== 0){
          // Notify the user about errors from WebAPI (authorization error reply)
          let regReply = JSON.parse(error._body);          
          this.notificationService.notifyEvent.emit(regReply.Message); 

        } else {
          this.notificationService.notifyEvent.emit('An error ocurred during registration. The server is probably down.');
        }
       }
     );
  }

}
