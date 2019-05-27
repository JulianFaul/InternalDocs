export default {
    setMobileProjects (state, payload) {
        state.loadedMobileProjects = payload
      },
    createMobileProject(state, payload) {
      state.loadedMobileProjects.push(payload)
    },
    updateMobileProject(state, payload){
      
      let singleMobileProject = state.loadedMobileProjects.find(mobileProject => {
        
        return mobileProject.id === payload.projectID
      })
     
      if(payload.appTitle){
        singleMobileProject.appTitle = payload.appTitle
      }
      if(payload.appSubtitle){
        singleMobileProject.appSubtitle = payload.appSubtitle
      }
      if(payload.appVersion){
        singleMobileProject.appVersion = payload.appVersion
      }
      if(payload.country){
        singleMobileProject.country = payload.country
      }
      if(payload.appType){
        singleMobileProject.appType = payload.appType
      }
      if(payload.productType){
        singleMobileProject.productType = payload.productType
      }
      if(payload.priority){
        singleMobileProject.priority = payload.priority
      }
      if(payload.appLive){
        singleMobileProject.appLive = payload.appLive
      }
      if(payload.appDemo){
        singleMobileProject.appDemo = payload.appDemo
      }
      if(payload.appStaging){
        singleMobileProject.appStaging = payload.appStaging
      }
      if(payload.appDevel){
        singleMobileProject.appDevel = payload.appDevel
      }
      if(payload.liveDate){
        singleMobileProject.liveDate = payload.liveDate
      }
      if(payload.demoDate){
        singleMobileProject.demoDate = payload.demoDate
      }
      if(payload.stagingDate){
        singleMobileProject.stagingDate = payload.stagingDate
      }
      if(payload.develDate){
        singleMobileProject.develDate = payload.develDate
      }
      if(payload.milestone){
        singleMobileProject.milestone = payload.milestone
      }
      if(payload.appStatus){
        singleMobileProject.appStatus = payload.appStatus
      }
      if(payload.liveLink){
        singleMobileProject.liveLink = payload.liveLink
      }
      if(payload.demoLink){
        singleMobileProject.demoLink = payload.demoLink
      }
      if(payload.stagingLink){
        singleMobileProject.stagingLink = payload.stagingLink
      }
      if(payload.develLink){
        singleMobileProject.develLink = payload.develLink
      }
      if(payload.iconPath){
        singleMobileProject.iconPath = payload.iconPath
      }
    },
    deletemobileProject(state, payload){
      const mobileprojects = state.loadedMobileProjects;
      mobileprojects.splice(mobileprojects.findIndex(currentProject => currentProject.id === payload), 1)
    }
}