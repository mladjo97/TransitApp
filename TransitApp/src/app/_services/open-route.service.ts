import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable()
export class OpenRouteService {
    private apiKey: string = '5b3ce3597851110001cf6248edec42468e2d4638b315cfa63438cb40';

    constructor(private http: Http) { }

    getRoutes(start_lon, start_lat, end_lon, end_lat): Observable<any> {
        return this.http.get(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=${this.apiKey}&start=${start_lon},${start_lat}&end=${end_lon},${end_lat}`);
    }

}