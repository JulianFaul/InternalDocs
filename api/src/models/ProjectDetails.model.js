const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectDetailsSchema = new Schema({
  projectID: {
    type: mongoose.Schema.ObjectId
  },
  title:{
    type: String
  },
  usedBy: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.new
  }
},{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

ProjectDetailsSchema.virtual('appspecdocs', {
  ref: 'appspecdocs',
  localField: '_id',
  foreignField: 'specID'
})

module.exports = mongoose.model('ProjectDetails', ProjectDetailsSchema)