import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user.model';
import { UserService } from '../_services/user.service';
import { NotificationService } from '../_services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private user: User;
  private isLoggedIn: boolean = false;

  constructor(private authService: AuthService,
              private userService: UserService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();

    this.user = new User();
    // get user info
    if(this.isLoggedIn){
      this.userService.getUserInfo().subscribe(
        (response) => {
          this.user = response.json();
        },
        (error) => console.log(error)
      );
    }

    // listen to logout
    this.notificationService.sessionEvent.subscribe(
      (loggedIn: boolean) =>  { 
        this.isLoggedIn = loggedIn;
    });
    
  }

}
