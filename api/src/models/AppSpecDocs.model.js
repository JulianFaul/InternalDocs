const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AppSpecDocSchema = new Schema({
  projectID:{
    type: mongoose.Schema.ObjectId,
    required: true
  },
  specID:{
    type: mongoose.Schema.ObjectId,
    required: true
  },
  documentName:{
    type: String,
  },
  header:{
    type: String,
  },
  path: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
})

module.exports = mongoose.model('appspecdocs', AppSpecDocSchema)