import Role from '@models/role';

const seedRoles = async () => {
    const roles = [];

    // Admin 
    roles.push({
        name: 'Admin'
    });

    // TicketInspector 
    roles.push({
        name: 'TicketInspector'
    });

    // User 
    roles.push({
        name: 'User'
    });

    return await Role.insertMany(roles, err => {
        if (err) return;
    });
};

export default seedRoles;