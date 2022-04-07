const db = require("../models");
const User = db.user;
const Type = db.type;
const Role = db.role;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};
exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

exports.getDaters = async (req, res) => {
    const users = await User.findAll(
        {
            where: { type_id: 1 },
            include: [
                { model: Type, as: 'type' },
                { model: Role, as: 'roles' }
            ]
        }
    )
    if(users.length > 0) {
        res.status(200).send({ status: 200, daters: users});
    } else {
        res.status(201).send({ status: 201, daters: []});
    }
}

exports.getDater = async (req, res) => {
    const id = req.params.id;

    await User.findByPk(id, {
        include: [
            { model: Type, as: 'type'},
            { model: Role, as: 'roles' }
        ]
    }).then((dater) => {
        if(dater) {
            res.status(200).send({ status: 200, dater: dater})
        } else {
            res.status(201).send({ status: 201, dater: null})
        }
    })
}