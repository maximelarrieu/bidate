const db = require("../models");
const User = db.user;
const Role = db.role;
const UserRoles = db.userroles;

exports.create = (userId, roleId) => {
    UserRoles.create({
        userId: userId,
        roleId: roleId
    })
    .then(userrole => {
        console.log(`user ${userId} added for role ${roleId} => userrole: ${userrole}`)
    })
}

// exports.getDaters = async (req, res) => {
//     const users = await User.findAll();
//     if(users.length > 0) {
//         res.status(200).send({ status: 200, daters: users});
//     } else {
//         res.status(201).send({ status: 201, daters: []});
//     }
// }

// exports.getDater = async (req, res) => {
//     const id = req.params.id;

//     await User.findByPk(id).then((dater) => {
//         if(dater) {
//             res.status(200).send({ status: 200, dater: dater})
//         } else {
//             res.status(201).send({ status: 201, dater: null})
//         }
//     })
// }