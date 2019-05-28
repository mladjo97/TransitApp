import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  private submitted: boolean = false;

  constructor(private userService: UserService,
              private notificationService: NotificationService) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm): void {
    this.submitted = true;

    this.userService.changeUserPassword(f.value).subscribe(
      (response) => {
        this.submitted = false;
        this.notificationService.notifyEvent.emit('Successfully changed password.');
        
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
