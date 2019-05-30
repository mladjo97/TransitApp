import { EventEmitter } from '@angular/core';


export class NotificationService {
    notifyEvent: EventEmitter<string> = new EventEmitter<string>();
    sessionEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
    userEditedEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() { }

}