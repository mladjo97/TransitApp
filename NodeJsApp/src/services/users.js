import User from '@models/user';

export const getAllUsers = async () => {
    const users = await User.find()
                    .populate('role userType', '_id name');
    return users;
};

export const getUserById = async (id) => {
    const user = await User.findById(id);
    return user;
};

export const createUser = async (user) => {
    const newUser = await User.create(user);
    if (!newUser) throw new Error('User cannot be created.');
    return newUser;
};

export const updateUser = async (id, user) => {
    const updatedUser = await User.findByIdAndUpdate(id, user, { useFindAndModify: false, new: true });
    if (!updatedUser) throw new Error('User cannot be updated.');
    return updatedUser;
};

export const deleteUserById = async (id) => {
    const deletedUser = await User.findByIdAndDelete(id);
    return deletedUser;
};
