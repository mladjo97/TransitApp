import User from '@models/user';
import Role from '@models/role';
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
