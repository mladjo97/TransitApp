import { Observable } from 'rxjs';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { PORT } from 'src/environments/app_config';

@Injectable()
export class StationsService {
    private apiAddress: string = `http://localhost:${PORT}/api/Stations`;

    constructor(private http: Http) { }

    getCount(): Observable<any> {
        return this.http.get(`${this.apiAddress}/Count`);
    }

    getAll(): Observable<any> {
        return this.http.get(this.apiAddress);
    }

    getById(id: number): Observable<any> {
        return this.http.get(`${this.apiAddress}/${id}`);
    }

    postStation(data: {}): Observable<any> {
        const headers = new Headers()
        headers.append('Content-type','application/json');
        headers.append('Authorization','Bearer ' + JSON.parse(localStorage.getItem("token")).token);
        headers.append('Accept', 'application/json');

        return this.http.post(this.apiAddress, data, {headers: headers});
    }

    editStation(id: number, data: {}) {
        const headers = new Headers()
        headers.append('Content-type','application/json');
        headers.append('Authorization','Bearer ' + JSON.parse(localStorage.getItem("token")).token);
        headers.append('Accept', 'application/json');

        return this.http.put(`${this.apiAddress}/${id}`, data, {headers: headers});
    }

    deleteStation(id: number): Observable<any> {
        const headers = new Headers()
        headers.append('Content-type','application/json');
        headers.append('Authorization','Bearer ' + JSON.parse(localStorage.getItem("token")).token);
        headers.append('Accept', 'application/json');

        return this.http.delete(`${this.apiAddress}/${id}`, {headers: headers});
    }

}