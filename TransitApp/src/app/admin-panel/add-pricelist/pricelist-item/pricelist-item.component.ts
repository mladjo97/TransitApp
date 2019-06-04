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
  @Output() removed = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onRemove(index: number): void {    
    this.removed.emit(index);
  }

}
