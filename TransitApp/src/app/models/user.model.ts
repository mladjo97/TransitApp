export class User {
    firstName: string;
    lastName: string;
    email: string;
    gender: number;
    password: string;
    confirmPassword: string;

    constructor(firstName?: string, lastName?: string, email?: string, gender?: number, password?: string, confirmPassword?: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.gender = gender;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
}