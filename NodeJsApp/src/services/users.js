import User from '@models/user';

export const createUser = async (user) => {
    try {
        const newUser = await User.create(user);
        if(!newUser) throw new Error('User cannot be created.');
        return user;
    } catch (e) {
        throw e;
    }
}