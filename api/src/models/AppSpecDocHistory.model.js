const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AppSpecDocHistorySchema = new Schema({
  docID:{
    type: mongoose.Schema.ObjectId,
    required: true
  },
  userID:{
    type: mongoose.Schema.ObjectId,
    required: true
  },
  path: {
    type: String
  },
  userName:{
    type: String,
    required: true
  },
  changeType: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('AppSpecDocHistory', AppSpecDocHistorySchema)

