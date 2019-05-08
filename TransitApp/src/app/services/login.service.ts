import {Http, Headers} from '@angular/http'
import { Injectable } from  '@angular/core'
import { Observable } from 'rxjs';

@Injectable()
export class LoginService
{
    private apiAddress: string = 'http://localhost:53162/Token';

    constructor(private http: Http) { }

    logIn(email: string, password: string): Observable<any>
    {
        const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'});
        const query = `username=${email}&password=${password}&grant_type=password`;

        return this.http.post(this.apiAddress, query, { headers: headers });
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