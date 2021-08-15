const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();
const morgan = require('morgan');
const auth = require('./routes/api/auth');
const user = require('./routes/api/user');
const customer = require('./routes/api/customer');


app.use(express.json());
// Db config
const db = config.mongoUri;

//connect mongodb
mongoose.connect(db,
    { useUnifiedTopology: true,
     useNewUrlParser: true,
     useCreateIndex: true  })
.then(()=>console.log('Connect Mongo Done!'))
.catch(err=>console.log(`error: ${err}`));
 

app.use(morgan('dev'));

app.use('/auth', auth);
app.use('/user', user);
app.use('/customer', customer);

// /Error handling
app.use((req, res, next) => {
    const error = new Error('Path Not Found');
    error.status = 404;
    next(error);
});

/* getting error caused and passed 
/ from above error handle and
/ passing it as response  */
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports = app;