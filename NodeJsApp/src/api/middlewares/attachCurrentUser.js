/* eslint-disable require-atomic-updates */
import User from '@models/user';

const attachCurrentUser = async (req, res, next) => {
    try {
        const userDoc = await User.findById(req.token._id);
        if (!userDoc) {
            return res.sendStatus(401);
        }

        const currentUser = userDoc.toObject();
        delete currentUser.passwordHash;
        req.currentUser = currentUser;

        return next();

    } catch (err) {
        return next(err);
    }
};

export default attachCurrentUser;