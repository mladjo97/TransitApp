import { Component, OnInit, Input } from '@angular/core';
import { TicketService } from 'src/app/_services/ticket.service';
import { PriceListService } from 'src/app/_services/pricelist.service';
import { Price } from 'src/app/_models/price.model';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { NotificationService } from 'src/app/_services/notification.service';

// javascript file to handle paypal interaction
import * as paypalJS from '../../_scripts/paypal.js';
declare var initPaypalButton: any;

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  @Input() name: string;
  @Input() dbName: string;
  @Input() description: string;
  @Input() isUnregistered: boolean;
  @Input() id: string;

  private ticketTypeId: number;
  private ticketPrice: Price;
  private loaded: boolean;
  private hasItems: boolean;

  constructor(private priceListService: PriceListService,
              private notificationService: NotificationService,
              private ticketService: TicketService,
              private usersService: UserService,
              private authService: AuthService) { }

  ngOnInit() {  
    this.loaded = false;
    this.hasItems = false;

    this.loadData();
  }
  
  loadData(): void {
    // Load ticket prices for user
    this.ticketService.getTicketTypeId(this.dbName).subscribe(
      (response) => { 
        console.log(response.json())
        this.ticketTypeId = response.json();
        if(this.authService.isUser())
          this.loadPrice();
        else if (this.isUnregistered) {
          this.loadRegularPrice();
        }
      },
      (error) => console.log(error)
    );    
  }

  loadPrice(): void {
    this.usersService.getUserInfo().subscribe(
      (response) => {
        if(response.json().verifiedDocumentImage) {
          this.priceListService.getPriceForTicketType(this.ticketTypeId).subscribe(
            (response) => {
              console.log(response.json());
              this.ticketPrice = response.json();        
              this.loaded = true;
              this.hasItems = true;
      
              initPaypalButton(true,
                                this.id,
                                this.ticketPrice.hasDiscount ? this.ticketPrice.discountPrice : this.ticketPrice.basePrice,
                                this.ticketPrice.itemId);
            },
            (error) => console.log(error)
          );
        } else {
          this.notificationService.notifyEvent.emit('Your account must be verified to buy tickets.');
        }
      },
      (error) => {
        return false;
      }
    );

  }

  loadRegularPrice(): void {
    this.priceListService.getRegularPriceForTicketType(this.ticketTypeId).subscribe(
      (response) => {
        this.ticketPrice = response.json();        
        this.loaded = true;
        this.hasItems = true;

        initPaypalButton(false,
                          this.id,
                          this.ticketPrice.hasDiscount ? this.ticketPrice.discountPrice : this.ticketPrice.basePrice,
                          this.ticketPrice.itemId);
      }
    );
  }
  
  shouldInitButton(): any {
    this.usersService.getUserInfo().subscribe(
      (response) => {
        console.log(response.json().verifiedDocumentImage);
        if(response.json().verifiedDocumentImage)
          return true;
        else
          return false;
      },
      (error) => {
        return false;
      }
    );
  }

  // beskorisna metoda sad sa paypal-om
  // onBuy() {

  //   if(this.authService.isLoggedIn() && this.authService.isUser()) {
  //     this.ticketService.buyTicket(this.ticketPrice.ItemId).subscribe(
  //       (response) => {
  //         this.notificationService.notifyEvent.emit('Successfully bought a ticket.');
  //       },
  //       (error) => {
  //         switch(error.status){
  //           case 409:
  //             this.notificationService.notifyEvent.emit('You already have a valid ticket for that ride type.');
  //             break;
  //           case 401:
  //             this.notificationService.notifyEvent.emit('You cannot buy tickets, your profile is not verified.');
  //             break;
  //         }
  //       }
  //     );
  //   }
  //   else if(this.isUnregistered) {
  //     // dodati input za email
  //     this.ticketService.buyUnregistered("mldnmilosevic@gmail.com").subscribe(
  //       (response) => {
  //         this.notificationService.notifyEvent.emit('Successfully bought a ticket.');
  //       },
  //       (error) => {
  //         this.notificationService.notifyEvent.emit('An error ocurred. Please try again.');
  //       }
  //       );
  //   }

  // }

}
