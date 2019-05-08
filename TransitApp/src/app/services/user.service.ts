import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';


@Injectable()
export class UserService {
    private userInfoAddress: string = 'http://localhost:53162/api/Account/UserInfo';

    constructor(private http: Http) {}

    getUserInfo(): Observable<any> {
        const headers = new Headers()
        headers.append('Content-type','application/json');
        headers.append('Authorization','Bearer ' + JSON.parse(localStorage.getItem("token")).token);
        headers.append('Accept', 'application/json');

        return this.http.get(this.userInfoAddress, {headers: headers});
    }

}