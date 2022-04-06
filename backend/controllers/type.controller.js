const db = require("../models");
const config = require("../config/auth.config");
const Type = db.type

exports.getTypes = async (req, res) => {
    const types = await Type.findAll();
    if(types.length > 0) {
        res.status(200).send({ status: 200, types: types});
    } else {
        res.status(201).send({ status: 201, types: []});
    }
}

exports.getType = async (req, res) => {
    const id = req.params.id;

    await Type.findByPk(id).then((type) => {
        if(type) {
            res.status(200).send({ status: 200, type: type})
        } else {
            res.status(201).send({ status: 201, type: null})
        }
    })
}