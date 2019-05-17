module.exports = function(app) {
    const MobileProjects = require('./MobileProjects')
    const InternalDocuments = require('./InternalDocuments')
    const ProjectDetails = require('./ProjectDetails')
    const AppSpecDocs = require('./AppSpecDocs')
    MobileProjects(app)
    InternalDocuments(app)
    ProjectDetails(app)
    AppSpecDocs(app)
}