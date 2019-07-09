import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-ticket-plans',
  templateUrl: './ticket-plans.component.html',
  styleUrls: ['./ticket-plans.component.css']
})
export class TicketPlansComponent implements OnInit {

  isUnregistered: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isUnregistered = !this.authService.isLoggedIn();
  }

}
