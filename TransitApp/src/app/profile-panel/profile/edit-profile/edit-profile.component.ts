import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user.model';
import { NotificationService } from 'src/app/_services/notification.service';
import { UserType } from 'src/app/_models/user-type.model';
import { AuthService } from 'src/app/_services/auth.service';

// import js functions for date
import * as mainScript from 'src/app/_scripts/main.js';
import { Router } from '@angular/router';
declare var getDate: any;
declare var setDate: any;

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  private user = new User();
  private genders = ['Male', 'Female'];
  private submitted: boolean = false;
  private userTypes: UserType[];
  private canChangeUserType: boolean = true;

  profileForm = new FormGroup({
    firstName: new FormControl(null),
    lastName: new FormControl(null),
    email: new FormControl(null),
    gender: new FormControl(null),
    address: new FormControl(null),
    userTypeId: new FormControl(null),
    dateOfBirth: new FormControl(null)
  });

  constructor(private authService: AuthService,
    private userService: UserService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    // check if user can change usertype
    if (!this.authService.isUser())
      this.canChangeUserType = false;
    // get all user types
    this.getUserTypes();
    this.updateUserInfo();
  }

  getUserTypes(): void {
    this.userService.getUserTypes().subscribe(
      (response) => {
        this.userTypes = response.json();
      },
      (error) => console.log(error)
    );
  }

  updateUserInfo(): void {
    this.userService.getUserInfo().subscribe(
      (response) => {
        let resJSON = response.json();
        const date = new Date(resJSON.dateOfBirth);
        setDate(date);

        this.user = new User(resJSON.firstName, resJSON.lastName, resJSON.email,
          resJSON.gender, null, null, resJSON.address,
          date, resJSON.userType._id);

        this.updateForm();
      },

      (error) => {
        console.log(error);

      }
    );
  }

  formatDate(date: Date): string {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  updateForm(): void {
    this.profileForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      gender: this.user.gender,
      userTypeId: this.user.userTypeId,
      dateOfBirth: this.user.dateOfBirth,
      address: this.user.address
    });
  }

  onSubmit() {
    this.submitted = true;

    // update date from datetimepicker
    const date = this.formatDate(new Date(getDate()));
    this.profileForm.patchValue({ dateOfBirth: date });

    console.log(this.profileForm.value);
    
    
    this.userService.changeUserInfo(this.profileForm.value).subscribe(
      (response) => {
        this.submitted = false;
        this.notificationService.notifyEvent.emit('Successfully changed profile information');
        this.notificationService.userEditedEvent.emit(true);
      },

      (error) => {
        this.submitted = false;
        console.log(error);      
        this.notificationService.notifyEvent.emit('An error ocurred during password change. Please try again.');
      }
    );
  }

}
