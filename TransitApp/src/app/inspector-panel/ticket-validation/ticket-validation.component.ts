import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TicketService } from 'src/app/_services/ticket.service';
import { Ticket } from 'src/app/_models/ticket.model';

@Component({
  selector: 'app-ticket-validation',
  templateUrl: './ticket-validation.component.html',
  styleUrls: ['./ticket-validation.component.css']
})
export class TicketValidationComponent implements OnInit {
  submitted: boolean;
  validated: boolean;
  error: boolean;
  hasUser: boolean;

  ticketForm = new FormGroup({
    ticketId: new FormControl(null)    
  });

  ticketInfo: Ticket;

  constructor(private ticketService: TicketService) { }

  ngOnInit() {
    this.submitted = false;
    this.validated = false;
    this.hasUser = false;
  }

  onSubmit() {
    this.submitted = true;
    console.log('validating ticked id: ', this.ticketForm.value.ticketId);
    this.ticketService.validateTicket(this.ticketForm.value.ticketId).subscribe(
      (response) => {
        console.log(response.json());
        this.ticketInfo = response.json();
        this.validated = true;
        this.submitted = false;
        this.error = false;

        if(this.ticketInfo.userFirstName)
          this.hasUser = true;
          
      },
      (error) => {
        console.log(error);
        this.validated = true;
        this.submitted = false;
        this.error = true;
      }
    );

  }

}
