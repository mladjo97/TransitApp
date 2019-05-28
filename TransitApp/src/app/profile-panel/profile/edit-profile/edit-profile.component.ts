import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user.model';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  private user = new User();
  private genders = ['Male', 'Female'];
  private submitted: boolean = false;

  profileForm = new FormGroup({
    firstName: new FormControl(null),
    lastName: new FormControl(null),
    email: new FormControl(null),
    password: new FormControl(null),
    confirmPassword: new FormControl(null),
    gender: new FormControl(null)
  });


  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.userService.getUserInfo().subscribe(
      (response) => {
        let resJSON = response.json();
        console.log(resJSON);
        
        this.user = new User(resJSON.FirstName,
                             resJSON.LastName,
                             resJSON.Email, 
                             this.genders.indexOf(resJSON.Gender),
                             null, null);

        this.updateForm();        
      },

      (error) => {
        console.log(error);
        
      }
    );
  }

  updateForm(): void {
    this.profileForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      gender: this.user.gender
    });
  }

  onSubmit() {
    this.submitted = true;

    this.userService.changeUserInfo(this.profileForm.value).subscribe(
      (response) => {
        this.submitted = false;
        this.notificationService.notifyEvent.emit('Successfully changed profile information');
      },

      (error) => {
        this.submitted = false;

        if(error.status !== 0){
          // Notify the user about errors from WebAPI (validation error reply)
          let regReply = JSON.parse(error._body);
          let errorMessages = Object.values(regReply.ModelState);
          
          if(errorMessages.length > 0) {
            for(let i = 1; i < errorMessages.length; i++){
              this.notificationService.notifyEvent.emit(errorMessages[i][0]);
            }
          }
        } else {
          this.notificationService.notifyEvent.emit('An error ocurred during password change. The server is probably down.');
        }       
      }
    );
  }

}
