const ProjectSpec = require('../models/MobileProjectSpecs.model.js');

exports.index = (req, res) => {
    ProjectSpec.findOne({projectID: req.params.id})
    .populate('appspecdocs')
    .exec((err, details) => {
        if(err){
            res.send(err)
        }
        res.send(details)
    })
}

exports.create = (req, res) => {
    if(!req.body){
        return res.status(400).send('Request body is missing');
    }
    console.log(req.body)
    let model = new ProjectSpec(req.body)
    model.projectID = req.params.id;
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
}

exports.showFiles = (req, res) => {
    ProjectSpec.findById(req.params.specID)
    .populate('appspecdocs')
    .exec((err, details) => {
        if(err){
            res.send(err)
        }
        res.send(details.pricelistdocuments)
    })
}

exports.destroy = (req, res) => {
    const specID = req.params.specID
    ProjectSpec.deleteOne({_id: specID})
        .then(result => {
           res.status(200).json({
               message: 'Project Specs has been deleted' 
           })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}



// IF i want to move documents to a backup folder
// upload(req,res,function(err) {
//     if(err) {
//         console.log(err);
//         return res.end("Error uploading file.");
//     } else {
//        console.log(req.body);
//        req.files.forEach( function(f) {
//          console.log(f);
//          // and move file to final destination...
//        });
//        res.end("File has been uploaded");
//     }
// });