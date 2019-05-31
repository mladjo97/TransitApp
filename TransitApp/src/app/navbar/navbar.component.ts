import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../_services/notification.service';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private loggedIn: boolean;
  private isAdmin: boolean;
  private isTicketInspector: boolean;

  constructor(private notificationService: NotificationService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    // listen to logout
    this.notificationService.sessionEvent.subscribe(
      (loggedIn: boolean) =>  { 
        this.loggedIn = loggedIn;
        this.isAdmin = this.authService.isAdmin();
        this.isTicketInspector = this.authService.isTicketInspector();
    });

    // session
    this.loggedIn = this.authService.isLoggedIn();
    this.isAdmin = this.authService.isAdmin();
    this.isTicketInspector = this.authService.isTicketInspector();
  }

  onLogout() {
    if(this.authService.isLoggedIn()) {
      this.authService.logOut().subscribe(
        (response) => {
          console.log(response);
          this.loggedIn = false;
          this.notificationService.notifyEvent.emit('You have successfully logged out.');
          this.loadData();
          this.router.navigate(['/']); 
        },

        (error) => {
          console.log(error);
          this.notificationService.notifyEvent.emit('An error ocurred while logging out.');
          this.router.navigate(['/']); 
        }
      );
      
    } else {
      this.notificationService.notifyEvent.emit('You are not logged in.'); // ovo se nikad ni nece desiti, but better safe than sure
    }
  }

}
