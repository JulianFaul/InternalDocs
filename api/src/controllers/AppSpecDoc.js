const AppSpecDoc = require('../models/AppSpecDocs.model')
var fs = require('fs');
var async = require('async');

exports.index = (req, res) => {
    const detailsID = req.params.detailsID;
    AppSpecDoc.find({detailsID : detailsID}, (err, documents) => {
        if(err){
            res.send(err)
        }
        res.json(documents)
    })
}

exports.show = (req, res) => {
    const pricelistID = req.params.id;
    AppSpecDoc.findById(pricelistID, (err, documents) => {
        if(err){
            res.send(err)
        }
        res.json(documents)
    })
}

exports.create = (req,res) => {
  
    async.each(Object.keys(req.files), function(index, cb) {
        console.log(req.body)
        const path = require('path')
        const remove = path.join(__dirname, '..', '..', 'public')
        let file = req.files[index];
        let header = req.body.header[index];
        // const projectID = req.body.projectID[index];
        // const specID = req.body.specID[index];
        
        let relPath = file.path.replace(remove, '')
        let newAppSpecDoc = new AppSpecDoc(req.body);
        newAppSpecDoc.documentName = req.files[index].originalname
        newAppSpecDoc.header = header;
        newAppSpecDoc.path = relPath.replace(/\\/g, '/')
        newAppSpecDoc.document_name = file.originalname
        // newAppSpecDoc.projectID = projectID
        // newAppSpecDoc.specID = specID
        newAppSpecDoc.save()
        cb()
      }, (err, ret) => {
          console.log("done")
            res.send('documents uploaded')
      })
    
}

exports.destroy = (req, res) => {
    const pricelistID = req.params.id;
    PricelistDocument.findById({_id: pricelistID})
    .then(pricelistDocument => {
        fs.unlinkSync(pricelistDocument.path);
        PricelistDocument.deleteOne({_id: pricelistDocument._id})
        .then(result => {
           res.status(200).json({
               message: 'Pricelist document deleted' 
           })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
    })
}