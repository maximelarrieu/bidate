const { authJwt } = require('../middlewares');
const controller = require('../controllers/hunterBets.controller');

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/api/hunter/bet/:dater_id/date/:date_id/:day', [authJwt.verifyToken], controller.create);

    app.get('/api/hunter/bets/:date_id', [authJwt.verifyToken], controller.findAllByDate);

    app.get('/api/hunter/bets/in/:date_id/for/:dater_id/today/:day', [authJwt.verifyToken], controller.hunterHasBetsOnDaterToday)

    // app.get('/api/daters', [authJwt.verifyToken], controller.getDaters);
// 
    // app.get('/api/dater/:id', [authJwt.verifyToken], controller.getDater);
}