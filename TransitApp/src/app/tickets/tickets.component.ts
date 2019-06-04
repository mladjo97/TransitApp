import { Component, OnInit } from '@angular/core';
import { PriceListService } from '../_services/pricelist.service';
import { Ticket } from '../_models/ticket.model';
import { TicketService } from '../_services/ticket.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  private tickets: Ticket[];

  constructor(private ticketService: TicketService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    // Get user tickets
    this.ticketService.getUserTickets().subscribe(
      (response) => {
        this.tickets = response.json();
        console.log(this.tickets);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
