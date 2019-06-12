import { Component, OnInit, NgZone } from '@angular/core';
import { LocationService } from '../_services/location.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  isConnected: Boolean;
  notifications: string[];
  time: string;

  constructor(private locationService: LocationService, private ngZone: NgZone) { 
    this.isConnected = false;
    this.notifications = [];
  }

  ngOnInit() {
    this.checkConnection();
    this.locationService.notificationReceived.subscribe(data => this.onNotification(data));
  }

  public onNotification(data) {
    this.ngZone.run(() => { 
      this.notifications.push(data);  
      console.log(this.notifications);
   });  
 }

  private checkConnection(){
    this.locationService.startConnection().subscribe(
      e => {
        this.isConnected = e; 
        if (e) {
          console.log('connected');
        }
    });
  }

}
