module.exports = (app) => {
    const multer = require('multer')
    const mkdirp = require('mkdirp')

    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            const dir = './public/uploads/mobileprojects/logos'
            mkdirp(dir, err => cb(err, dir))
          },
        filename: function(req, file, cb) {
            // + path.extname(file.originalname)
            cb(null, Date.now() + '_' + file.originalname.replace(/ /g,'').toLowerCase() )
        }
    })
    const controller = require('../controllers/MobileProjects');
    const upload = multer({storage})
    app.route('/mobileProjects')
        .get(controller.index)
        .post(upload.single('file'), controller.create)
    
    app.route('/mobileProjects/:id')
        .get(controller.show)
        .put(upload.single('file'), controller.update)
        .delete(controller.destroy)
}
