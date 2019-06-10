const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const AppSpecDocSchema = mongoose.Schema({
  projectID:{
    type: mongoose.Schema.ObjectId,
    required: true
  },
  userID:{
    type: mongoose.Schema.ObjectId,
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
  }
}
,{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

AppSpecDocSchema.virtual('AppSpecDocHistory', {
  ref: 'AppSpecDocHistory',
  localField: '_id',
  foreignField: 'docID'
})

module.exports = mongoose.model('appspecdocs', AppSpecDocSchema)