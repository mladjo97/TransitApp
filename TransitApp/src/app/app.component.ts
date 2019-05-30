import { Component, OnInit } from '@angular/core';
import { SnackbarService } from 'ngx-snackbar';
import { NotificationService } from './_services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor(private notificationService: NotificationService, 
              private snackbarService: SnackbarService) { }

  ngOnInit() {
    // observables
    this.notificationService.notifyEvent.subscribe((message: string) => this.onNotify(message));
    
  }
  
  onNotify(message: string) {
    this.snackbarService.clear();
    const _this = this;
    this.snackbarService.add({
      msg: `${message}`,
      timeout: 5000,
      action: {
        text: 'OK',
        onClick: (snack) => {
          //console.log('dismissed: ' + snack.id);
        },
      },
      onAdd: (snack) => {
        //console.log('added: ' + snack.id);
      },
      onRemove: (snack) => {
        //console.log('removed: ' + snack.id);
      }
    });
  }
  
}
