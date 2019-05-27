const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MobileProjectSpecsSchema = new Schema({
  projectID: {
    type: mongoose.Schema.ObjectId
  },
  usedBy: Array,
  devices:Array,
  stores:Array,
  generatedDoc: String,
  multiPricelist: Boolean,
  multiPricelistDate: String,
  priceListDetails: String,
  setStatus: Boolean,
  setStatusDate: String,
  setStatusDetails:String,
  setRepsDate: String,
  maintenanceContactName: String,
  maintenanceContactEmail: String,
  quoteRequestDetails: Array,
  contactMeDetails: Array,
  specialComments:String,
  dueDate: String,
  createdAt: {
    type: Date,
    default: Date.new
  }
},{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

MobileProjectSpecsSchema.virtual('appspecdocs', {
  ref: 'appspecdocs',
  localField: '_id',
  foreignField: 'specID'
})

module.exports = mongoose.model('MobileProjectSpecs', MobileProjectSpecsSchema)

                