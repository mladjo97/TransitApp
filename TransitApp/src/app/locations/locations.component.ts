import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

// javascript file to handle map interaction
import * as mapJS from '../_scripts/map.js';
import { DrawService } from '../_services/draw.service';
import { SocketService } from '../_services/socket.service';
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

  constructor(private socketService: SocketService,
              private drawService: DrawService,
              private ngZone: NgZone) { 
    this.isConnected = false;
  }

  ngOnInit() {
    loadMap();

    this.drawSubscription = this.drawService.locationEvent.subscribe(
      (id) => {
        if(this.subscription){
          this.subscription.unsubscribe();
        }

        this.startConnection(id.toString());
      }
    );
  }

  ngOnDestroy() {
    if(this.subscription){
      this.subscription.unsubscribe();
    }

    if(this.drawSubscription){
      this.drawSubscription.unsubscribe();
    }
  }
  
  private startConnection(groupName: string){
    removeLayersFromMap();

    this.socketService.initSocket();

    this.socketService.subToLocationUpdate(groupName).subscribe(
      data => this.onNotification(data),
      err => console.log(err)
    );

  }

  public onNotification(data) {
    this.ngZone.run(() => { 
      removeLayersFromMap();

      for(let i = 0; i < data.length; i++) {
        addBusOnMap(data[i].lon, data[i].lat);
      }

   });  
 }


}
