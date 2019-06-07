const AppSpecDoc = require('../models/AppSpecDocs.model')
var fs = require('fs');
var async = require('async');

exports.index = (req, res) => {
    console.log("GETTING DOX")
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
    let docs = [];
    async.each(Object.keys(req.files), function(index, cb) {
        const path = require('path')
        const remove = path.join(__dirname, '..', '..', 'public')
        let file = req.files[index];
        let header = req.body.header[index];
        let relPath = file.path.replace(remove, '')
        // let newAppSpecDoc = new AppSpecDoc(req.body);
        //     newAppSpecDoc.documentName = req.files[index].originalname
        //     newAppSpecDoc.header = header;
        //     newAppSpecDoc.path = relPath.replace(/\\/g, '/')
        //     newAppSpecDoc.document_name = file.originalname
            let newAppSpecDoc = new AppSpecDoc({
                projectID: req.body.projectID,
                historyAuthor:req.body.userID,
                specID:req.body.specID,
                documentName:req.files[index].originalname ,
                header:header  ,
                path: relPath.replace(/\\/g, '/')
            });
            


            newAppSpecDoc.save().then((response) => {
                console.log(response)
                docs.push(response)
                cb()
            })
            .catch((err) => {
                console.log(err)
            })
        
      }, (err, ret) => {
          
          console.log("done")
            res.send(docs)
      })
    
}

exports.destroy = (req, res) => {
    AppSpecDoc.findById({_id: req.params.docID})
    .then(document => {
        fs.unlinkSync(document.path);
        AppSpecDoc.deleteOne({_id: document._id})
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

exports.destroyAll = (req, res) => {
    const projectID = req.body.projectID;
    AppSpecDoc.find({projectID : projectID}, (err, documents) => {
        if(err){
            res.send(err)
        }
        if(documents.length){
            for(var key in documents){
                if(documents[key].path){
                    let documentPath = documents[key].path;
                    fs.unlinkSync(documentPath);
                }
            }
        }
        AppSpecDoc.deleteMany({projectID: projectID}).then((result) => {
            res.status(200).json({
                message: 'documents deleted'
            })
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            })
        })
    })
}


exports.update = (req, res) => {
    
    AppSpecDoc.findById(req.params.docID)
    .then((doc) => {
        doc.documentName = req.file.originalname
        doc.save()
    })
    .catch((err) => {
        console.log(err)
    })


    }
