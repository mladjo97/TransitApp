import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { API_ADDRESS } from 'src/environments/app_config';


@Injectable()
export class UserService {
    private apiAccountAddress: string = `${API_ADDRESS}/Account`;

    constructor(private http: Http) {}

    getCount(): Observable<any> {
        return this.http.get(`${this.apiAccountAddress}/Count`);
    }

    getUserTypes(): Observable<any> {
        return this.http.get(`${API_ADDRESS}/UserTypes`);
    }

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