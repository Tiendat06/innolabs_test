const userService = require('../services/UserService')

class UserController {

    // [GET] /user
    index = async (req, res, next) => {
        return await userService.getUsers(req, res);
    }

    // [PATCH] /user/:id/change-role
    change_role = async (req, res, next) => {
        return await userService.changeUserRole(req, res);
    }

    // [PUT] /user/:id
    update_user = async (req, res, next) => {
        return await userService.updateUser(req, res);
    }

    // [DELETE] /user/:id
    delete_user = async (req, res, next) => {
        return await userService.deleteUser(req, res);
    }
}
module.exports = new UserController;