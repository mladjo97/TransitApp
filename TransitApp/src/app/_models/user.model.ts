export class User {

    firstName: string;
    lastName: string;
    email: string;
    gender: number;
    password: string;
    confirmPassword: string;
    address: string;
    dateOfBirth: Date;
    userTypeId: number;

    constructor(firstName?: string, lastName?: string, email?: string, gender?: number, 
                password?: string, confirmPassword?: string, address?: string, dob?: Date, userTypeId?: number) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.gender = gender;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.address = address;
        this.dateOfBirth = dob;
        this.userTypeId = userTypeId;
    }
}