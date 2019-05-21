import { Component, OnInit, OnDestroy } from '@angular/core';
import { StationsService } from 'src/app/services/station.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';

// javascript file to handle map interaction
import * as mapJS from '../../../../assets/js/map.js';
declare var addStationOnMap: any;
declare var removeStationsFromMap: any;


@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css']
})
export class StationComponent implements OnInit, OnDestroy {
  private station: any;
  private idSubscription: Subscription;
  private id: number;

  constructor(private stationsService: StationsService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() { 
    this.idSubscription = this.route.params.subscribe( 
      (params: Params) => {
         this.id = +params['id'];
         this.updateMap();
      } );
  }

  ngOnDestroy() {
    this.idSubscription.unsubscribe();
  }

  updateMap() {
    this.stationsService.getById(this.id).subscribe(
      (response) => {
        this.station = response.json();
        console.log(this.station);
        
        removeStationsFromMap();
        addStationOnMap(this.station.Lon, this.station.Lat, this.station.Name, this.station.Address);
      },

      (error) => {
        console.log(error);
        this.router.navigate(['/admin-panel/stations']);
      }
    );
  }

}
