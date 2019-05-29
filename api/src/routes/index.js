module.exports = function(app) {
    const MobileProjects = require('./MobileProjects')
    const InternalDocuments = require('./InternalDocuments')
    const MobileProjectSpecs = require('./MobileProjectSpecs')
    const MobileProjectInfo = require('./MobileProjectInfo')
    const MobileProjectStoreInfo = require('./MobileProjectStoreInfo')
    const AppSpecDocs = require('./AppSpecDocs')
    MobileProjects(app)
    InternalDocuments(app)
    MobileProjectSpecs(app)
    AppSpecDocs(app)
    MobileProjectInfo(app)
    MobileProjectStoreInfo(app)
}