const mongoose = require('mongoose');

let MobileProjectInfoSchema = new mongoose.Schema({
    projectID: {
        type: mongoose.Schema.ObjectId
    },
    url:        String,
    username:   String,
    password:   String,
    createdAt:{
        type: Date,
        default: Date.now
      }
});



module.exports = mongoose.model('MobileProjectInfo', MobileProjectInfoSchema);