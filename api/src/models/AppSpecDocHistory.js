const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AppSpecDocHistorySchema = new Schema({
  projectID: {
    type: mongoose.Schema.ObjectId
  },
  userID:{
    type: mongoose.Schema.ObjectId
  },
  firstUploadDate:{
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.new
  }
})

module.exports = mongoose.model('AppSpecDocHistory', AppSpecDocHistorySchema)

                