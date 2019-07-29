import User from '@models/user';
import { createUser } from '@services/users';

export const postUser = async (req, res, next) => {
    const { firstName, lastName, username, email } = req.body;

    const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email
    });

    try {
        const dbUser = await createUser(newUser);
        return res.status(200).json(dbUser);
    } catch (e) {
        return next(e);
    }
}