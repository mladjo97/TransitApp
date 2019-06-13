import { Observable } from 'rxjs';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { API_ADDRESS } from 'src/environments/app_config';

@Injectable()
export class TicketService {
    private apiAddress: string = `${API_ADDRESS}/Tickets`;
    private apiTicketTypesAddress: string = `${API_ADDRESS}/TicketTypes`;
    private apiUserTypesAddress: string = `${API_ADDRESS}/UserTypes`;

    constructor(private http: Http) { }

    getTicketTypes(): Observable<any> {
        return this.http.get(`${this.apiTicketTypesAddress}`);
    }

    getUserTypes(): Observable<any> {
        return this.http.get(`${this.apiUserTypesAddress}`);
    }

    getTicketTypeId(name: string): Observable<any> {
        return this.http.get(`${this.apiTicketTypesAddress}?name=${name}`);
    }

    getUserTickets(): Observable<any> {
        const headers = new Headers();
        headers.append('Content-type','application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization','Bearer ' + JSON.parse(localStorage.getItem("token")).token);

        const options = new RequestOptions({ headers: headers });
        return this.http.get(`${this.apiAddress}`, options);
    }

    getTicket(ticketId: number): Observable<any> {
        const headers = new Headers();
        headers.append('Content-type','application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization','Bearer ' + JSON.parse(localStorage.getItem("token")).token);

        const options = new RequestOptions({ headers: headers });
        return this.http.get(`${this.apiAddress}?ticketId=${ticketId}`, options);
    }

    buyTicket(itemId: number): Observable<any> {
        const headers = new Headers();
        headers.append('Content-type','application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization','Bearer ' + JSON.parse(localStorage.getItem("token")).token);

        const options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.apiAddress}/Buy`, {itemId: itemId}, options);
    }

    buyUnregistered(email: string): Observable<any> {
        return this.http.post(`${this.apiAddress}/BuyUnregistered`, {email: email});
    }

    validateTicket(ticketId: number): Observable<any> {
        const headers = new Headers();
        headers.append('Content-type','application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization','Bearer ' + JSON.parse(localStorage.getItem("token")).token);

        const options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.apiAddress}/Validate?ticketId=${ticketId}`, {}, options);
    }

}