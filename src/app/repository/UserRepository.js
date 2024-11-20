const User = require('../models/User');

class UserRepository {

    getUsers = () => {
        return User.find({deleted: false}).select('_id fullName email phone')
            .then(user => user)
            .catch(err => console.log(err));
    }

    getUserById = (_id) => {
        return User.findOne({_id, deleted: false})
            .then(user => user)
            .catch(err => console.log(err));
    }

    getUserByEmail = (email) => {
        return User.findOne({email, deleted: false})
            .then(user => user)
            .catch(err => console.log(err));
    }

    insertUser = (data) => {
        return User.insertMany(data)
            .then(value => value)
            .catch(err => console.log(err));
    }

    updateUserByUserId = ({_id, ...userData}) => {
        return User.updateOne({_id, deleted: false}, {$set: userData})
            .then(value => value)
            .catch(err => console.log(err));
    }

    deleteUserByUserId = (_id, deleted=true) => {
        return User.updateOne({_id}, {$set: {deleted: deleted, updatedAt: Date.now()}})
            .then(value => value)
            .catch(err => console.log(err));
    }

    hardDeleteUserByUserId = (_id) => {
        return User.deleteOne({_id})
            .then(value => value)
            .catch(err => console.log(err));
    }
}

module.exports = new UserRepository;