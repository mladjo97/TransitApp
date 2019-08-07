/* eslint-disable require-atomic-updates */

import argon2 from 'argon2';
import User from '@models/user';
import Role from '@models/role';
import { randomBytes } from 'crypto';
import * as authService from '@services/auth';


export const getAllUsers = async () => {
    const users = await User.find()
        .populate('role userType', '_id name');
    return users;
};

export const getUserById = async (id) => {
    const user = await User.findById(id)
        .populate('role userType', '_id name');
    return user;
};

export const createUser = async (user) => {
    const userRole = await Role.findOne({ name: 'User' }, (err, doc) => {
        if (err) return;
        return doc;
    });

    user.role = userRole._id;

    const newUser = await authService.register(user);
    if (!newUser) throw new Error('User cannot be created.');

    return newUser;
};

export const updateUser = async (id, user) => {
    const userRole = await Role.findOne({ name: 'User' }, (err, doc) => {
        if (err) return;
        return doc;
    });

    user.role = userRole._id;

    const updatedUser = await User.findByIdAndUpdate(id, user, { useFindAndModify: false, new: true });
    if (!updatedUser) throw new Error('User cannot be updated.');
    return updatedUser;
};

export const deleteUserById = async (id) => {
    const deletedUser = await User.findByIdAndDelete(id);
    return deletedUser;
};

export const changePassword = (id, oldPassword, newPassword) => {
    return User.findOne({ _id: id }).then(
        async userDoc => {
            const validPassword = await argon2.verify(userDoc.passwordHash, oldPassword);
            if(!validPassword) throw new Error('InvalidPassword');
            
            const salt = randomBytes(32);
            const hashedNewPassword = await argon2.hash(newPassword, { salt });
            userDoc.passwordHash = hashedNewPassword;
            
            await userDoc.save(err => { if(err) throw err; });
        },
        () => { throw new Error('NotFound'); }
    );
};

export const getCount = () => {
    return User.countDocuments((err, count) => {
        if (err) throw err;
        return count;
    });
};