const { sequelize } = require('../models');
const db = require('../models');
const HunterBets = db.hunterbets;
const User = db.user;
const Date = db.Date;

const randomAmount = () => {
    const minRand = 2.30;
    const maxRand = 54.70;
    return Math.random() * (maxRand - minRand) + minRand;
}

exports.create = async (req, res) => {
    const params = req.params;
    const betDay = `amount_${params.day}`

    const sql = `
        INSERT INTO HunterBets (user_id, date_id, dater_id, ${betDay}, createdAt, updatedAt)
        VALUES (${req.userId}, ${params.date_id}, ${params.dater_id}, ${randomAmount()}, NOW(), NOW())
    `
    const hunterbet = await sequelize.query(sql)
    if(hunterbet) {
        res.status(200).send({ status: 200, hunterbet: hunterbet})
    } else {
        res.status(201).send({ status: 201, hunterbet: {} });
    }
}

exports.findAllByDate = async (req, res) => {
    const params = req.params;

    const hunterBets = await HunterBets.findAll(
        {
            where: { user_id: req.userId, date_id: params.date_id },
            include: [
                { model: User, as: 'daterh' },
                { model: Date, as: 'dateh' }
            ]
        }
    )
    if(hunterBets.length > 0) {
        res.status(200).send({ status: 200, hunterBets: hunterBets});
    } else {
        res.status(201).send({ status: 201, hunterBets: []});
    }
}

exports.hunterHasBetsOnDaterToday = async (req, res) => {
    const params = req.params
    const betDay = `amount_${params.day}`

    let sql = `
        SELECT *
        FROM HunterBets
        WHERE ${betDay} IS NOT NULL
        AND user_id = ${req.userId}
        AND date_id = ${params.date_id}
        AND dater_id = ${params.dater_id}
    `
    const todaybet = await sequelize.query(sql)
    if(todaybet[0][0]) {
        res.status(200).send({ status: true, todaybet: todaybet[0][0] });
    } else {
        res.status(201).send({ status: false, todaybet: {}});
    }
}