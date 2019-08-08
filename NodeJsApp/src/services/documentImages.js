import User from '@models/user';
import { deleteFile } from '@utils/file';

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

export const deleteUserDocumentImage = (id) => {
    return User.findOne({ _id: id}).then(
        userDoc => {
            if(!userDoc.documentImageUrl) 
                throw new Error('NotFound');
            
            deleteFile(userDoc.documentImageUrl);

            userDoc.documentImageUrl = null;
            userDoc.save(err => { if(err) throw err; });
        },
        err => { throw err; }
    );
};

