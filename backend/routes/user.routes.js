const { authJwt } = require('../middlewares');
const controller = require('../controllers/user.controller');

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/api/user', [authJwt.verifyToken], controller.userBoard);

    app.get('/api/moderator', [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard);

    app.get('/api/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);

    app.get('/api/daters', [authJwt.verifyToken], controller.getDaters);

    app.get('/api/dater/:id', [authJwt.verifyToken], controller.getDater);
}