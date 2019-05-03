import { Component, OnInit } from '@angular/core';
import { BusLineService } from '../services/busline.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-buslines',
  templateUrl: './buslines.component.html',
  styleUrls: ['./buslines.component.css']
})
export class BuslinesComponent implements OnInit {
  private busLines: [];
  private addAllowed: boolean = false;

  constructor(private busLineService: BusLineService,
              private authService: AuthService) { }

  ngOnInit() {
    if(this.authService.isLoggedIn()){
      if(this.authService.isAdmin()){
        this.addAllowed = true;
      }
    }

    this.busLineService.getAll().subscribe(
      (response) => {
        this.busLines = response.json();        
      },
      
      (error) => {
        console.log('Error in BUSLINES onNgInit() -> getAll()');        
      });
  }

}
