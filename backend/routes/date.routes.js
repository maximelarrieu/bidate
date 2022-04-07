const { authJwt } = require('../middlewares');
const controller = require('../controllers/date.controller');

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/api/date', [authJwt.verifyToken], controller.create);

    app.get('/api/dates', [authJwt.verifyToken], controller.findAll);

    app.get('/api/dates/:id', [authJwt.verifyToken], controller.findAllByDater);

    app.get('/api/date/current/:id', [authJwt.verifyToken], controller.currentDate);

    app.patch('/api/date/:id', [authJwt.verifyToken], controller.isEnded);

    // app.get('/api/daters', [authJwt.verifyToken], controller.getDaters);
// 
    // app.get('/api/dater/:id', [authJwt.verifyToken], controller.getDater);
}