const routes = require('express').Router();
const { resetSeq } = require('factory-girl');
const SessionsController = require('./app/controllers/SessionsController');
const authMiddleware = require("./app/middleware/auth")

routes.post('/sessions', SessionsController.store);

routes.use(authMiddleware);

routes.get('/dashboard', (req, res) => {
    return res.status(200).send();
});



module.exports = routes;
