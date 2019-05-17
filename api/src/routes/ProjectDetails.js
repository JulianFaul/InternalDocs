module.exports = (app) => {
    const multer = require('multer')
    const mkdirp = require('mkdirp')

    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            const dir = './public/uploads/pricelists'
            mkdirp(dir, err => cb(err, dir))
          },
        filename: function(req, file, cb) {
            cb(null, Date.now() + '_' + file.originalname.replace(/ /g,'').toLowerCase() )
        }
    })
    const upload = multer({storage})

    const controller = require('../controllers/ProjectDetails');

    app.route('/mobileProjects/:id/specs')
    .get(controller.index)
    .post(controller.create)

    app.route('/mobileProjects/:id/specs/:specID')
    .get(controller.showFiles)

  
}