const userRepository = require('../repository/UserRepository');
const accountRepository = require('../repository/AccountRepository');
const roleRepository = require('../repository/RoleRepository');
const bcrypt = require('bcrypt');
const mailer = require('nodemailer');

class LogService {

    checkLogin = async (req, res) => {
        const {email, password} = req.body;
        try {
            const error = req.flash('error');
            if (error.length === 0) {
                const user = await userRepository.getUserByEmail(email);
                // console.log(user);
                if (user){
                    const user_id = user._id;
                    const account = await accountRepository.getAccountByUserId(user_id);
                    const hashPassword = account.password;
                    const match = await bcrypt.compare(password, hashPassword);
                    if(!match) throw new Error('Invalid email or password')

                    const role_id = account.role_id;
                    const role = await roleRepository.getRoleByRoleId(role_id);

                    req.session.user = {
                        user, role
                    }
                    return res.status(200).json({
                        status: true,
                        msg: 'Login successfully !'
                    })
                } else{
                    throw new Error('Invalid email or password')
                }
            } else{
                throw new Error(error[0]);
            }
        } catch (e) {
            return res.status(400).json({
                status: false,
                msg: e.message
            })
        }    }

    register = async (req, res) => {
        const {fullName, password, phone, email} = req.body;
        try {
            const error = req.flash('error');
            if (error.length === 0 && error === ''){
                const userData = {
                    fullName,
                    email, phone
                }
                const user = await userRepository.insertUser(userData);
                if(user.length === 0) throw new Error('Register Failed !!');

                const user_id = user[0]._id;
                const role = await roleRepository.getRoleByName('reader');
                const hashPassword = await bcrypt.hash(password, 10);

                const accountData = {
                    user_id,
                    password: hashPassword,
                    role_id: role._id
                }
                const account = await accountRepository.insertAccount(accountData);
                if(account.length === 0) {
                    await userRepository.hardDeleteUserByUserId(user_id);
                    throw new Error('Register Failed !!');
                }

                return res.status(201).json({
                    status: true,
                    msg: 'Register successfully!!',
                })
            } else{
                return res.status(400).json({
                    status: false,
                    msg: error[0]
                })
            }
        } catch (e) {
            return res.status(400).json({
                status: false,
                msg: 'Register Failed !!'
            })
        }

    }

    forgotPassword = async (req, res) => {
        const {email} = req.body;
        const error = req.flash('error');
        try {
            if(error.length === 0){
                return this.sendMailForgotPassword(req, email)
                    .then(() => {
                        return res.status(200).json({
                            status: true,
                            msg: 'Please check your mail'
                        })
                    })
                    .catch(e => {
                        throw new Error(e);
                    });

            } else{
                throw new Error(error[0]);
            }
        } catch (e) {
            return res.status(400).json({
                status: false,
                msg: 'Send mail failed !'
            })
        }
    }

    sendMailForgotPassword = async (req, email) => {
        try {
            const transporter = mailer.createTransport({
                host: process.env.MAIL_SERVER,
                port: process.env.MAIL_PORT,
                secure: false,
                auth: {
                    user: process.env.MAIL_USERNAME,
                    pass: process.env.MAIL_PASSWORD
                }
            })

            const code_forgot = this.generateRandomString(10);
            const newPassword = await bcrypt.hash(code_forgot, 10);
            const user = await userRepository.getUserByEmail(email);
            const user_id = user._id;

            const accountUpdate = await accountRepository.updateAccountPasswordByUserId(user_id, newPassword);

            const mailOptions = {
                from: process.env.MAIL_USERNAME,
                to: email,
                subject: 'Email Verification',
                html: `<p>This code below is your new password:<br/> ${code_forgot}</p>`,
            }
            await transporter.sendMail(mailOptions);
        } catch (e) {
            console.log(e)
        }
    }

    generateRandomString = (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
        return result;
    }
}

module.exports = new LogService;