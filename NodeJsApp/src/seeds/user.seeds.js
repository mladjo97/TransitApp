import moment from 'moment';
import config from '@config';

import User from '@models/user';
import Role from '@models/role';
import UserType from '@models/userType';

import usersJSON from './users.json';


const seedUsers = async () => {
    const users = [];

    /*
    *   User needs foreign key (ObjectId) relations
    */
    const regularUserType = await UserType.findOne({ name: 'Regular' }, (err, doc) => {
        if (err) return;
        return doc;
    });

    const adminRole = await Role.findOne({ name: 'Admin' }, (err, doc) => {
        if (err) return;
        return doc;
    });

    const ticketInspectorRole = await Role.findOne({ name: 'TicketInspector' }, (err, doc) => {
        if (err) return;
        return doc;
    });

    const userRole = await Role.findOne({ name: 'User' }, (err, doc) => {
        if (err) return;
        return doc;
    });

    /*
     *  Loading users 
    */
    usersJSON.map((user) => {
        // NOTE: roles must be inserted first
        let roleId = user.username === 'mladjo' ?
            adminRole._id :
            userRole._id;

        roleId = user.username === 'ticketInspector' ?
            ticketInspectorRole._id :
            userRole._id;

        const seedUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            passwordHash: user.password,
            role: roleId,
            address: user.address,
            dateOfBirth: moment.utc(user.dateOfBirth, config.dateFormat),
            gender: user.gender,
            // NOTE: user types must be inserted first
            userType: regularUserType._id,
            documentImageUrl: user.documentImageUrl,
            verifiedDocumentImage: user.verifiedDocumentImage,
            tickets: user.tickets
        };

        return users.push(seedUser);
    });

    /**
     *  Inserting users
     */
    return await User.insertMany(users, err => {
        if (err) return;
    });
};

export default seedUsers;