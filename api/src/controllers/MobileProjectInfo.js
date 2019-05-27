const MobileProjectInfo = require('../models/MobileProjectInfo.model');


exports.index = (req, res) => {
    console.log(req.params)
    MobileProjectInfo.findOne({projectID: req.params.id}, (err, projectInfo) => {
        if(err){
            return res.status(404).send(projectInfo);
        }
        res.json(projectInfo)
    })
}

exports.create = (req, res) => {
    const newMobileProjectInfo = new MobileProjectInfo(req.body)
    newMobileProjectInfo.projectID = req.params.id
    newMobileProjectInfo.save()
    .then(projectInfo => {
        if (!projectInfo || projectInfo.length === 0){
            return res.status(404).send(projectInfo);
        }
        res.status(201).send(projectInfo)
    })
    .catch(err => {
       res.status(500).json(err)
    })
}

exports.update = (req, res) => {
    MobileProjectInfo.findById({_id:req.params.infoID}, (err, info) => {
        if(req.body !== undefined) {
            if(req.body.url){
                info.url = req.body.url;
            }
            if(req.body.username){
                info.username = req.body.username;
            }
            if(req.body.password){
                info.password = req.body.password;
            }
            
        }
        if(req.body.completed !== undefined) {
            info.completed = req.body.completed
        }
        info.save((e, updatedInfo) => {
            if(err) {
              res.status(400).send(e)
            } else {
              res.send(updatedInfo)
            }
          })
    })
}

exports.destroy = (req,res) => {
    const projectID = req.params.id
     MobileProjectInfo.deleteOne({projectID: projectID})
        .then(result => {
            res.status(200).json({
                message: 'Info deleted' 
                })
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })
}