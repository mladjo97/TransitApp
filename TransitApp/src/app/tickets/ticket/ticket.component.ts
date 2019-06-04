import { Component, OnInit, Input } from '@angular/core';
import { TicketService } from 'src/app/_services/ticket.service';
import { PriceListService } from 'src/app/_services/pricelist.service';
import { Price } from 'src/app/_models/price.model';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  @Input() name: string;
  @Input() dbName: string;
  @Input() description: string;

  private ticketTypeId: number;
  private ticketPrice: Price;
  private loaded: boolean;
  private hasItems: boolean;

  constructor(private priceListService: PriceListService,
              private ticketService: TicketService) { }

  ngOnInit() {    
    this.loadData();
  }
  
  loadData(): void {
    this.loaded = false;
    this.hasItems = false;

    this.ticketService.getTicketTypeId(this.dbName).subscribe(
      (response) => { 
        this.ticketTypeId = response.json();
        this.loadPrice();
      },
      (error) => console.log(error)
    );    
  }

  loadPrice(): void {
    this.priceListService.getPriceForTicketType(this.ticketTypeId).subscribe(
      (response) => {
        this.ticketPrice = response.json();
        this.loaded = true;
        this.hasItems = true;
      },
      (error) => console.log(error)
    );
  }

  onBuy() {
    this.ticketService.buyTicket(this.ticketPrice.ItemId).subscribe(
      (response) => {
        console.log(response.json());
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
