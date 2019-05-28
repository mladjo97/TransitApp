import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private user: {};
  private userLoaded: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.userService.getUserInfo().subscribe(
      (response) => {
        var userJSON = response.json();

        var date = new Date(Date.parse(userJSON.DateOfBirth));
        userJSON.DateOfBirth = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;

        this.user = userJSON;
        this.userLoaded = true;
      },

      (error) => {
        console.log(error);        
      }
    );
  }

}
