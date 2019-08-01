import seeds from '@seeds';

const seedLoader = async () => {
    
    await seeds.seedRoles();
    await seeds.seedUserTypes();
    await seeds.seedUsers();

    console.log('Successfully inserted initial seed data.');
};

export default seedLoader;