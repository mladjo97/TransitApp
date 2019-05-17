export class Station {
    Name: string;
    Address: string;
    Lat: number;
    Lon: number;
    
    constructor(name: string, address: string, lat: number, lon: number){
        this.Name = name;
        this.Address = address;
        this.Lat = lat;
        this.Lon = lon;
    }
}