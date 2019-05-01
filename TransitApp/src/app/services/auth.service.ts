import { Response } from '@angular/http'
import { AuthData } from '../models/auth-data.model';

export class AuthService{
    
    constructor() { }

    logIn(response: Response) : void {

        let responseJson = response.json();
        let accessToken = responseJson['access_token'];
        let role = response.headers.get('Role');        
        let id = response.headers.get('Id');

        let authdata = new AuthData(accessToken, role, id);

        console.log(responseJson);
        console.log('role: ' + role);
        console.log(authdata);

        localStorage.setItem('token', JSON.stringify(authdata));
        console.log('Set to local storage');
        console.log(localStorage.getItem('token'));
    }

    logOut(): void {
        if(this.isLoggedIn() === true) {
            localStorage.removeItem('token');
        }
    }

    isLoggedIn(): boolean{
        if(!localStorage.getItem('token'))
            return false;
        else
            return true;
    }

    isAdmin(): boolean {
        let token = localStorage.getItem('token');
        let role = JSON.parse(token).role;

        if (role=="Admin") {
            return true;
        } else {
            return false;
        }
    }

     isManager(): boolean {
        let token = localStorage.getItem('token');
        let role = JSON.parse(token).role;

        if (role=="Manager") {
            return true;
        } else {
            return false;
        }
    }

    isUser(): boolean {
        let token = localStorage.getItem('token');
        let role = JSON.parse(token).role;

        if (role=="User") {
            return true;
        } else {
            return false;
        }
    }
    
}