import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { BusLineService } from 'src/app/_services/busline.service';
import { StationsService } from 'src/app/_services/station.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private usersCount: number = 0;
  private busLinesCount: number = 0;
  private stationsCount: number = 0;

  constructor(private userService: UserService,
              private buslineService: BusLineService,
              private stationsService: StationsService) { }

  ngOnInit() {
    // get users count
    this.userService.getCount().subscribe(
      (response) => this.usersCount = response.json(),
      (error) => console.log(error)
    );

    // get busline count
    this.buslineService.getCount().subscribe(
      (response) => this.busLinesCount = response.json(),
      (error) => console.log(error)
    );

    // get stations count
    this.stationsService.getCount().subscribe(
      (response) => this.stationsCount = response.json(),
      (error) => console.log(error)
    );
  }

}
