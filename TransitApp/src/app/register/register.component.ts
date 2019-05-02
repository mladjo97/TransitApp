import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'
import { User } from '../models/user.model';
import { RegisterService } from '../services/register.service';
import { NotificationService } from '../services/notification.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private genders = ['Male', 'Female'];
  private submitted: boolean = false;
  private user: User;


  constructor(private router: Router, private registerService: RegisterService,
              private notificationService: NotificationService, private authService: AuthService) { }

  ngOnInit() {
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['/']);  // vrati korisnika na pocetnu stranu 
    }
  }

  onSubmit(f: NgForm) {
    this.user = new User(f.value.firstName, f.value.lastName, f.value.email, f.value.gender, f.value.password, f.value.confirmPassword);
    this.submitted = true;  // animation

    this.registerService.registerUser(this.user).subscribe( 
      (response) => {
        this.notificationService.notifyEvent.emit('Successfully registered. You can now log in.');
        this.router.navigate(['/login']);
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
  }

}
