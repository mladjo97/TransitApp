import { Component, OnInit } from '@angular/core';
import { BusLineService } from '../services/busline.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-buslines',
  templateUrl: './buslines.component.html',
  styleUrls: ['./buslines.component.css']
})
export class BuslinesComponent implements OnInit {
  private busLines: [];
  private isAdmin: boolean = false;

  constructor(private notificationService: NotificationService,
              private busLineService: BusLineService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
      if(this.authService.isAdmin()){
        this.isAdmin = true;
      }

      this.getAllBusLines();
    
  }

  getAllBusLines(): void {
    this.busLineService.getAll().subscribe(
      (response) => {
        this.busLines = response.json();        
      },
      
      (error) => {
        console.log('Error in BusLinesComponent onNgInit() -> getAll()');        
    });
  }

  onDelete(id: number) {
    
    this.busLineService.deleteBusLine(id).subscribe(
      (response) => {
        this.getAllBusLines();
        this.notificationService.notifyEvent.emit('Successfully deleted busline: ' + response.json().Name);
        this.router.navigate(['/buslines']);
      },

      (error) => {
        console.log(error.json());
      }
    );
    
  }

}
