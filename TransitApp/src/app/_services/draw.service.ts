import { EventEmitter } from '@angular/core';


export class DrawService {
    drawEvent: EventEmitter<any> = new EventEmitter<any>();
    locationEvent: EventEmitter<any> = new EventEmitter<any>();
    
    constructor() { }

}