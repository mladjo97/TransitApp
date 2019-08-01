import moment from 'moment';
import config from '@config';

import User from '@models/user';
import Role from '@models/role';
import UserType from '@models/userType';

import usersJSON from './users.json';


const seedUsers = async () => {
    /*
    *   User needs foreign key (ObjectId) relations
    */
   const userRole = await Role.findOne({ name: 'User' });
   const adminRole = await Role.findOne({ name: 'Admin' });
   const regularUserType = await UserType.findOne({ name: 'Regular' });
   const ticketInspectorRole = await Role.findOne({ name: 'TicketInspector' });

    /*
     *  Insert users 
    */
    usersJSON.map((user) => {
        // NOTE: roles must be inserted first
        let roleId = user.username === 'mladjo' ?
            adminRole._id :
            userRole._id;

        roleId = user.username === 'ticketInspector' ?
            ticketInspectorRole._id :
            roleId;

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