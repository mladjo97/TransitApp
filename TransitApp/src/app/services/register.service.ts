import { User } from '../models/user.model';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http'

@Injectable()
export class RegisterService {
    private apiAddress: string = 'http://localhost:53162/api/Account/Register';

    constructor(private http: Http) { }

    registerUser(user: User) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.apiAddress, user, {headers: headers});
    }

}