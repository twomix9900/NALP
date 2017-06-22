var express = require('express')
var app = express();
var mongoose = require('mongoose')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var port = 3002 || proccess.env.PORT;
var path = require('path');
var dotenv = require('dotenv').config()
var userRoutes = require('./router/user_router.js');
var planRoutes = require('./router/plan_router.js');

mongoose.connect('mongodb://localhost/plan_a_day', function(err) {
  if (err) return console.log(err)
  console.log('connected to mongo shell');
})
// mongoose.connect(process.env.DB_URL, function (err) {
//   if (err){console.log('cant connect: ', err);}
//   console.log('connected to MLab')
// })

mongoose.connect(process.env.DB_URI, function(err) {
  if (err) return console.log(err)
  console.log('connected to mongo lab remote')
})

app.use('/', express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// route middleware
app.use('/users', userRoutes);
app.use('/plans', planRoutes);


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
})


app.listen(port, function(err) {
  if (err) return console.log(err)
  console.log('connected to server at port: ' + port);
})