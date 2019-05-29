const StoreInfo = require('../models/MobileProjectStore.model.js');


exports.create = (req, res) => {
    if(!req.body){
        return res.status(400).send('Request body is missing');
    }
    StoreInfo.find({projectID: req.body.projectID},(err, storeInfo) => {
        if(err){
            console.log(err)
        }
        storeInfo.map((singleItem) => {
           if(req.body.appType === "Android" && singleItem.appType === "Android"){
                singleItem.tag = "Previous Version"
           }
           if(req.body.appType === "IOS" && singleItem.appType === "IOS"){
            singleItem.tag = "Previous Version"
            }
            singleItem.save();
        })
    })
    let newStoreInfo = new StoreInfo(req.body)
    newStoreInfo.projectID = req.body.projectID;
    newStoreInfo.save()
        .then(doc => {
            if (!newStoreInfo || newStoreInfo.length === 0){
                return res.status(404).send(newStoreInfo);
            }
            res.status(201).send(newStoreInfo)
        })
        .catch(err => {
            res.status(500).json(err)
        })
}


exports.index = (req, res) => {
    let projectID = req.params.id;
    StoreInfo.find({projectID: projectID},(err, storeInfo) => {
        if(err){
            console.log(err)
        }
        res.json(storeInfo)
    })
}

exports.destroySingle = (req, res) => {
    let storeinfoID = req.params.id;
    StoreInfo.deleteOne({_id: storeinfoID})
        .then(result => {
           res.status(200).json({
               message: 'Project Store info has been deleted' 
           })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.destroy = (req, res) => {
    let projectID = req.params.id;
    StoreInfo.deleteMany({ projectID: projectID})
    .then((result) => {
        res.status(200).json({
            message: 'All Store info has been deleted' 
        })
     })
     .catch(err => {
         res.status(500).json({
             error: err
         })
     })
}