import User from '@models/user';
import * as usersService from '@services/users';

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await usersService.getAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        return next(error);
    }
};

export const getUserById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await usersService.getUserById(id);
        return res.status(200).json(user);
    } catch (error) {
        return next(error);
    }
};

export const postUser = async (req, res, next) => {
    const { firstName, lastName, username, email } = req.body;

    const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email
    });

    try {
        const dbUser = await usersService.createUser(newUser);
        return res.status(200).json(dbUser);
    } catch (error) {
        return next(error);
    }
};

export const putUser = async (req, res, next) => {
    const { _id, firstName, lastName, username, email } = req.body;
    const { id } = req.params;

    const updatedUser = new User({
        _id: _id,
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email
    });

    try {
        const dbUser = await usersService.updateUser(id, updatedUser);
        return res.status(200).json(dbUser);
    } catch (error) {
        return next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    const { id } = req.params;

    try {
        await usersService.deleteUserById(id);
        return res.status(200).json({ id: id });
    } catch (error) {
        return next(error);
    }
};