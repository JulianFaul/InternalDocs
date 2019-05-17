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
    const controller = require('../controllers/AppSpecDoc');

    app.route('/mobileProjects/:id/specfiles')
    .get(controller.index)
    .post(upload.array('documents', 5),controller.create)
   

    
    app.route('/pricelists/:id')
    .get(controller.show)
    .delete(controller.destroy)
}