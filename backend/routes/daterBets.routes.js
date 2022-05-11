const { authJwt } = require('../middlewares');
const controller = require('../controllers/daterBets.controller');

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/api/dater/bet/:date_id/:day', [authJwt.verifyToken], controller.create);

    app.patch('/api/dater/bet/:date_id/:day', [authJwt.verifyToken], controller.update)

    app.get('/api/dater/bets/:date_id', [authJwt.verifyToken], controller.getDaterBetsByDate);

    app.get('/api/dater/bets/in/:date_id', [authJwt.verifyToken], controller.daterHasBets);

    app.get('/api/dater/my/bets', [authJwt.verifyToken], controller.findAllMine);

    app.get('/api/dater/bets/in/:date_id/today/:day', [authJwt.verifyToken], controller.daterHasBetsToday)
    // app.get('/api/daters', [authJwt.verifyToken], controller.getDaters);
// 
    // app.get('/api/dater/:id', [authJwt.verifyToken], controller.getDater);
}