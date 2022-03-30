const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

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
    const users = await User.findAll();
    res.status(200).send({ status: 200, daters: users});
}

exports.getDater = async (req, res) => {
    const id = req.params.id;

    await User.findByPk(id).then((dater) => {
        res.status(200).send({ status: 200, dater: dater})
    })
}