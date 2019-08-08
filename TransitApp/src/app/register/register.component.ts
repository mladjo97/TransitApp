import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'
import { User } from '../_models/user.model';
import { RegisterService } from '../_services/register.service';
import { NotificationService } from '../_services/notification.service';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { UserType } from '../_models/user-type.model';

// js files for date 
import * as mainScript from 'src/app/_scripts/main.js';
declare var getDate: any;
declare var initDatePicker: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private genders = ['Male', 'Female'];
  private submitted: boolean = false;
  private user: User;
  private role: string;
  private fileToUpload: File = null;
  private userTypes: any[];
  private showImageInput: boolean = false;

  constructor(private router: Router,
    private registerService: RegisterService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private userService: UserService) { }

  ngOnInit() {
    initDatePicker();

    if (this.authService.isLoggedIn()) {
      if (!this.authService.isAdmin()) {
        this.router.navigate(['/']);  // go back unless it's an admin adding a new ticket inspector
      } else {
        this.role = 'TicketInspector';
      }
    }

    // get all user types
    this.userService.getUserTypes().subscribe(
      (response) => this.userTypes = response.json(),
      (error) => console.log(error)
    );
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  onChange(userTypeId: number) {
    let userType = this.userTypes.find((type) => {
      return type._id == userTypeId;
    });
    this.showImageInput = userType.name !== "Regular";
  }

  formatDate(date: Date): string {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  onSubmit(f: NgForm) {
    // update date from datetimepicker
    const date = this.formatDate(new Date(getDate()));
    console.log(date);
    // jesus christ man
    this.user = new User(f.value.firstName, f.value.lastName, f.value.email, f.value.gender,
      f.value.password, f.value.confirmPassword, f.value.address,
      date, f.value.userTypeId);

    if (this.user.password !== this.user.confirmPassword) {
      this.notificationService.notifyEvent.emit('Password and Confirm password do not match.');
      return;
    }

    delete this.user.confirmPassword;

    this.submitted = true;  // animation
    // admin adding a new ticket inspector? 
    if (this.role == 'TicketInspector') {

      // change to regular usertype id
      let userType = this.userTypes.find((type) => {
        return type.name == "Regular";
      });
      this.user.userTypeId = userType.Id;

      this.registerService.registerTicketInspector(this.user).subscribe(
        (response) => {
          this.submitted = false;  // animation

          this.notificationService.notifyEvent.emit('Successfully registered a new ticket inspector.');
          this.router.navigate(['/']);
        },

        (error) => {
          this.submitted = false;  // animation
          this.notificationService.notifyEvent.emit('An error ocurred during registration. Please, try again.');
        }
      );

    } else {
      console.log(this.user);
      this.registerService.registerUser(this.user, this.fileToUpload).subscribe(
        (response) => {
          this.submitted = false;  // animation

          this.notificationService.notifyEvent.emit('Successfully registered. You can now log in.');
          this.router.navigate(['/login']);
        },

        (error) => {
          console.log(error);
          this.submitted = false;  // animation
          this.notificationService.notifyEvent.emit('An error ocurred during registration. Please, try again.');
        }
      );
    }

  }

}
