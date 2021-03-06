module.exports = (app) => {
    const multer = require('multer')
    const mkdirp = require('mkdirp')

    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            const dir = './public/uploads/mobileprojects/specDocs'
            mkdirp(dir, err => cb(err, dir))
          },
        filename: function(req, file, cb) {
            cb(null, Date.now() + '_' + file.originalname.replace(/ /g,'').toLowerCase() )
        }
    })
    const upload = multer({storage})

    const controller = require('../controllers/MobileProjectSpecs');

    app.route('/mobileProjects/:id/specs')
    .get(controller.index)
    .post(controller.create)
    .delete(controller.destroy)

    app.route('/mobileProjects/:id/specs/:specID')
    .get(controller.showFiles)
    .put(controller.update)

  
}