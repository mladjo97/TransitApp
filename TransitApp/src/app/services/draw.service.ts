import { EventEmitter } from '@angular/core';
import { BusLine } from '../models/busline.model';


export class DrawService {
    drawEvent: EventEmitter<BusLine> = new EventEmitter<BusLine>();

    constructor() { }

}