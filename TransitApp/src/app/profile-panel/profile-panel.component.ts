import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { NotificationService } from '../_services/notification.service';

@Component({
  selector: 'app-profile-panel',
  templateUrl: './profile-panel.component.html',
  styleUrls: ['./profile-panel.component.css']
})
export class ProfilePanelComponent implements OnInit {
  private isUser: boolean = false;
  private isRegular: boolean = false;

  constructor(private notificationService: NotificationService, 
              private authService: AuthService,
              private userService: UserService) { }

  ngOnInit() {
    this.isUser = this.authService.isUser();

    this.userService.getUserInfo().subscribe(
      (response) => this.isRegular = response.json().UserType == "Regular" ? true : false,
      (error) => console.log(error)
    );

    this.notificationService.userEditedEvent.subscribe(response => this.ngOnInit());
  }

}
