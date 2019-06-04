import { Observable } from 'rxjs';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { API_ADDRESS } from 'src/environments/app_config';

@Injectable()
export class PriceListService {
    private apiAddress: string = `${API_ADDRESS}/PriceLists`;

    constructor(private http: Http) { }

    getActivePriceList(): Observable<any> {
        return this.http.get(this.apiAddress);
    }

    getPriceForTicketType(id: number): Observable<any> {
        const headers = new Headers();       
        headers.append('Content-type','application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization','Bearer ' + JSON.parse(localStorage.getItem("token")).token);

        const options = new RequestOptions({ headers: headers });
        return this.http.get(`${this.apiAddress}?ticketTypeId=${id}`, options);
    }

    postPriceList(priceList: any): Observable<any> {
        const headers = new Headers();       
        headers.append('Content-type','application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization','Bearer ' + JSON.parse(localStorage.getItem("token")).token);

        const options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.apiAddress}`, priceList,options);
    }


}