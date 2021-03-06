import User from '@models/user';
import { deleteFile } from '@utils/file';
import { sendEmail } from '@utils/email';

export const getUserDocumentImageById = (id) => {
    return User.findOne({ _id: id }).then(
        userDoc => userDoc.documentImageUrl,
        err => { throw err; }
    );
};

export const getUnverifiedDocumentImages = () => {
    return User.find().then(
        userDocs => {
            return userDocs
                .filter(userDoc => !userDoc.verifiedDocumentImage && userDoc.documentImageUrl !== null)
                .map(userDoc => {
                    return {
                        userId: userDoc._id,
                        firstName: userDoc.firstName,
                        lastName: userDoc.lastName,
                        documentImageUrl: userDoc.documentImageUrl
                    };
                });
        },
        err => { throw err; }
    );
};

export const uploadUserDocumentImage = (id, imagePath) => {
    return User.findOne({ _id: id }).then(
        userDoc => {
            if (userDoc.documentImageUrl)
                deleteFile(userDoc.documentImageUrl);

            userDoc.documentImageUrl = imagePath;
            userDoc.verifiedDocumentImage = false;

            userDoc.save(err => { if (err) throw err; });
        },
        err => { throw err; }
    );
};

export const deleteUserDocumentImage = (id) => {
    return User.findOne({ _id: id }).then(
        userDoc => {
            if (!userDoc.documentImageUrl)
                throw new Error('NotFound');

            deleteFile(userDoc.documentImageUrl);

            userDoc.documentImageUrl = null;
            userDoc.save(err => { if (err) throw err; });
        },
        err => { throw err; }
    );
};

export const verifyUserDocumentImage = (id) => {
    return User.findOne({ _id: id }).then(
        userDoc => {
            if (!userDoc.documentImageUrl)
                throw new Error('BadRequest');

            userDoc.verifiedDocumentImage = true;

            userDoc.save(err => {
                if (err) throw err;

                // test email instead of userDoc.email
                sendEmail('mldnmilosevic@gmail.com', 'Verified document image', 'Congrats! Your document image was verified.');
            });
        },
        err => { throw err; }
    );
};

export const rejectUserDocumentImage = (id) => {
    return User.findOne({ _id: id }).then(
        userDoc => {
            if (!userDoc.documentImageUrl)
                throw new Error('BadRequest');

            userDoc.verifiedDocumentImage = false;

            userDoc.save(err => {
                if (err) throw err;

                // test email instead of userDoc.email
                sendEmail('mldnmilosevic@gmail.com', 'Rejected document image', 'Your document image was rejected. Try with another one.');
            });
        },
        err => { throw err; }
    );
};