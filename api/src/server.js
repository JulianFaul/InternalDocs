const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/data',{ useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req,res,next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body);
    next();
})


// ROUTES
let personRoute = require('./routes/person');
app.use(personRoute);

let customerRoute = require('./routes/customer');
app.use(customerRoute);


app.use(express.static('public'));
// Handler for 404 - Resource not found
app.use((req,res,next) => {
    res.status(404).send('We think you are lost!');
});

// Handler for 500 - Error 500
app.use((err,req,res,next) => {
    console.error(err.stack)
    res.sendFile(path.join(__dirname,'../public/500.html'))
});

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