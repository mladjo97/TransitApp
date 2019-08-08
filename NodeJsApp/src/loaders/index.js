import seedLoader from '@loaders/seed';
import expressLoader from '@loaders/express';
import mongooseLoader from '@loaders/mongoose';

const loader = ({ expressApp }) => {

    // returns an MongoDb.Db object if needed later
    mongooseLoader();
    console.log('Database successfully loaded.');

    expressLoader(expressApp);
    console.log('Express app successfully loaded.');

    seedLoader();
};

export default loader;