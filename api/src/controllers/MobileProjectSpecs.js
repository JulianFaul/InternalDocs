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

exports.update = (req, res) => {

    ProjectSpec.findById({_id:req.params.specID}, (err, spec) => {
        if(req.body !== undefined) {
            spec.usedBy = req.body.usedBy,
            spec.devices =req.body.devices,
            spec.stores = req.body.stores,
            spec.generatedDoc = req.body.generatedDoc,
            spec.multiPricelist = req.body.multiPricelist,
            spec.multiPricelistDate = req.body.multiPricelistDate,
            spec.priceListDetails = req.body.priceListDetails,
            spec.setStatus = req.body.setStatus,
            spec.setStatusDate = req.body.setStatusDate,
            spec.setStatusDetails = req.body.setStatusDetails,
            spec.setRepsDate = req.body.setRepsDate,
            spec.maintenanceContactName = req.body.maintenanceContactName,
            spec.maintenanceContactEmail = req.body.maintenanceContactEmail,
            spec.quoteRequestDetails = req.body.quoteRequestDetails,
            spec.contactMeDetails = req.body.contactMeDetails,
            spec.specialComments = req.body.specialComments,
            spec.dueDate = req.body.dueDate
        }
        if(req.body.completed !== undefined) {
            spec.completed = req.body.completed
        }
        spec.save((e, updatedSpec) => {
          if(err) {
            res.status(400).send(e)
          } else {
            res.send(updatedSpec)
          }
        })
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
    const projectID = req.params.id
    ProjectSpec.deleteOne({projectID: projectID})
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