import { EventEmitter } from '@angular/core';


export class NotificationService {
    notifyEvent: EventEmitter<string> = new EventEmitter<string>();

    constructor() { }

}