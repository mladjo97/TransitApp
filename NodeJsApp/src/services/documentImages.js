import User from '@models/user';

export const getUserDocumentImageById = (id) => {
    return User.findOne({ _id: id }).then(
        userDoc => userDoc.documentImageUrl || null,
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

