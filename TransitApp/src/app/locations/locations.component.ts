import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { LocationService } from '../_services/location.service';
import { Subscription } from 'rxjs';

// javascript file to handle map interaction
import * as mapJS from '../_scripts/map.js';
import { ActivatedRoute, Params } from '@angular/router';
import { DrawService } from '../_services/draw.service';
declare var addBusOnMap: any;
declare var loadMap: any;
declare var removeLayersFromMap: any;


@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit, OnDestroy {

  isConnected: Boolean;

  subscription: Subscription;
  drawSubscription: Subscription;

  constructor(private locationService: LocationService,
              private drawService: DrawService,
              private ngZone: NgZone) { 
    this.isConnected = false;
  }

  ngOnInit() {
    loadMap();

    this.drawSubscription = this.drawService.locationEvent.subscribe(
      (id: number) => {
        console.log(this.subscription);
        if(this.subscription){
          this.subscription.unsubscribe();
        }

        this.startConnection(id.toString());

      }
    );

    this.locationService.notificationReceived.subscribe(data => this.onNotification(data));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.drawSubscription.unsubscribe();
  }
  
  private startConnection(groupName: string){
    removeLayersFromMap();

    console.log('Connecting to: ' + groupName);

    this.subscription = this.locationService.startConnection(groupName).subscribe(
      e => {
        this.isConnected = e; 
        if (e) {
          console.log('connected');
        }
    });
  }

  public onNotification(data) {
    this.ngZone.run(() => { 
      removeLayersFromMap();

      for(let i = 0; i < data.length; i++){
        addBusOnMap(data[i].Lon, data[i].Lat);
      }

   });  
 }


}
