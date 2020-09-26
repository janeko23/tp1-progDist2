const express = require('express');
const morgan = require('morgan');
const app = express();
const xmlparser = require("express-xml-bodyparser");
// settings
app.set('port', process.env.PORT || 4000);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(xmlparser());

// Routes
//app.use(require('./routes'));
app.use('/api/videoClub', require('./routes/videoClub'));

// 404 handler
app.use((req, res,  next) => {
    res.status(404).render('404');
});

module.exports = app;