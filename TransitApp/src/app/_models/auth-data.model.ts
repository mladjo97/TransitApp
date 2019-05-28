export class AuthData {
    
    token: string;
    role: string;
    id: string;

    constructor(token:string, role: string, id: string) {
        this.token = token;
        this.role = role;
        this.id = id;
     }
}