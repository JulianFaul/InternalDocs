const mongoose = require('mongoose');

const internalDocumentSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    division: {
        type: String,
        required: true
    },
    platform: {
        type: String,
        required: true
    },
    document_name:{
        type: String,
        required: true
    },
    document_type:{
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Document', internalDocumentSchema);