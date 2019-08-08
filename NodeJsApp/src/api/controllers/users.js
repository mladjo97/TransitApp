import moment from 'moment';
import config from '@config';
import * as usersService from '@services/users';
import * as authService from '@services/auth';

export const fileUpload = async (req, res) => {
    console.log(req.file);
    return res.status(200).json('ok');
};

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

export const getLoggedUserInfo = async (req, res, next) => {
    if(!req.currentUser) next(new Error('NotFound'));
    return res.status(200).json(req.currentUser);
};

export const postUser = async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        password,
        address,
        gender,
        dateOfBirth,
        userTypeId
    } = req.body;
    
    const newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        address: address,
        gender: gender,
        dateOfBirth: moment.utc(dateOfBirth, config.dateFormat),
        userType: userTypeId,
        documentImageUrl: req.file.path || null
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
        email,
        address,
        gender,
        dateOfBirth,
        userTypeId
    } = req.body;
    
    const updatedUser = {
        _id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: address,
        gender: gender,
        dateOfBirth: moment.utc(dateOfBirth, config.dateFormat),
        userType: userTypeId
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

export const getCount = async (req, res, next) => {
    try {
        const count = await usersService.getCount();
        return res.status(200).json(count);
    } catch (error) {
        return next(error);
    }
};

export const changePassword = async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;

    try {
        await usersService.changePassword(req.currentUser._id, oldPassword, newPassword);
        return res.status(200).json({ message: 'Changed password'});
    } catch (error) {
        console.log(error);
        
        return next(error);
    }
};