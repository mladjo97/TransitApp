import * as docImagesService from '@services/documentImages';

export const getUserDocumentById = async (req, res, next) => {
    const { currentUser } = req;

    if (!currentUser)
        return res.status(400).json({ message: 'Bad Request' });

    try {
        const docImageUrl = await docImagesService.getUserDocumentImageById(currentUser._id);

        if (!docImageUrl)
            return res.status(404).json({ message: 'Document image not found.' });

        return res.status(200).json(docImageUrl);
    } catch (error) {
        return next(error);
    }
};

export const getAll = async (_req, res, next) => {
    try {
        const docImages = await docImagesService.getUnverifiedDocumentImages();
        return res.status(200).json(docImages);
    } catch (error) {
        return next(error);
    }
};

export const deleteUserDocumentImage = async (req, res, next) => {
    const { currentUser } = req;

    if (!currentUser)
        return res.status(400).json({ message: 'Bad Request' });

    try {
        await docImagesService.deleteUserDocumentImage(currentUser._id);
        return res.status(200).json({ message: 'Deleted' });
    } catch (error) {
        return next(error);
    }
};