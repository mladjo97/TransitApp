export class AuthData {
    
    public token: string;
    public role: string;
    public id: string;

    constructor(token:string, role: string, id: string) {
        this.token = token;
        this.role = role;
        this.id = id;
     }
}