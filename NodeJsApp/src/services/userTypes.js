import UserType from '@models/userType';

export const getAllUserTypes = async () => {
    const userTypes = await UserType.find()
                    .populate('users', '_id firstName lastName username email');
    return userTypes;
};

export const getUserTypeById = async (id) => {
    const userType = await UserType.findById(id);
    return userType;
};

export const createUserType = async (userType) => {
    const newUserType = await UserType.create(userType);
    if (!newUserType) throw new Error('UserType cannot be created.');
    return newUserType;
};

export const updateUserType = async (id, userType) => {
    const updatedUserType = await UserType.findByIdAndUpdate(id, userType, { useFindAndModify: false, new: true });
    if (!updatedUserType) return null;
    return updatedUserType;
};

export const deleteUserTypeById = async (id) => {
    const deletedUserType = await UserType.findByIdAndDelete(id);
    return deletedUserType;
};
