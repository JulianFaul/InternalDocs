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
            doc.appDemo= req.body.appDemo,
            doc.appDevel= req.body.appDevel,
            doc.appLive= req.body.appLive,
            doc.appStaging= req.body.appStaging,
            doc.appStatus= req.body.appStatus,
            doc.appSubtitle= req.body.appSubtitle,
            doc.appTitle= req.body.appTitle,
            doc.appType= req.body.appType,
            doc.appVersion= req.body.appVersion,
            doc.country= req.body.country,
            doc.demoDate= req.body.demoDate,
            doc.demoLink= req.body.demoLink,
            doc.develDate= req.body.develDate,
            doc.develLink= req.body.develLink,
            doc.liveDate= req.body.liveDate,
            doc.liveLink= req.body.liveLink,
            doc.milestone= req.body.milestone,
            doc.priority= req.body.priority,
            doc.productType= req.body.productType,
            doc.stagingDate= req.body.stagingDate,
            doc.stagingLink= req.body.stagingLink
        }
        
        if(req.file){
            if(doc.path){
                fs.unlinkSync(doc.path);
                const path = require('path')
                const remove = path.join(__dirname, '..', '..', 'public')
                const relPath = req.file.path.replace(remove, '')
                doc.path = relPath.replace(/\\/g, '/')
                doc.iconName = req.file.originalname
            }else{
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