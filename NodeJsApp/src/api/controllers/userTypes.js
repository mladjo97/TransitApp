import UserType from '@models/userType';
import * as usersTypeService from '@services/userTypes';


export const getAllUserTypes= async (req, res, next) => {
    try {
        const users = await usersTypeService.getAllUserTypes();
        return res.status(200).json(users);
    } catch (error) {
        return next(error);
    }
};

export const getUserTypeById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await usersTypeService.getUserTypeById(id);
        return res.status(200).json(user);
    } catch (error) {
        return next(error);
    }
};

export const postUserType = async (req, res, next) => {  
    const { name } = req.body;

    const newUserType = new UserType({ name: name });

    try {
        const dbUserType = await usersTypeService.createUserType(newUserType);
        return res.status(200).json(dbUserType);
    } catch (error) {
        return next(error);
    }
};

export const putUserType = async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;

    const updatedUserType = new UserType({ _id: id, name: name });
       
    try {
        const dbUserType = await usersTypeService.updateUserType(id, updatedUserType);
        return res.status(200).json(dbUserType);
    } catch (error) {
        return next(error);
    }
};

export const deleteUserType = async (req, res, next) => {
    const { id } = req.params;

    try {
        await usersTypeService.deleteUserTypeById(id);
        return res.status(200).json({ id: id });
    } catch (error) {
        return next(error);
    }
};