module.exports = (app) => {
    
    const controller = require('../controllers/MobileProjectMeetingNote');

    app.route('/mobileProjects/:id/meetingNote')
 
    .post(controller.create)
    .get(controller.index)

    // app.route('/mobileProjects/:id/info/:infoID')
    // .put(controller.update)
    
}