import User from '@models/user';

export const getUnverifiedDocumentImages = async () => {

    return User.find().then(
        userDocs => {

            return userDocs.filter(userDoc => !userDoc.verifiedDocumentImage && userDoc.documentImageUrl !== null).map(userDoc => {
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

