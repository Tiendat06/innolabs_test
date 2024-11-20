const userRepository = require('../repository/UserRepository');
const roleRepository = require('../repository/RoleRepository');
const accountRepository = require('../repository/AccountRepository');
const userLogRepository = require('../repository/UserLogRepository')
const bcrypt = require('bcrypt');

class UserService {

    getUsers = async (req, res) => {
        try{
            const user = await userRepository.getUsers();
            return res.status(200).json({
                status: true,
                data: user,
                msg: 'Load users successfully !!'
            });
        } catch (e) {
            return res.status(400).json({
                status: false,
                msg: 'Load users failed !!'
            });
        }
    }

    changeUserRole = async (req, res) => {
        const {id} = req.params;
        const {role_name} = req.body;
        const error = req.flash('error');
        try{
            if(error.length === 0){
                const role = await roleRepository.getRoleByName(role_name);
                const role_id = role._id;

                const accountUpdate = await accountRepository.updateAccountRoleByUserId(id, role_id);
                if(!accountUpdate.acknowledged) throw new Error('Update role failed !!');
                return res.status(200).json({
                    status: true,
                    msg: 'Update role successfully !'
                })
            } else{
                throw new Error(error[0]);
            }
        } catch (e) {
            return res.status(400).json({
                status: false,
                msg: e.message
            })
        }

    }

    updateUser = async (req, res) => {
        const {id} = req.params;
        const {fullName, password, phone, email} = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const error = req.flash('error');
        const userSession = req.session.user;
        try{
            if(error.length === 0){
                const userUpdateId = userSession.user._id;
                const previousUser = await userRepository.getUserById(id);
                const previousAccount = await accountRepository.getAccountByUserId(id);

                const userLogData = {
                    user_id: userUpdateId,
                    previous_fullName: previousUser.fullName,
                    previous_email: previousUser.email,
                    previous_phone: previousUser.phone,
                    previous_password: previousAccount.password,
                    process: 'UPDATE'
                }
                const userDataBackUp = {
                    _id: id,
                    fullName: previousUser.fullName, phone: previousUser.phone, email: previousUser.email,
                    updatedAt: Date.now()
                }

                const userData = {
                    _id: id,
                    fullName, phone, email,
                    updatedAt: Date.now()
                }
                const userUpdate = await userRepository.updateUserByUserId(userData);
                if(!userUpdate.acknowledged) throw new Error('Update user failed !');

                const accountData = {
                    user_id: id,
                    password: hashPassword,
                }
                const accountUpdate = await accountRepository.updateAccountPasswordByUserId(accountData.user_id, accountData.password);
                if(!accountUpdate.acknowledged) {
                    await userRepository.updateUserByUserId(userDataBackUp);
                    throw new Error('Update user failed !');
                }

                const userLogUpdate = await userLogRepository.insertUserLog(userLogData);
                if(userLogUpdate.length === 0) throw new Error('Update user failed !');

                return res.status(200).json({
                    status: true,
                    msg: 'Update user successfully !'
                })
            } else{
                throw new Error(error[0]);
            }
        } catch (e) {
            return res.status(400).json({
                status: false,
                msg: 'Update user successfully !'
            })
        }
    }

    deleteUser = async (req, res) => {
        const {id} = req.params;
        const userSession = req.session.user;

        try {
            const userUpdateId = userSession.user._id;
            const previousUser = await userRepository.getUserById(id);
            const previousAccount = await accountRepository.getAccountByUserId(id);
            const userLogData = {
                user_id: userUpdateId,
                previous_fullName: previousUser.fullName,
                previous_email: previousUser.email,
                previous_phone: previousUser.phone,
                previous_password: previousAccount.password,
                process: 'DELETE'
            }

            const userDelete = await userRepository.deleteUserByUserId(id);
            if(!userDelete.acknowledged) throw new Error('Delete user failed !');

            const accountDelete = await accountRepository.deleteAccountByUserId(id);
            if(!accountDelete.acknowledged) {
                await userRepository.deleteUserByUserId(id, false);
                throw new Error('Delete user failed !');
            }

            const userLogUpdate = await userLogRepository.insertUserLog(userLogData);
            if(userLogUpdate.length === 0) throw new Error('Update user failed !');

            return res.status(200).json({
                status: true,
                msg: 'Delete user successfully !'
            })
        } catch (e) {
            return res.status(400).json({
                status: false,
                msg: e.message,
            })
        }
    }
}

module.exports = new UserService;