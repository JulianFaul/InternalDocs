const Document = require('../models/InternalDocuments.model')
var fs = require('fs');

exports.index = (req,res) => {
    Document.find({}, (err, document) => {
        if(err){
            res.send(err)
        }
        res.json(document)
    })
}

exports.show = (req,res) => {

    Document.findById({_id: req.params.id}, (err, document) => {
        if(err){
            res.send(err)
        }
        res.json(document)
    })
}

exports.create = (req,res) => {
    const path = require('path')
    const remove = path.join(__dirname, '..', '..', 'public')
    const relPath = req.file.path.replace(remove, '')
    const newDocument = new Document(req.body)
        newDocument.path = relPath.replace(/\\/g, '/')
        newDocument.document_name = req.file.originalname
        newDocument.save()
        .then((result) => {
            res.status(201).json({
                message: "Uploaded document successfully",
                newDocument
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
    
    }

exports.update = (req, res) => {
    Document.findById({_id: req.params.id})
    .then(document)
}

exports.detroy = (req, res) => {
    Document.findById({_id: req.params.id})
    .then(document => {
        fs.unlinkSync(document.path);
        Document.deleteOne({_id: document._id})
        .then(result => {
           res.status(200).json({
               message: 'Document deleted' 
           })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
    })
}
