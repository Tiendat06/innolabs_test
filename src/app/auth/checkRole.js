module.exports = checkRole = (roles) => {
    return (req, res, next) => {
        const user = req.session.user;
        const role_name = user.role.role_name;
        if(!roles.includes(role_name)){
            return res.status(400).json({
                status: false,
                msg: 'You do not have permission to access this function!'
            })
        }
        next();
    }
};