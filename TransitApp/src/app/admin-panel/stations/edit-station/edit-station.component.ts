import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/_services/notification.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { StationsService } from 'src/app/_services/station.service';

// javascript file to handle map interaction
import * as mapJS from '../../../_scripts/map.js';
declare var addStationOnMap: any;
declare var removeLayersFromMap: any;
declare var enableClickOnMap: any;

@Component({
  selector: 'app-edit-station',
  templateUrl: './edit-station.component.html',
  styleUrls: ['./edit-station.component.css']
})
export class EditStationComponent implements OnInit, OnDestroy {

  private id: number;
  private station: any;
  private idSubscription: Subscription;
  private submitted: boolean = false;

  private stationForm = new FormGroup({
    _id: new FormControl(null),
    name: new FormControl(null),
    address: new FormControl(null),
    lat: new FormControl(null),
    lon: new FormControl(null),
    rowVersion: new FormControl(null)
  });

  constructor(private notificationService: NotificationService,
              private route: ActivatedRoute,
              private stationService: StationsService,
              private router: Router) { }

  ngOnInit() {
    this.idSubscription = this.route.params.subscribe( 
      (params: Params) => {
          this.id = params['id'];     
          this.updateForm();
      } );    
  }

  ngOnDestroy() {
    this.idSubscription.unsubscribe();
  }

  updateForm(): void {
    this.stationService.getById(this.id).subscribe(
      (response) => {
        // get station information        
        this.station = response.json();
        console.log(this.station);

        // update form values
        this.stationForm.patchValue({
          _id: this.station._id,
          name: this.station.name,
          address: this.station.address,
          lon: this.station.lon,
          lat: this.station.lat,
          rowVersion: this.station.rowVersion
        });

        // update map location
        enableClickOnMap(this.updateLatLon.bind(this));

        removeLayersFromMap();
        addStationOnMap(this.station.lon, this.station.lat, this.station.name, this.station.address);
      },

      (error) => {
        this.router.navigate(['/admin/stations']);
      }
    );
  }

  updateLatLon(error, coordinates){
    if(error)
      return;

    // update form values
    this.stationForm.patchValue({
      lon: coordinates[0],
      lat: coordinates[1]
    });
  }

  onSubmit(f: NgForm): void {
    this.submitted = true;

    // PUT to api
    this.stationService.editStation(this.id, this.stationForm.value).subscribe(
      (response) => {
        this.submitted = false;
        this.notificationService.notifyEvent.emit('Successfully edited station.');
        this.router.navigate(['/admin/stations']);
      },

      (error) => {
        this.submitted = false;
        console.log(error);
        this.notificationService.notifyEvent.emit('An error occurred during editing.');
      }
    );
     
  }

}
