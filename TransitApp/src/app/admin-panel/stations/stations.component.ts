import { Component, OnInit } from '@angular/core';
import { StationsService } from 'src/app/services/station.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent implements OnInit {
  private stations: {}[];
  private isAdmin: boolean = false;

  constructor(private stationsService: StationsService,
              private authService: AuthService) { }

  ngOnInit() {
    if(this.authService.isAdmin())
      this.isAdmin = true;  // postoji vec Guard koji ovo proverava

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

}
