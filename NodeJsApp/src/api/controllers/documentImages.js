import * as docImagesService from '@services/documentImages';

export const getUserDocumentById = async (req, res, next) => {
    const { currentUser } = req;

    if (!currentUser)
        return res.status(400).json({ message: 'Bad Request' });

    try {
        const docImageUrl = await docImagesService.getUserDocumentImageById(currentUser._id);
        return res.status(200).json(docImageUrl);
    } catch (error) {
        return next(error);
    }
};

export const getAll = async (req, res, next) => {
    try {
        const docImages = await docImagesService.getUnverifiedDocumentImages();
        return res.status(200).json(docImages);
    } catch (error) {
        return next(error);
    }
};