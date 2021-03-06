import { User } from '../_models/user.model';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http'
import { API_ADDRESS } from 'src/environments/app_config';
import { Observable } from 'rxjs';

@Injectable()
export class RegisterService {
    private apiAddress: string = `${API_ADDRESS}/users`;

    constructor(private http: Http) { }

    registerUser(user: User, documentImage: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('user', JSON.stringify(user));
        if(documentImage !== null)
            formData.append('image', documentImage, documentImage.name);

        const headers = new Headers();
        headers.append('enctype', 'multipart/form-data');       
        headers.append('Accept', 'application/json');

        const options = new RequestOptions({ headers: headers });

        return this.http.post(this.apiAddress, formData, options);
    }

    registerTicketInspector(user: User): Observable<any> {
        const headers = new Headers()
        headers.append('Content-type','application/json');
        headers.append('Authorization','Bearer ' + JSON.parse(localStorage.getItem("token")).token);
        headers.append('Accept', 'application/json');
        
        return this.http.post(`${this.apiAddress}/ticketInspector`, user, {headers: headers});
    }

}