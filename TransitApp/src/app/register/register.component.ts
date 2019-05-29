import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'
import { User } from '../_models/user.model';
import { RegisterService } from '../_services/register.service';
import { NotificationService } from '../_services/notification.service';
import { AuthService } from '../_services/auth.service';

import * as $ from 'jquery';
import { UserService } from '../_services/user.service';

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
  private userTypes: [] = [];

  constructor(private router: Router,
              private registerService: RegisterService,
              private notificationService: NotificationService,
              private authService: AuthService,
              private userService: UserService) { }

  ngOnInit() {
    if(this.authService.isLoggedIn()) {
      if(!this.authService.isAdmin()) {
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

  onSubmit(f: NgForm) {

    this.user = new User(f.value.firstName,
                         f.value.lastName,
                         f.value.email, 
                         f.value.gender, 
                         f.value.password,
                         f.value.confirmPassword,
                         f.value.address,
                         $('#dob').val());

    this.submitted = true;  // animation

    if(this.role == 'TicketInspector') {
      this.registerService.registerTicketInspector(this.user).subscribe( 
        (response) => {
          this.submitted = false;  // animation

          this.notificationService.notifyEvent.emit('Successfully registered a new ticket inspector.');
          this.router.navigate(['/']);
        },
  
        (error) => {       
          this.submitted = false;  // animation
  
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
            this.notificationService.notifyEvent.emit('An error ocurred during registration. The server is probably down.');
          }        
        }
      );

    } else {
      this.registerService.registerUser(this.user, this.fileToUpload).subscribe( 
        (response) => {
          this.submitted = false;  // animation

          this.notificationService.notifyEvent.emit('Successfully registered. You can now log in.');
          this.router.navigate(['/login']);
        },
  
        (error) => {       
          this.submitted = false;  // animation
          console.log(error);

          // if(error.status !== 0){
          //   // Notify the user about errors from WebAPI (validation error reply)
          //   let regReply = JSON.parse(error._body);
          //   let errorMessages = Object.values(regReply.ModelState);
  
          //   if(errorMessages.length > 0) {
          //     for(let i = 1; i < errorMessages.length; i++){
          //       this.notificationService.notifyEvent.emit(errorMessages[i][0]);
          //     }
          //   }
          // } else {
          //   this.notificationService.notifyEvent.emit('An error ocurred during registration. The server is probably down.');
          // }        
        }
      );
    }
    
  }

}
