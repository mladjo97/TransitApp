import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pricelist-item',
  templateUrl: './pricelist-item.component.html',
  styleUrls: ['./pricelist-item.component.css']
})
export class PricelistItemComponent implements OnInit {

  @Input() index: number;
  @Input() basePrice: number;
  @Input() discount: number;
  @Input() ticketTypeName: string;
  @Input() userTypeName: string;
  @Input() removeEnabled: boolean;
  @Output() removed = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    if(this.discount < 1){
      this.discount = this.discount * 100;
    }
  }

  onRemove(index: number): void { 
    if(this.removeEnabled){
      this.removed.emit(index);
    }
  }

}
