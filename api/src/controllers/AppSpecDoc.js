const AppSpecDoc = require('../models/AppSpecDocs.model');
const AppSpecDocHistory = require('../models/AppSpecDocHistory.model.js');

var fs = require('fs');
var async = require('async');

exports.index = (req, res) => {
    const projectID = req.params.id;
    AppSpecDoc.find({projectID : projectID})
    .populate('AppSpecDocHistory', '', null, { sort: { 'createdAt': -1 } })
    .exec((err, details) => {
        if(err){
            res.send(err)
        }
        res.send(details)
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
    
            let newAppSpecDoc = new AppSpecDoc({
                projectID: req.body.projectID,
                specID:req.body.specID,
                documentName:req.files[index].originalname ,
                header:header  ,
                path: relPath.replace(/\\/g, '/')
            });
            newAppSpecDoc.save().then((response) => {
                console.log(response)
                let newAppSpecDocHistory = AppSpecDocHistory({
                    docID: response._id,
                    userID: req.body.userID,
                    userName: req.body.userName,
                    changeType: 'Created'
                })
                newAppSpecDocHistory.save()

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
    AppSpecDocHistory.deleteMany({docID: req.params.docID}).then(result =>{
        res.status(200).json({
            message: 'history deleted' 
        })
    })
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
        var oldPath = doc.path;
        var docName = oldPath.split(/[/ ]+/).pop();
        var newPath = "public/uploads/mobileprojects/documents/backups/" + docName;
        fs.rename(oldPath, newPath, function (err) {
            if(err){
                console.log(err)
            }
        });

        const path = require('path')
        const remove = path.join(__dirname, '..', '..', 'public')
        let file = req.file;
        let relPath = file.path.replace(remove, '')
        doc.documentName = req.file.originalname
        doc.path = relPath.replace(/\\/g, '/')
        doc.save((err, updatedInfo) => {
            if(err) {
              res.status(400).send(e)
            } else {
                let newAppSpecDocHistory = AppSpecDocHistory({
                    docID: req.params.docID,
                    userID: req.body.userID,
                    userName: req.body.userName,
                    path: newPath,
                    changeType: 'Updated'
                })
                newAppSpecDocHistory.save().then(() => {
                    AppSpecDocHistory.find({docID: req.params.docID})
                    .then(results => {
                        updatedInfo.AppSpecDocHistory = results
                        res.send(updatedInfo)
                    })
                })
            }
          })
    })
    .catch((err) => {
        console.log(err)
    })


    }
