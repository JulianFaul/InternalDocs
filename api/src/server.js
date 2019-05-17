require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes')
const cors = require('./cors')


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/data',{ useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});


app.use('/public', express.static('public'));

cors(app)
routes(app)




// // Handler for 404 - Resource not found
// app.use((req,res,next) => {
//     res.status(404).send('We think you are lost!');
// });
// // Handler for 500 - Error 500
// app.use((err,req,res,next) => {
//     console.error(err.stack)
//     res.sendFile(path.join(__dirname,'../public/500.html'))
// });


const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
    console.info('Server up on 3003...');
})

// const server    = '';
// const database  = '';
// const user      = '';
// const password  = '';

// mongoose.connect(`mongodb://${user}:${password}@${server}/${database}`, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
// });


