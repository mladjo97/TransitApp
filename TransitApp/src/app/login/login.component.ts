import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { LoginService } from '../services/login.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private notificationService: NotificationService, private loginService: LoginService, 
              private authService: AuthService) { }

  ngOnInit() {
  }

  onLogin(f: NgForm): void {
    this.loginService.logIn(`${f.value.email}`,`${f.value.password}`).subscribe( 
      (response) => { 
        this.authService.logIn(response);
      },

      (error) => {
         if(error.status !== 0){
          let errorBody = JSON.parse(error._body);
          this.notificationService.notifyEvent.emit(errorBody.error_description);
        } else {
          this.notificationService.notifyEvent.emit('An error ocurred while trying to log in. The server is probably down.');
        }        
      }
    );
  }

}
