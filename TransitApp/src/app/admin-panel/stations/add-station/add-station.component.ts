import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { StationsService } from 'src/app/_services/station.service';
import { NotificationService } from 'src/app/_services/notification.service';

// javascript file to handle map interaction
import * as mapJS from '../../../../assets/js/map.js';
declare var enableClickOnMap: any;
declare var loadMap: any;

@Component({
  selector: 'app-add-station',
  templateUrl: './add-station.component.html',
  styleUrls: ['./add-station.component.css'],
  providers: [NotificationService]
})
export class AddStationComponent implements OnInit {

  private submitted: boolean = false;

  private stationForm = new FormGroup({
    name: new FormControl(null),
    address: new FormControl(null),
    lat: new FormControl(null),
    lon: new FormControl(null)
  });

  constructor(private stationsService: StationsService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    loadMap();
    enableClickOnMap(this.updateLatLon.bind(this));
  }

  updateLatLon(error, coordinates) {
    if(error)
      return;

    // update form values
    this.stationForm.patchValue({
      lon: coordinates[0],
      lat: coordinates[1]
    });
  }

  onSubmit(f: NgForm): void {
    console.log(this.stationForm.value);
    this.submitted = true;
    
    this.stationsService.postStation(this.stationForm.value).subscribe(
      (response) => {
        this.submitted = false;

        console.log(response);
        this.notificationService.notifyEvent.emit('Successfully added new station: ' + this.stationForm.value.name);
      },

      (error) => {
        this.submitted = false;
        console.log(error);
      }
    );
  }
}
