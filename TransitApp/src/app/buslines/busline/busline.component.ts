import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BusLineService } from 'src/app/services/busline.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-busline',
  templateUrl: './busline.component.html',
  styleUrls: ['./busline.component.css']
})
export class BuslineComponent implements OnInit, OnDestroy {
  private id: number;
  private idSubscription: Subscription;
  private busLine: {} = {};

  constructor (private route: ActivatedRoute, 
              private busLineService: BusLineService,
              private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.idSubscription = this.route.params.subscribe( (params: Params) => this.id = params['id'] );

    this.busLineService.getById(this.id).subscribe(
      (response) => {
        this.busLine = response.json();
      },

      (error) => {
        this.router.navigate(['/buslines']);
      }
    );
  }

  ngOnDestroy() {
    this.idSubscription.unsubscribe();
  }

}
