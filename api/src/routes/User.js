module.exports = (app) => {
    
    const controller = require('../controllers/User');

    app.route('/user')
    .get(controller.index)
    .post(controller.create)

    app.route('/user/:userId')
    .put(controller.update)
    .delete(controller.destroy)

    app.route('/login')
    .post(controller.login)
    
}