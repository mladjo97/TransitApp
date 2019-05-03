import { Component, OnInit } from '@angular/core';
import { SnackbarService } from 'ngx-snackbar';
import { NotificationService } from './services/notification.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private loggedIn: boolean;

  constructor(private notificationService: NotificationService, 
              private snackbarService: SnackbarService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    // observables
    this.notificationService.notifyEvent.subscribe((message: string) => this.onNotify(message));
    this.notificationService.sessionEvent.subscribe((loggedIn: boolean) => this.loggedIn = loggedIn);

    // session
    this.loggedIn = this.authService.isLoggedIn();
  }

  onLogout() {
    if(this.authService.isLoggedIn()) {
      this.authService.logOut();
      this.loggedIn = false;
      this.onNotify('You have successfully logged out.');
      this.router.navigate(['/']); 
    } else {
      this.onNotify('You are not logged in.'); // ovo se nikad ni nece desiti, but better safe than sure
    }
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
