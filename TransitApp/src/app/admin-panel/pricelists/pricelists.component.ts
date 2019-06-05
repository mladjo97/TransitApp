import { Component, OnInit } from '@angular/core';
import { PriceListService } from 'src/app/_services/pricelist.service';
import { PriceList } from 'src/app/_models/pricelist.model';
import { PriceListItem } from 'src/app/_models/pricelist-item.model';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-pricelists',
  templateUrl: './pricelists.component.html',
  styleUrls: ['./pricelists.component.css']
})
export class PricelistsComponent implements OnInit {

  priceLists: PriceList[];
  selectedPriceList: PriceList;
  priceListItems: PriceListItem[];

  constructor(private priceListService: PriceListService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.loadData();
  }

  onClick(id: number) {
    this.selectedPriceList = this.priceLists.find(item => item.Id === id);
    this.priceListItems = this.selectedPriceList.PriceListItems;
  }

  onDelete(id) {
    this.priceListItems = [];
    this.priceListService.deletePriceList(id).subscribe(
      (response) => {
        this.notificationService.notifyEvent.emit('Successfully deleted pricelist.');
      },
      (error) => {
        this.notificationService.notifyEvent.emit('An error occured while trying to delete pricelist. Please, try again.');
      }
    );
  }

  loadData(): void {
    // get all pricelists
    this.priceListService.getAllPriceLists().subscribe(
      (response) => {
        this.priceLists = response.json();
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
