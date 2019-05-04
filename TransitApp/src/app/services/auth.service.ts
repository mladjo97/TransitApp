import { Response } from '@angular/http'
import { AuthData } from '../models/auth-data.model';

export class AuthService{
    
    constructor() { }

    logIn(response: Response) : void {

        let responseJson = response.json();
        let accessToken = responseJson['access_token'];
        let role = response.headers.get('Role');        
        let id = response.headers.get('UserId');

        let authdata = new AuthData(accessToken, role, id);
        localStorage.setItem('token', JSON.stringify(authdata));
    }

    logOut(): void {
        if(this.isLoggedIn() === true) {
            localStorage.removeItem('token');
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