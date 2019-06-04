import { Component, OnInit, Input } from '@angular/core';
import { TicketService } from 'src/app/_services/ticket.service';
import { PriceListService } from 'src/app/_services/pricelist.service';
import { Price } from 'src/app/_models/price.model';
import { NotificationService } from 'src/app/_services/notification.service';
import { AuthService } from 'src/app/_services/auth.service';

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
              private ticketService: TicketService,
              private notificationService: NotificationService,
              private authService: AuthService) { }

  ngOnInit() {  
    this.loaded = false;
    this.hasItems = false;

    if(this.authService.isLoggedIn()){
      this.loadData();
    }
  }
  
  loadData(): void {
    // Load ticket prices for user
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
        this.notificationService.notifyEvent.emit('Successfully bought ticket.');
      },
      (error) => {
        switch(error.status){
          case 409:
            this.notificationService.notifyEvent.emit('You already have a valid ticket for that ride type.');
            break;
          case 401:
            this.notificationService.notifyEvent.emit('You cannot buy tickets, your profile is not verified.');
            break;
        }
      }
    );
  }

}
