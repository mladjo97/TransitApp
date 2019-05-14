import { Observable } from 'rxjs';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BusLineService {
    private apiAddress: string = 'http://localhost:53162/api/BusLines';

    constructor(private http: Http) { }

    getAll(): Observable<any> {
        return this.http.get(this.apiAddress);
    }

    getById(id: number): Observable<any> {
        return this.http.get(`${this.apiAddress}/${id}`);
    }

    getAllBusLineTypes(): Observable<any> {
        return this.http.get('http://localhost:53162/api/BusLineTypes');
    }

    postBusLine(data: {}): Observable<any> {
        const headers = new Headers()
        headers.append('Content-type','application/json');
        headers.append('Authorization','Bearer ' + JSON.parse(localStorage.getItem("token")).token);
        headers.append('Accept', 'application/json');

        return this.http.post(this.apiAddress, data, {headers: headers});
    }

    editBusLine(id: number, data: {}) {
        const headers = new Headers()
        headers.append('Content-type','application/json');
        headers.append('Authorization','Bearer ' + JSON.parse(localStorage.getItem("token")).token);
        headers.append('Accept', 'application/json');

        return this.http.put(`${this.apiAddress}/${id}`, data, {headers: headers});
    }

    deleteBusLine(id: number): Observable<any> {
        const headers = new Headers()
        headers.append('Content-type','application/json');
        headers.append('Authorization','Bearer ' + JSON.parse(localStorage.getItem("token")).token);
        headers.append('Accept', 'application/json');

        return this.http.delete(`${this.apiAddress}/${id}`, {headers: headers});
    }

    filterBusLines(busLineTypeId: number): Observable<any> {
        return this.http.get(`${this.apiAddress}?busLineTypeId=${busLineTypeId}`);
    }
}