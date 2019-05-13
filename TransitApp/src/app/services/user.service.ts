import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';


@Injectable()
export class UserService {
    private apiAccountAddress: string = 'http://localhost:53162/api/Account';

    constructor(private http: Http) {}

    getUserInfo(): Observable<any> {
        const headers = new Headers()
        headers.append('Content-type','application/json');
        headers.append('Authorization','Bearer ' + JSON.parse(localStorage.getItem("token")).token);
        headers.append('Accept', 'application/json');

        return this.http.get(`${this.apiAccountAddress}/UserInfo`, {headers: headers});
    }

    changeUserInfo(user: {}): Observable<any> {
        const headers = new Headers()
        headers.append('Content-type','application/json');
        headers.append('Authorization','Bearer ' + JSON.parse(localStorage.getItem("token")).token);
        headers.append('Accept', 'application/json');

        return this.http.put(`${this.apiAccountAddress}`, user, {headers: headers});
    }

    changeUserPassword(changePasswordBinding: {}): Observable<any> {
        const headers = new Headers()
        headers.append('Content-type','application/json');
        headers.append('Authorization','Bearer ' + JSON.parse(localStorage.getItem("token")).token);
        headers.append('Accept', 'application/json');

        return this.http.post(`${this.apiAccountAddress}/ChangePassword`, changePasswordBinding, {headers: headers});
    }

}