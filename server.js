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
var http = require('http')
var fetch = require('node-fetch');
var activityRoutes = require('./router/activity_router.js');


// mongoose.connect('mongodb://localhost/plan_a_day', function(err) {
//   if (err) return console.log(err)
//   console.log('connected to mongo shell');
// })

mongoose.connect(process.env.DB_URL, function (err) {
  if (err){console.log('cant connect: ', err);}
  console.log('connected to MLab')
})

app.use('/', express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function(req, res, next){
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "Options") {
        res.send(200);
    } else {
        return next();
    }
})


// route middleware
app.use('/users', userRoutes);
app.use('/plans', planRoutes);
app.use('/activities', activityRoutes);


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
})


app.post('/yelpapi', function(req, res) {
  fetch('https://api.yelp.com/v3/businesses/search?term=' + req.body.search_term + '&location=' + req.body.search_location, {
    method: 'GET',
    headers: { "Authorization": "Bearer " + process.env.yelpToken},
    body: '{}'
  }).then(function(response) {
    // console.log(response, '< response')
    return response.json();
  }).then(function(res_json) {
    // console.log(res_json, '< json') // to send to client
    res.json({success: true, message: 'auto search results', results: res_json});
  })
})


app.listen(port, function(err) {
  if (err) return console.log(err)
  console.log('connected to server at port: ' + port);
})