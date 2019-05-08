import { Response, Http, Headers } from '@angular/http'
import { AuthData } from '../models/auth-data.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService{
    private logOutAddress: string = 'http://localhost:53162/api/Account/Logout';

    constructor(private http: Http) { }

    logIn(response: Response) : void {

        let responseJson = response.json();
        let accessToken = responseJson['access_token'];
        let role = response.headers.get('Role');        
        let id = response.headers.get('UserId');

        let authdata = new AuthData(accessToken, role, id);
        localStorage.setItem('token', JSON.stringify(authdata));
    }

    logOut(): Observable<any> {       
        if(this.isLoggedIn() === true) {
            let token = localStorage.getItem("token");

            let headers = new Headers();
            headers.append('Content-type', 'application/x-www-form-urlencoded');
            headers.append('Authorization', 'Bearer ' + JSON.parse(token).token);

            localStorage.removeItem('token');

            return this.http.post(this.logOutAddress, "", { headers: headers });
        }
    }

    isLoggedIn(): boolean {
        if(!localStorage.getItem('token'))
            return false;
        else
            return true;
    }

    isAdmin(): boolean {
        if(!this.isLoggedIn()) {
            return false;
        }

        let token = localStorage.getItem('token');
        let role = JSON.parse(token).role;

        if (role=="Admin") {
            return true;
        } else {
            return false;
        }
    }

    isUser(): boolean {
        if(!this.isLoggedIn()) {
            return false;
        }

        let token = localStorage.getItem('token');
        let role = JSON.parse(token).role;

        if (role=="User") {
            return true;
        } else {
            return false;
        }
    }
    
}