import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../models/user.model';
import { RegisterService } from '../services/register.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private genders = ['Male', 'Female'];
  private user: User;

  constructor(private registerService: RegisterService, private notificationService: NotificationService) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    this.user = new User(f.value.firstName, f.value.lastName, f.value.email, f.value.gender, f.value.password, f.value.confirmPassword);
    console.log(this.user);

    this.registerService.registerUser(this.user).subscribe( 
      (response) => {
        this.notificationService.notifyEvent.emit('Successfully registered.');
        console.log(response);
      },

      (error) => {       
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
