import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as socketIo from 'socket.io-client';

const SERVER_URL = 'http://localhost:2525/';

@Injectable()
export class SocketService {
    private socket;

    public initSocket(): void {
        this.socket = socketIo(SERVER_URL);
    }

    public subToLocationUpdate(groupName): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on(`${groupName}`, (data: any) => observer.next(data));
        });
    }
}