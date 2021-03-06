import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserType } from 'src/app/_models/user-type.model';
import { TicketType } from 'src/app/_models/ticket-type.model';
import { PriceList } from 'src/app/_models/pricelist.model';
import { PriceListItem } from 'src/app/_models/pricelist-item.model';
import { FormControl, FormGroup } from '@angular/forms';
import { PriceListService } from 'src/app/_services/pricelist.service';
import { TicketService } from 'src/app/_services/ticket.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';


// js files for date 
declare var getStartRange: any;
declare var getEndRange: any;
declare var initDateRange: any;
declare var setRangeDates: any;


@Component({
  selector: 'app-edit-pricelist',
  templateUrl: './edit-pricelist.component.html',
  styleUrls: ['./edit-pricelist.component.css']
})
export class EditPricelistComponent implements OnInit, OnDestroy {
  idSubscription: Subscription;
  id: number;

  submitted: boolean;
  priceListHasItems: boolean;
  userTypes: any[];
  ticketTypes: any[];

  priceList: PriceList;
  priceListItems: PriceListItem[];

  priceListForm = new FormGroup({
    ticketTypeId: new FormControl(null),
    userTypeId: new FormControl(null),
    basePrice: new FormControl(null),
    discount: new FormControl(null),
    rowVersion: new FormControl(null)
  });

  constructor(private ticketService: TicketService,
              private priceListService: PriceListService,
              private notificationService: NotificationService,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.idSubscription = this.route.params.subscribe( 
      (params: Params) => {
          this.id = params['id'];     
          this.updateForm();
      } );

    this.priceList = new PriceList();
    this.priceListItems = [];
    this.submitted = false;
    this.priceListHasItems = false;
    initDateRange();

    this.loadData();
  }

  ngOnDestroy() {
    this.idSubscription.unsubscribe();
  }

  updateForm(): void {

    this.priceListItems = [];

    // get pricelist by id
    this.priceListService.getPriceList(this.id).subscribe(

      (response) => {
        this.priceList = response.json();
        console.log(this.priceList);

        this.priceListItems = this.priceList.priceListItems;
        this.priceListForm.patchValue({ rowVersion: this.priceList.rowVersion });

        const startDate = this.formatDate(new Date(this.priceList.validFrom));
        const endDate = this.formatDate(new Date(this.priceList.validUntil));        
        setRangeDates(startDate, endDate);

        if(this.priceListItems.length > 0) {
          this.priceListHasItems = true;
        }

      },

      (error) => {
        console.log(error);
      }

    );
  }

  formatDate(date: Date): string {
    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
  }

  loadData(): void {
    // get all ticket types 
    this.ticketService.getTicketTypes().subscribe(
      (response) => {
        this.ticketTypes = response.json();

        if (this.ticketTypes.length > 0) {
          this.priceListForm.patchValue({ ticketTypeId: this.ticketTypes[0]._id });
        }
      },
      (error) => {
        console.log(error);
      }
    );

    // get all user types
    this.ticketService.getUserTypes().subscribe(
      (response) => {
        this.userTypes = response.json();
        if (this.userTypes.length > 0) {
          this.priceListForm.patchValue({ userTypeId: this.userTypes[0]._id });
        }
      },
      (error) => {
        console.log(error);
      }
    );

  }

  onAddPriceListItem(event) {
    event.preventDefault();
    this.validatePriceListItem();

    const priceListItem = new PriceListItem(this.priceListForm.value.basePrice,
                                            this.priceListForm.value.ticketTypeId,
                                            this.priceListForm.value.userTypeId,
                                            this.priceListForm.value.discount/100);

    priceListItem.userTypeName = this.userTypes.find(item => item._id == priceListItem.userTypeId).name;
    priceListItem.ticketTypeName = this.ticketTypes.find(item => item._id == priceListItem.ticketTypeId).name;

    const foundItem = this.priceListItems.find(item => {
        return item.ticketTypeId == priceListItem.ticketTypeId && item.userTypeId == priceListItem.userTypeId;
    });

    if(foundItem === undefined){
      this.priceListItems.push(priceListItem);
    }

    if (this.priceListItems.length > 0) {
      this.priceListHasItems = true;
    }
  }

  onRemovePriceListItem(event): void {
    this.priceListItems.splice(event, 1);
    
    if(this.priceListItems.length < 0) {
      this.priceListHasItems = false;
    }
  }

  validatePriceListItem(): void {
    if (this.priceListForm.value.basePrice < 0) {
      this.priceListForm.patchValue({ basePrice: 0 });
    }

    if (this.priceListForm.value.discount > 100) {
      this.priceListForm.patchValue({ discount: 100 });
    }

    if (this.priceListForm.value.discount < 0) {
      this.priceListForm.patchValue({ discount: 0 });
    }
  }

  onSubmit(): void {

    this.priceList.validFrom = getStartRange();
    this.priceList.validUntil = getEndRange();
    this.priceList.priceListItems = [...this.priceListItems];
    console.log(this.priceList);

    // if(this.priceList.priceListItems.length < 12){
    //   this.notificationService.notifyEvent.emit('You need to have 12 items on your price list. One for every customer and ticket type.');
    //   return;
    // }

    this.priceListService.putPriceList(this.priceList).subscribe(
      (response) => {
        this.notificationService.notifyEvent.emit('Successfully edited the pricelist.');
      },
      (error) => {
        switch(error.status) {
          case 409:
            this.notificationService.notifyEvent.emit('There is already a pricelist with the selected date or someone edited it before you.');
            break;
          default:
            break;
        }
      }
    );

  }

}
