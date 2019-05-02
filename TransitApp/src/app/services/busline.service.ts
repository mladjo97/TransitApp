import { Observable } from 'rxjs';
import { Http } from '@angular/http';
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

}