import seedRoles from '@seeds/role.seeds';
import seedUserTypes from '@seeds/userType.seeds';
import seedUsers from '@seeds/user.seeds';
import seedBusLineTypes from '@seeds/busLineType.seeds';
import seedStations from '@seeds/station.seeds';

const seed = async () => {
    await seedRoles();
    await seedUserTypes();
    await seedUsers();
    await seedBusLineTypes();
    await seedStations();
};

export default seed;