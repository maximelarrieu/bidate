const { authJwt } = require('../middlewares');
const controller = require('../controllers/type.controller');

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    app.get('/api/types', controller.getTypes);

    app.get('/api/type/:id', controller.getType);
}