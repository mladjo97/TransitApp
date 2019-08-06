
import User from '@models/user';
import { randomBytes } from 'crypto';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import config from '@config';

export const register = async (user) => {
    const salt = randomBytes(32);
    const hashedPassword = await argon2.hash(user.password, { salt });
    delete user.password;

    const userDoc = await User.create({
        ...user,
        passwordHash: hashedPassword
    });

    if (!userDoc) throw new Error('BadRequest');

    // mapping dto
    const userViewModel = userDoc.toObject();
    delete userViewModel.passwordHash;

    return userViewModel;
};

export const login = async (email, password) => {
    const userDoc = await User.findOne({ email: email });
    if (!userDoc) throw new Error('InvalidEmail');

    const validPassword = await argon2.verify(userDoc.passwordHash, password);
    if (!validPassword) throw new Error('InvalidPassword');

    const token = generateToken(userDoc);

    await userDoc.populate('role', 'name').execPopulate();
    const user = userDoc.toObject();
    delete user.passwordHash;

    return { access_token: token, userId: user._id, role: user.role.name };
};

const generateToken = (user) => {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
        {
            _id: user._id,
            role: user.role.name,
            exp: exp.getTime() / 1000
        },
        config.jwtSecret
    );
};