const mongoose = require('mongoose');

let MobileProjectSchema = new mongoose.Schema({
    appTitle:       String,
    appSubtitle:    String,
    appVersion:     String,
    country:        String,
    appType:        String,
    productType:    String,
    priority:       String,
    appLive:        Boolean,
    appDemo:        Boolean,
    appStaging:     Boolean,
    appDevel:       Boolean,
    liveDate:       String,
    demoDate:       String,
    stagingDate:    String,
    develDate:      String,
    milestone:      String,
    appStatus:      String,
    liveLink:       String,
    demoLink:       String,
    stagingLink:    String,
    develLink:      String,
    path:           String,
    iconName:       String
});



module.exports = mongoose.model('MobileProject', MobileProjectSchema);

// {
//     toJSON: {virtuals :true},
//     toObject: {virtuals: true}
// });

// MobileProjectSchema.virtual('pricelistdocuments', {
//     ref: 'pricelistdocuments',
//     localField : '_id',
//     foreignField: 'projectID' 
// });