import BusLineType from '@models/busLineType';

const seedBusLineTypes = async () => {
    const busLineTypes = [];

    // Urban 
    busLineTypes.push({
        name: 'Urban'
    });

    // Suburban 
    busLineTypes.push({
        name: 'Suburban'
    });

    return await BusLineType.insertMany(busLineTypes, err => {
        if (err) return;
    });
};

export default seedBusLineTypes;