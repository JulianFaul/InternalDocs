module.exports = function(app) {
    const cors = require('cors')
    const corsOptions = {
      origin: function(origin, callback) {
        // console.info(process.env.CORS_WHITELIST.split(' ').indexOf(origin) !== -1)
       
          callback(null, true)
       
      },
      methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    }
  
    const publicOptions = {
      origin: function (origin, callback) {
        callback(null, true)
      },
      methods: "GET"
    }
  
    app.options('*', cors(corsOptions))
    app.use(cors(corsOptions))
    app.use('/public', cors(publicOptions))
  }