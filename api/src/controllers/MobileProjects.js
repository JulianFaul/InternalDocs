const MobileProjectModel = require('../models/MobileProject.model');
var fs = require('fs');

exports.index = (req,res) => {
        MobileProjectModel.find({},(err, mobileProject) => {
            if(err){
                console.log(err)
            }
            res.json(mobileProject)
        })
    };

    
exports.show = (req, res) => {
    MobileProjectModel.findById(req.params.id,(err, mobileProject) => {
        if(err){
            console.log(err)
        }
        res.json(mobileProject)
    })
}

exports.create = (req, res) => {
        if(!req.body){
            return res.status(400).send('Request body is missing');
        }
        const path = require('path')
        const remove = path.join(__dirname, '..', '..', 'public')
        let model = new MobileProjectModel(req.body)
        
        if(req.file){
            const relPath = req.file.path.replace(remove, '')
            model.path = relPath.replace(/\\/g, '/')
            model.iconName = req.file.originalname
        }
        model.save()
            .then(doc => {
                if (!doc || doc.length === 0){
                    return res.status(404).send(doc);
                }
                res.status(201).send(doc)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    };

exports.update = (req,res) => {
    let id = req.params.id;
    MobileProjectModel.findById(id, (err,doc) => {
       
        if(req.body !== undefined) {
            if(req.body.appDevel){
                doc.appDevel= req.body.appDevel
            }
            if(req.body.appDemo){
                doc.appDemo= req.body.appDemo
            }
            if(req.body.appLive){
                doc.appLive= req.body.appLive
            }
            if(req.body.appStaging){
                doc.appStaging= req.body.appStaging
            }
            if(req.body.appStatus){
                doc.appStatus= req.body.appStatus
            }
            if(req.body.appSubtitle){
                doc.appSubtitle= req.body.appSubtitle
            }
            if(req.body.appTitle){
                doc.appTitle= req.body.appTitle
            }
            if(req.body.appType){
                doc.appType= req.body.appType
            }
            if(req.body.appVersion){
                doc.appVersion= req.body.appVersion
            }
            if(req.body.appVersion){
                doc.country= req.body.appVersion
            }
            if(req.body.demoDate){
                doc.demoDate= req.body.demoDate
            }
            if(req.body.demoLink){
                doc.demoLink= req.body.demoLink
            }
            if(req.body.develDate){
                doc.develDate= req.body.develDate
            }
            if(req.body.develLink){
                doc.develLink= req.body.develLink
            }
            if(req.body.liveDate){
                doc.liveDate= req.body.liveDate
            }
            if( req.body.liveLink){
                doc.liveLink= req.body.liveLink
            }
            if(req.body.milestone){
                doc.milestone= req.body.milestone
            }
            if(req.body.priority){
                doc.priority= req.body.priority
            }
            if(req.body.productType){
                doc.productType= req.body.productType
            }
            if(req.body.stagingDate){
                doc.stagingDate= req.body.stagingDate
            }
            if( req.body.stagingLink){
                doc.stagingLink= req.body.stagingLink
            }
        }
        
        if(req.file){
            if(doc.path){
                fs.unlinkSync(doc.path);
                const path = require('path')
                const remove = path.join(__dirname, '..', '..', 'public')
                const relPath = req.file.path.replace(remove, '')
                doc.path = relPath.replace(/\\/g, '/')
                doc.iconName = req.file.originalname
            }
            else{
                const path = require('path')
                const remove = path.join(__dirname, '..', '..', 'public')
                const relPath = req.file.path.replace(remove, '')
                doc.path = relPath.replace(/\\/g, '/')
                doc.iconName = req.file.originalname
            }
        }

        
        
        if(req.body.completed !== undefined) {
            doc.completed = req.body.completed
        }
        doc.save((e, updatedDoc) => {
          if(err) {
            res.status(400).send(e)
          } else {
            res.send(updatedDoc)
          }
        })
})     
};

exports.destroy = (req,res) => {
    const projectID = req.params.id
    MobileProjectModel.findById({_id: projectID})
        .then(project => {
            if(project.path){
              fs.unlinkSync(project.path);
            }
        MobileProjectModel.deleteOne({_id: projectID})
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