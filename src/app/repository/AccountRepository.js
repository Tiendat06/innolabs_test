const Account = require('../models/Account');

class AccountRepository {

    getAccountByUserId = (user_id) => {
        return Account.findOne({user_id, deleted: false})
            .then(value => value)
            .catch(err => console.log(err));
    }

    insertAccount = (data) => {
        return Account.insertMany(data)
            .then(value => value)
            .catch(err => console.log(err));
    }

    updateAccountPasswordByUserId = (user_id, newPassword) => {
        return Account.updateOne({user_id, deleted: false}, {$set: {password: newPassword, updatedAt: Date.now()}})
            .then(value => value)
            .catch(err => console.log(err));
    }

    updateAccountRoleByUserId = (user_id, newRole) => {
        return Account.updateOne({user_id, deleted: false}, {$set: {role_id: newRole, updatedAt: Date.now()}})
            .then(value => value)
            .catch(err => console.log(err));
    }

    deleteAccountByUserId = (user_id) => {
        return Account.updateOne({user_id, deleted: false}, {$set: {deleted: true, updatedAt: Date.now()}})
            .then(value => value)
            .catch(err => console.log(err));
    }
}

module.exports = new AccountRepository;