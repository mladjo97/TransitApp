import moment from 'moment';
import config from '@config';

import User from '@models/user';
import Role from '@models/role';
import UserType from '@models/userType';

import usersJSON from './users.json';

import { randomBytes } from 'crypto';
import argon2 from 'argon2';


const seedUsers = async () => {
    /*
    *   User needs foreign key (ObjectId) relations
    */
    const salt = randomBytes(32);
    const userRole = await Role.findOne({ name: 'User' });
    const adminRole = await Role.findOne({ name: 'Admin' });
    const regularUserType = await UserType.findOne({ name: 'Regular' });
    const ticketInspectorRole = await Role.findOne({ name: 'TicketInspector' });

    /*
     *  Insert users 
    */
    usersJSON.map(async (user) => {
        // NOTE: roles must be inserted first
        let roleId = user.email === 'mladjo@demo.com' ?
            adminRole._id :
            userRole._id;

        roleId = user.email === 'ticket@demo.com' ?
            ticketInspectorRole._id :
            roleId;

        const hashedPassword = await argon2.hash(user.password, { salt });
        const seedUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            passwordHash: hashedPassword,
            role: roleId,
            address: user.address,
            dateOfBirth: moment.utc(user.dateOfBirth, config.dateFormat),
            gender: user.gender,
            userType: regularUserType._id,
            documentImageUrl: user.documentImageUrl,
            verifiedDocumentImage: user.verifiedDocumentImage,
            tickets: user.tickets
        };

        User.create(seedUser, (err) => {
            if (err) return;
        });
    });
};

export default seedUsers;