import seed from '@seeds';

const seedLoader = async () => {
    await seed();
    console.log('Successfully inserted initial seed data.');
};

export default seedLoader;