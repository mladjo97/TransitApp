import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../models/user.model';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private genders = ['Male', 'Female'];
  private user: User;

  constructor(private registerService: RegisterService) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    this.user = new User(f.value.firstName, f.value.lastName, f.value.email, f.value.gender, f.value.password, f.value.confirmPassword);
    this.registerService.registerUser(this.user).subscribe( 
      (response) => console.log(response)
      );
  }

}
