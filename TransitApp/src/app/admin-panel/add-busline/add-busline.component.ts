import { Component, OnInit } from '@angular/core';
import { BusLineService } from 'src/app/services/busline.service';
import { NgForm } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { StartTime } from 'src/app/models/start-time.model';
import * as moment from 'moment';

@Component({
  selector: 'app-add-busline',
  templateUrl: './add-busline.component.html',
  styleUrls: ['./add-busline.component.css']
})
export class AddBuslineComponent implements OnInit {
  private busLineTypes: [] = [];
  private timetable: StartTime[] = [];
  private invalidTimeFormat: boolean = false;
  private timetableActive: boolean = false;
  private submitted: boolean = false;

  constructor (private busLineService: BusLineService, 
              private notificationService: NotificationService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.busLineService.getAllBusLineTypes().subscribe(
      (response) => this.busLineTypes = response.json(),
      (error) => console.log('Error in ADD_BUSLINE / ngOnInit() -> getAllBusLines()')
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
    this.submitted = true;  // animation 

    let data = {
      name: f.value.name,
      description: f.value.description,
      timetable: this.timetable,
      busLineTypeId: f.value.busLineType
     };

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
