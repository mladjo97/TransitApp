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

    if(f.value.confirmPassword !== f.value.newPassword){
      this.notificationService.notifyEvent.emit('Your confirmation password and new password do not match');
      return;
    }
    
    const changePasswordBindingModel = {
      oldPassword: f.value.oldPassword,
      newPassword: f.value.newPassword
    };

    this.userService.changeUserPassword(changePasswordBindingModel).subscribe(
      (response) => {
        this.submitted = false;
        this.notificationService.notifyEvent.emit('Successfully changed password.');        
      },

      (error) => {
        this.submitted = false;

        this.notificationService.notifyEvent.emit('Invalid input.');        
      }
    );
  }

}
