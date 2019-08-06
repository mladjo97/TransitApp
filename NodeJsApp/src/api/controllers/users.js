import moment from 'moment';
import config from '@config';
import * as usersService from '@services/users';
import * as authService from '@services/auth';

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
    const {
        firstName,
        lastName,
        username,
        email,
        password,
        address,
        gender,
        dateOfBirth,
        userTypeId,
        documentImageUrl
    } = req.body;

    const newUser = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password,
        address: address,
        gender: gender,
        dateOfBirth: moment.utc(dateOfBirth, config.dateFormat),
        userType: userTypeId,
        documentImageUrl: documentImageUrl || null
    };

    try {
        const dbUser = await usersService.createUser(newUser);
        return res.status(200).json(dbUser);
    } catch (error) {
        return next(error);
    }
};

export const putUser = async (req, res, next) => {
    const { id } = req.params;

    const {
        firstName,
        lastName,
        username,
        email,
        password,
        address,
        gender,
        dateOfBirth,
        userTypeId,
        documentImageUrl,

    } = req.body;

    const updatedUser = {
        _id: id,
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        passwordHash: password,
        address: address,
        gender: gender,
        dateOfBirth: moment.utc(dateOfBirth, config.dateFormat),
        userType: userTypeId,
        documentImageUrl: documentImageUrl || null
    };

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

export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const userData = await authService.login(email, password);
        return res.status(200).json(userData);
    } catch(error) {
        return next(error);
    }
};