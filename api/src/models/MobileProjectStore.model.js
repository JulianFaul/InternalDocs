const mongoose = require('mongoose');

let MobileProjectStoreSchema = new mongoose.Schema({
    projectID: {
        type: mongoose.Schema.ObjectId
    },
    appType: String,
    datePublished: String,
    dateSubmitted: String,
    devices: Array,
    nameOnStore: String,
    version: String,
    whatsnew: String,
    storeLink: String,
    createdAt:{type: Date, 'default': Date.now},
    tag:{
      type: String,
      'default': 'New'
    }
    
});



module.exports = mongoose.model('MobileProjectStore', MobileProjectStoreSchema);