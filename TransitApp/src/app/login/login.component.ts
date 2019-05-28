import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../_services/notification.service';
import { LoginService } from '../_services/login.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private submitted: boolean = false;

  constructor(private notificationService: NotificationService, private loginService: LoginService, 
              private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['/']);  // vrati korisnika na pocetnu stranu 
    }
  }

  onLogin(f: NgForm): void {
    this.submitted = true;  // animation 
    
    this.loginService.logIn(`${f.value.email}`,`${f.value.password}`).subscribe( 
      (response) => { 
        this.authService.logIn(response);
        this.notificationService.sessionEvent.emit(true);
        this.router.navigate(['/']);
      },

      (error) => {
        this.submitted = false;  // animation 

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
