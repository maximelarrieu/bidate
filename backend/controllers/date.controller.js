const db = require("../models");
const dbDate = db.date;
const User = db.user;

exports.create = (req, res) => {
    let createdAt = new Date();
    let endedAtTS = createdAt.setDate(createdAt.getDate() + 5);
    let date = new Date(endedAtTS);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours() - 2;
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();

    const endedAt = `${year}-${month}-${day} ${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`

    dbDate.create({
        user_id: req.userId,
        endedAt: endedAt,
        isEnded: 0
    })
    .then(date => {
        res.status(200).send({ status: 200 , date: date })
    })
    .catch(error => {
        res.status(400).send({ status: 400, message: 'error...', error: error })
    })

}

exports.findAll = async (req, res) => {
    const dates = await dbDate.findAll(
        {
            include: [
                { model: User, as: 'user' }
            ]
        }
    )
    if(dates.length > 0) {
        res.status(200).send({ status: 200, dates: dates});
    } else {
        res.status(201).send({ status: 201, dates: []});
    }
}

exports.findAllByDater = async (req, res) => {
    const id = req.params.id;

    const dates = await dbDate.findAll(
        {
            where: { user_id: id, isEnded: 1 }
        }
    )
    console.log('DATES', dates)
    if(dates.length > 0) {
        res.status(200).send({ status: 200, dates: dates});
    } else {
        res.status(201).send({ status: 201, dates: []});
    }
}

exports.currentDate = async (req, res) => {
    console.log('req.userID', req.userId)
    const id = req.params.id
    await dbDate.findOne({ where: { user_id: id }}).then(date => {
        console.log('DATE', date)
        if(date) {
            console.log('DATE CURRENT', date);
            res.status(200).send({ status: 200, date: date})
        } else {
            res.status(201).send({ status: 201, date: null})
        }
    })
}

exports.isEnded = async (req, res) => {
    const id = req.params.id;

    await dbDate.findByPk(id).then(date => {
        if(date) {
            date.update({
                isEnded: 1
            }).then(d => {
                res.status(200).send({ status: 200, date: d})
            });
            res.status(200).send({ status: 200, date: date})

        }
    })
}