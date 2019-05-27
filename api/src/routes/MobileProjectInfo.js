module.exports = (app) => {
    
    const controller = require('../controllers/MobileProjectInfo');

    app.route('/mobileProjects/:id/info')
    .get(controller.index)
    .post(controller.create)
    .delete(controller.destroy)

    app.route('/mobileProjects/:id/info/:infoID')
    .put(controller.update)
    
}