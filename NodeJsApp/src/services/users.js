import User from '@models/user';

export const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw error;
    }
};

export const getUserById = async (id) => {
    try {
        const user = await User.findById(id);
        return user;
    } catch (error) {
        throw error;
    }
};

export const createUser = async (user) => {
    try {
        const newUser = await User.create(user);
        if(!newUser) throw new Error('User cannot be created.');
        return user;
    } catch (error) {
        throw error;
    }
};

export const updateUser = async (id, user) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(id, user, { useFindAndModify: false, new: true });
        if(!updatedUser) throw new Error('User cannot be updated.');
        return updatedUser;
    } catch (error) {
        throw error;
    }
};

export const deleteUserById = async (id) => {
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if(!deletedUser) throw new Error('User cannot be deleted.');
        return deletedUser;
    } catch (error) {
        throw error;
    }
};
