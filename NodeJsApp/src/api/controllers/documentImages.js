import * as docImagesService from '@services/documentImages';


export const getAll = async (req, res, next) => {
    try {
        const docImages = await docImagesService.getUnverifiedDocumentImages();
        return res.status(200).json(docImages);
    } catch (error) {
        return next(error);
    }
};