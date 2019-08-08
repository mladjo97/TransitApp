import { Response, Http, Headers } from '@angular/http'
import { AuthData } from '../_models/auth-data.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { API_ADDRESS } from 'src/environments/app_config'

@Injectable()
export class AuthService{
    private logOutAddress: string = `${API_ADDRESS}/users/logout`;

    constructor(private http: Http) { }

    logIn(response: Response) : void {
        let responseJson = response.json();
        let accessToken = responseJson.access_token;
        let role = responseJson.role;
        let id = responseJson.userId;
        
        let authdata = new AuthData(accessToken, role, id);
        localStorage.setItem('token', JSON.stringify(authdata));
        console.log(authdata);
    }

    logOut(): Boolean {       
        if(this.isLoggedIn() === true) {
            localStorage.removeItem('token');
            return true;    // nema Account/Logout 
        }
    }

    getId(): string {
        if(this.isLoggedIn()){
            const token = localStorage.getItem('token');
            const id = JSON.parse(token).id;
            return id;
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

    isTicketInspector(): boolean {
        if(!this.isLoggedIn()) {
            return false;
        }

        let token = localStorage.getItem('token');
        let role = JSON.parse(token).role;

        if (role=="TicketInspector") {
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