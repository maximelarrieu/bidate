const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Check username
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if(user) {
            res.status(400).send({
                message: "Failed! Username is already in use!"
            });
            return;
        }
    })
    // Email
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if(user) {
            res.status(400).send({
                message: "Failed! Email is already in use!"
            });
            return;
        }
        next();
    })
}

checkRolesExisted = (req, res, next) => {
    if(req.body.roles) {
        for(let index = 0; index < req.body.roles.length; index++) {
            if(!ROLES.includes(req.body.roles[index])) {
                res.status(400).send({
                    message: "Failed! Role does not exist = " + req.body.roles[index]
                });
                return;
            }
        }
    }

    next();
}

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;