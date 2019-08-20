import { Observable } from 'rxjs';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { API_ADDRESS } from 'src/environments/app_config';

@Injectable()
export class PriceListService {
    private apiAddress: string = `${API_ADDRESS}/PriceLists`;

    constructor(private http: Http) { }

    getPriceList(id): Observable<any> {
        const headers = new Headers();       
        headers.append('Content-type','application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization','Bearer ' + JSON.parse(localStorage.getItem("token")).token);

        const options = new RequestOptions({ headers: headers });
        return this.http.get(`${this.apiAddress}/${id}`, options);
    }

    getActivePriceList(): Observable<any> {
        return this.http.get(`${this.apiAddress}/Active`);
    }
    
    getAllPriceLists(): Observable<any> {
        const headers = new Headers();       
        headers.append('Content-type','application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization','Bearer ' + JSON.parse(localStorage.getItem("token")).token);

        const options = new RequestOptions({ headers: headers });
        return this.http.get(`${this.apiAddress}/All`, options);
    }

    getPriceForTicketType(id): Observable<any> {
        const headers = new Headers();       
        headers.append('Content-type','application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization','Bearer ' + JSON.parse(localStorage.getItem("token")).token);
        
        const options = new RequestOptions({ headers: headers });
        return this.http.get(`${this.apiAddress}/prices/${id}`, options);
    }

    getRegularPriceForTicketType(id): Observable<any> {
        return this.http.get(`${this.apiAddress}/prices/regular/${id}`);
    }

    postPriceList(priceList: any): Observable<any> {
        const headers = new Headers();       
        headers.append('Content-type','application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization','Bearer ' + JSON.parse(localStorage.getItem("token")).token);

        const options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.apiAddress}`, priceList, options);
    }

    putPriceList(priceList: any): Observable<any> {
        const headers = new Headers();       
        headers.append('Content-type','application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization','Bearer ' + JSON.parse(localStorage.getItem("token")).token);

        const options = new RequestOptions({ headers: headers });
        return this.http.put(`${this.apiAddress}/${priceList._id}`, priceList, options);
    }

    deletePriceList(priceListId): Observable<any> {
        const headers = new Headers();       
        headers.append('Content-type','application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization','Bearer ' + JSON.parse(localStorage.getItem("token")).token);

        const options = new RequestOptions({ headers: headers });
        return this.http.delete(`${this.apiAddress}/${priceListId}`, options);
    }


}