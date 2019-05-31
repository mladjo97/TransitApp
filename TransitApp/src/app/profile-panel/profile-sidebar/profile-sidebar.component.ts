import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/_services/notification.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-profile-sidebar',
  templateUrl: './profile-sidebar.component.html',
  styleUrls: ['./profile-sidebar.component.css']
})
export class ProfileSidebarComponent implements OnInit {
  private isUser: boolean = false;
  private isRegular: boolean = false;

  constructor(private notificationService: NotificationService, 
              private authService: AuthService,
              private userService: UserService) { }

  ngOnInit() {
    this.loadData();

    this.notificationService.userEditedEvent.subscribe(response => this.loadData());
  }

  loadData(): void {
    this.isUser = this.authService.isUser();

    this.userService.getUserInfo().subscribe(
      (response) => this.isRegular = response.json().UserType == "Regular" ? true : false,
      (error) => console.log(error)
    );
  }

}
