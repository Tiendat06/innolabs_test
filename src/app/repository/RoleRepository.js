const Role = require('../models/Role');

class RoleRepository {

    getRoleByRoleId = (role_id) => {
        return Role.findById(role_id)
            .then(role => role)
            .catch(err => console.log(err));
    }

    getRoleByName(role_name) {
        return Role.findOne({role_name})
            .then(value => value)
            .catch(err => console.log(err));
    }
}

module.exports = new RoleRepository;