export class Station {
    name: string;
    address: string;
    lat: number;
    lon: number;
    
    constructor(name: string, address: string, lat: number, lon: number){
        this.name = name;
        this.address = address;
        this.lat = lat;
        this.lon = lon;
    }
}