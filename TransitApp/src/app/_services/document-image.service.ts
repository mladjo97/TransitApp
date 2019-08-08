import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { API_ADDRESS } from 'src/environments/app_config';


@Injectable()
export class DocumentImageService {
    private documentImageApiAddress: string = `${API_ADDRESS}/DocumentImages`;

    constructor(private http: Http) { }

    getAllImages(): Observable<any> {        
        const headers = new Headers();       
        headers.append('Accept', 'application/json');
        headers.append('Authorization','Bearer ' + JSON.parse(localStorage.getItem("token")).token);

        const options = new RequestOptions({ headers: headers });
        return this.http.get(`${this.documentImageApiAddress}/all`, options);
    }

    getImage(): Observable<any> {
        const headers = new Headers();       
        headers.append('Accept', 'application/json');
        headers.append('Authorization','Bearer ' + JSON.parse(localStorage.getItem("token")).token);

        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.documentImageApiAddress, options);
    }

    verifyImage(userId: string): Observable<any> {
        const headers = new Headers();       
        headers.append('Content-type','application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization','Bearer ' + JSON.parse(localStorage.getItem("token")).token);

        const options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.documentImageApiAddress}/Verify?userId=${userId}`, {}, options);
    }

    rejectImage(userId: string): Observable<any> {
        const headers = new Headers();       
        headers.append('Content-type','application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization','Bearer ' + JSON.parse(localStorage.getItem("token")).token);

        const options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.documentImageApiAddress}/Reject?userId=${userId}`, {}, options);
    }

    postImage(documentImage: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('image', documentImage, documentImage.name);

        const headers = new Headers();
        headers.append('enctype', 'multipart/form-data');       
        headers.append('Accept', 'application/json');
        headers.append('Authorization','Bearer ' + JSON.parse(localStorage.getItem("token")).token);

        const options = new RequestOptions({ headers: headers });

        return this.http.post(this.documentImageApiAddress, formData, options);
    }

    putImage(documentImage: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('image', documentImage, documentImage.name);

        const headers = new Headers();
        headers.append('enctype', 'multipart/form-data');       
        headers.append('Accept', 'application/json');
        headers.append('Authorization','Bearer ' + JSON.parse(localStorage.getItem("token")).token);

        const options = new RequestOptions({ headers: headers });

        return this.http.put(this.documentImageApiAddress, formData, options);
    }

    deleteImage(): Observable<any> { 
        const headers = new Headers();
        headers.append('enctype', 'multipart/form-data');       
        headers.append('Accept', 'application/json');
        headers.append('Authorization','Bearer ' + JSON.parse(localStorage.getItem("token")).token);

        const options = new RequestOptions({ headers: headers });

        return this.http.delete(this.documentImageApiAddress, options);
    }



}