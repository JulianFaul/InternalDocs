module.exports = (app) => {
    
    const controller = require('../controllers/MobileProjectStoreInfo');

    app.route('/mobileProjects/:id/storeinfo')
    .get(controller.index)
    .post(controller.create)
    .delete(controller.destroy)

    app.route('/storeinfo/:id')
    .delete(controller.destroySingle)
    
}