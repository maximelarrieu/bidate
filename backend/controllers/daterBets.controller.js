const { sequelize } = require("../models");
const colors = require('colors')
const db = require("../models");
const DaterBets = db.daterbets
const User = db.user
const dbDate = db.date

const randomAmount = () => {
    const minRand = 2.30;
    const maxRand = 54.70;
    return Math.random() * (maxRand - minRand) + minRand;
}

exports.create = async (req, res) => {
    const params = req.params;
    const betDay = `amount_${params.day}`

    const sql = `
        INSERT INTO DaterBets (user_id, date_id, ${betDay}, createdAt, updatedAt)
        VALUES (${req.userId}, ${params.date_id}, ${req.body.amount}, NOW(), NOW())
    `
    const daterbet = await sequelize.query(sql)
    if(daterbet) {
        res.status(200).send({ status: 200, daterbet: daterbet})
    } else {
        res.status(201).send({ status: 201, daterbet: {} });
    }
}

exports.update = async (req, res) => {
    const params = req.params
    const betDay = `amount_${params.day}`
    
    const sql = `
        UPDATE DaterBets
        SET ${betDay} = ${req.body.amount}
        WHERE user_id = ${req.userId}
        AND date_id = ${params.date_id}
    `

    const daterbet = await sequelize.query(sql)

    if(daterbet) {
        res.status(200).send({ status: 200, daterbet: daterbet})
    } else {
        res.status(201).send({ status: 201, daterbet: {} });
    }
}

exports.getDaterBetsByDate = async (req, res) => {
    const params = req.params;

    const daterBets = await DaterBets.findAll(
        {
            where: { date_id: params.date_id },
            include: [
                { model: User, as: 'userb' },
                // { model: dbDate, as: 'dateb' }
            ]
        }
    );
    if(daterBets.length > 0) {
        res.status(200).send({ status: 200, daterBets: daterBets});
    } else {
        res.status(201).send({ status: 201, daterBets: []});
    }
}

exports.daterHasBets = async (req, res) => {
    const params = req.params

    const daterbet = await DaterBets.findOne(
        {
            where: { user_id: req.userId, date_id: params.date_id }
        }
    );

    if(daterbet) {
        res.status(200).send({ status: true, daterbet: daterbet});
    } else {
        res.status(201).send({ status: false, daterbet: {}});
    }
}

exports.daterHasBetsToday = async (req, res) => {
    const params = req.params
    const betDay = `amount_${params.day}`

    let sql = `
        SELECT *
        FROM DaterBets
        WHERE ${betDay} IS NOT NULL
        AND user_id = ${req.userId}
        AND date_id = ${params.date_id}
    `

    const todaybet = await sequelize.query(sql)
    if(todaybet[0][0]) {
        res.status(200).send({ status: true, todaybet: todaybet[0][0] });
    } else {
        res.status(201).send({ status: false, todaybet: {}});
    }
}

// exports.getType = async (req, res) => {
//     const id = req.params.id;

//     await Type.findByPk(id).then((type) => {
//         if(type) {
//             res.status(200).send({ status: 200, type: type})
//         } else {
//             res.status(201).send({ status: 201, type: null})
//         }
//     })
// }