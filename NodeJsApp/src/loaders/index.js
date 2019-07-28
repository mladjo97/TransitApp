import expressLoader from './express';
import mongooseLoader from './mongoose';

const loader = ({ expressApp }) => {

    // returns an MongoDb.Db object if needed later
    const mongoConnection = mongooseLoader();
    console.log('Database successfully loaded.');

    expressLoader(expressApp);
    console.log('Express app successfully loaded.');
};

export default loader;