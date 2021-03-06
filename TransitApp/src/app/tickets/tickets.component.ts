import { Component, OnInit } from '@angular/core';
import { PriceListService } from '../_services/pricelist.service';
import { Ticket } from '../_models/ticket.model';
import { TicketService } from '../_services/ticket.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    
    }

}
