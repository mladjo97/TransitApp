import {Http, Headers} from '@angular/http'
import { Injectable } from  '@angular/core'
import { Observable } from 'rxjs';
import { OAUTH_ADDRESS } from 'src/environments/app_config';

@Injectable()
export class LoginService
{
    private apiAddress: string = OAUTH_ADDRESS;

    constructor(private http: Http) { }

    logIn(email: string, password: string): Observable<any>
    {    
        const headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'});

        // @TODO: Ovo je drugacije na web api 
        return this.http.post(this.apiAddress, { email: email, password: password }, { headers: headers });
    }

    logOut(): void{
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
    }

    isLoggedIn(): boolean{
        if(localStorage.getItem("token") !== null)
            return true;
        else
            return false;
    }
}