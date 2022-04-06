const db = require("../models");
const config = require("../config/auth.config");
const Role = db.role
const User = db.user

exports.getRoles = async (req, res) => {
    const roles = await Role.findAll();
    if(types.length > 0) {
        res.status(200).send({ status: 200, roles: roles});
    } else {
        res.status(201).send({ status: 201, roles: []});
    }
}

exports.getRole = async (req, res) => {
    const id = req.params.id;

    await Role.findByPk(id).then((role) => {
        if(role) {
            res.status(200).send({ status: 200, role: role})
        } else {
            res.status(201).send({ status: 201, role: null})
        }
    })
}

exports.addUser = async (roleId, userId) => {
    console.log("USERID", userId)
    return Role.findByPk(roleId)
        .then((role) => {
            if(!role) {
                console.log('Role not found');
                return null;
            }
            return User.findByPk(userId)
                .then((user) => {
                    if(!user) {
                        console.log('User not found');
                        return null;
                    }
                    role.addUser(user);
                    return role
                    // res.status(200).send({ status: 200, message: `added userId ${userId} to roleId ${roleId} `})
                }).catch((error) => {
                    console.log(error)
                    res.status(201).send({ status: 201, message: `not added userId ${userId} to roleId ${roleId} `, error: error})
                })
        }).catch((error) => {
            console.log(error)
            res.status(201).send({ status: 201, error: error})
        })
}