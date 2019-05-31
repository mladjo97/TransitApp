import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private user: {};
  private isUser: boolean = false;
  private userLoaded: boolean = false;
  private verified: boolean = false;

  constructor(private userService: UserService,
              private authService: AuthService) { }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.isUser = this.authService.isUser();

    this.userService.getUserInfo().subscribe(
      (response) => {
        var userJSON = response.json();
        console.log(userJSON);
        var date = new Date(Date.parse(userJSON.DateOfBirth));
        userJSON.DateOfBirth = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
        this.verified = userJSON.VerifiedDocumentImage;
        this.user = userJSON;
        this.userLoaded = true;
      },

      (error) => {
        console.log(error);        
      }
    );
  }

}
