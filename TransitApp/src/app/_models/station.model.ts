export class Station {
    Id: number;
    Name: string;
    Address: string;
    Lat: number;
    Lon: number;
    RowVersion: any;
    
    constructor(id: number, name: string, address: string, lat: number, lon: number){
        this.Id = id;
        this.Name = name;
        this.Address = address;
        this.Lat = lat;
        this.Lon = lon;
    }
}