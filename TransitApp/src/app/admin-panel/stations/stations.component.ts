import { Component, OnInit } from '@angular/core';
import { StationsService } from 'src/app/_services/station.service';
import { AuthService } from 'src/app/_services/auth.service';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent implements OnInit {
  private stations: {}[];
  private isAdmin: boolean = false;

  constructor(private stationsService: StationsService,
              private authService: AuthService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    if(this.authService.isAdmin())
      this.isAdmin = true;  // postoji vec Guard koji ovo proverava

    this.getAllStations();
  }

  getAllStations(): void {
    this.stationsService.getAll().subscribe(
      (response) => {
        this.stations = response.json();
        console.log(this.stations);
      },

      (error) => {
        console.log(error);
      }
    );
  }

  onDelete(id): void {
    this.stationsService.deleteStation(id).subscribe(
      (response) => {
        this.notificationService.notifyEvent.emit('Successfully deleted station with id: ' + id);
        this.getAllStations();
      },

      (error) => {
        console.log(error);
      }
    );
  }

}
