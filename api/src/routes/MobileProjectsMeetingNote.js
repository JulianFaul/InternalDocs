module.exports = (app) => {
    const multer = require('multer')
    const mkdirp = require('mkdirp')

    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            const dir = './public/uploads/mobileprojects/meetingNotes'
            mkdirp(dir, err => cb(err, dir))
          },
        filename: function(req, file, cb) {
            // + path.extname(file.originalname)
            cb(null, Date.now() + '_' + file.originalname.replace(/ /g,'').toLowerCase() )
        }
    })
    const upload = multer({storage})
    const controller = require('../controllers/MobileProjectMeetingNote');

    app.route('/mobileProjects/:id/meetingNote')
    .post(upload.array('documents'), controller.create)
    .get(controller.index)
    .delete(controller.destroy)

    app.route('/mobileProjects/:id/meetingNote/:meetingNoteID')
    .put(controller.update)
    .delete(controller.deleteSingle)
    
}