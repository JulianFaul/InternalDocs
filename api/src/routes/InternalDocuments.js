module.exports = (app) => {
    const multer = require('multer')
    const mkdirp = require('mkdirp')

    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            const dir = './public/uploads/internalDocuments/'
            mkdirp(dir, err => cb(err, dir))
          },
        filename: function(req, file, cb) {
            // + path.extname(file.originalname)
            cb(null, Date.now() + '_' + file.originalname.replace(/ /g,'').toLowerCase() )
        }
    })

    const upload = multer({storage})
    const controller = require('../controllers/InternalDocuments')

    app.route('/internaldocuments/documents')
    .get(controller.index)
    .post(upload.single('file'), controller.create)

    app.route('/internaldocuments/documents/:id')
    .get(controller.show)
    .put(controller.update)
    .delete(controller.detroy)
}