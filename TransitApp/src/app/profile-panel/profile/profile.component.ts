import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private user: {};
  private isRegularUser: boolean = false;
  private userLoaded: boolean = false;
  private verified: boolean = false;

  constructor(private userService: UserService,
              private authService: AuthService,
              private router: Router,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo(): void {

    this.userService.getUserInfo().subscribe(
      (response) => {
        var userJSON = response.json();
        userJSON.gender = userJSON.gender === 0 ? 'Male' : 'Female';
        var date = new Date(Date.parse(userJSON.dateOfBirth));
        userJSON.dateOfBirth = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
        this.verified = userJSON.verifiedDocumentImage;
        this.user = userJSON;
        this.userLoaded = true;
        this.isRegularUser = userJSON.userType.name === "Regular" ? true : false;
      },

      (error) => {
        console.log(error);        
      }
    );
  }

  onDelete() {
    const id = this.authService.getId();
    console.log(id);
    if(id){
      this.userService.deleteUser(id).subscribe(
        (response) => {
          this.authService.logOut();
          this.notificationService.sessionEvent.emit(false);
          this.router.navigate(['/']);
        },
        (error) => console.log(error)
      );
    }
  }

}
