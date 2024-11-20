const UserLog = require("../models/UserLog");

class UserLogRepository {

    insertUserLog = (data) => {
        return UserLog.insertMany(data)
            .then(value => value)
            .catch(err => console.log(err));
    }

}

module.exports = new UserLogRepository;