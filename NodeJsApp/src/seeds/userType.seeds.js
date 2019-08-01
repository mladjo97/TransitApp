import UserType from '@models/userType';

const seedUserTypes = async () => {
    const userTypes = [];

    // Regular 
    userTypes.push({
        name: 'Regular'
    });

    // Scholar 
    userTypes.push({
        name: 'Scholar'
    });

    // Pensioner 
    userTypes.push({
        name: 'Pensioner'
    });

    return await UserType.insertMany(userTypes, err => {
        if (err) return;
    });
};

export default seedUserTypes;