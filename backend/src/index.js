const express = require('express');
const app = express();
const morgan = require('morgan');

const cors = require('cors');
app.use(cors());


//settings
app.set('port', process.env.PORT || 8080)

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//Database Connection
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://ec2-35-174-172-210.compute-1.amazonaws.com/?tls=false";

//routes
app.get('/', (req, res)=>{
    res.send('Hello World');
})

app.post('/signup', (req, res)=>{
    const { name, lastname, username, email, password, imgurl} = req.body;
    
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("uLink");
        var myobj = { name: name, lastname:lastname, username:username, email:email, password:password, url:imgurl, bot:"false", friends: []};
        dbo.collection("users").insertOne(myobj, function(err, result) {
          if (err) throw err;
          console.log(myobj)
          console.log("User Registered");
          db.close();
          res.json({"success": true})
        });
      });
})

app.post('/login', (req, res)=>{
    const {username, password} = req.body;
    
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("uLink");
        var query = { username: username, password:password };
        dbo.collection("users").find(query).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          db.close();
          if(result.length == 1){
            res.json(result[0])
          }else{
            res.json({"success": false})
          }
        });
      });
})


app.get('/userinfo', (req, res)=>{
  const {username} = req.body;
  
  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("uLink");
      var query = { username: username };
      dbo.collection("users").find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
        if(result.length == 1){
          res.json(result[0])
        }else{
          res.json({"success": false})
        }
      });
    });
})


app.put('/update', (req, res)=>{
  const {name, lastname, username, imgurl, bot, actualusername} = req.body;
  
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("uLink");
    var myquery = { username: actualusername };
    var newvalues = { $set: {name: name, lastname:lastname, username:username, url:imgurl, bot:bot } };
    dbo.collection("users").updateOne(myquery, newvalues, function(err, result) {
      if (err) throw err;
      console.log("User Updated");
      res.json({"success": true})
      db.close();
    });
  });
})

app.get('/users', (req, res)=>{
  const {username} = req.body;
  
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("uLink");
    dbo.collection("users").find({friends: {$nin: [username]}}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
      res.json(result)
    });
  });
})

app.post('/request', (req, res)=>{
  const {user, friend} = req.body;
  
  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("uLink");
      var myobj = { user: user, friend:friend, state:"pending"};
      dbo.collection("requests").insertOne(myobj, function(err, result) {
        if (err) throw err;
        console.log(myobj)
        console.log("Request Sent");
        db.close();
        res.json({"success": true})
      });
    });
})


app.put('/answer', (req, res)=>{
  const {user, friend, answer} = req.body;
  
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("uLink");
    var myquery = { user:user, friend:friend };
    var newvalues = { $set: {state:answer} };
    dbo.collection("requests").updateOne(myquery, newvalues, function(err, result) {
      if (err) throw err;
      db.close();
    });
  });
  if (answer == "acepted"){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("uLink");
      var myquery = { username:user};

      var newvalues = { $push: {friends:friend} };
      dbo.collection("users").updateOne(myquery, newvalues, function(err, result) {
        if (err) throw err;
        db.close();
      });
    });

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("uLink");
      var myquery = { username:friend};

      var newvalues = { $push: {friends:user} };
      dbo.collection("users").updateOne(myquery, newvalues, function(err, result) {
        if (err) throw err;
        db.close();
      });
    });
  }
  res.json({"answer": answer})
})


app.post('/createPost', (req, res)=>{
  const {author, contents, date, tags} = req.body;
  
  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("uLink");
      var today = new Date()
      var now = today.toLocaleDateString()
      var myobj = { author:author, contents:contents, date:today, tags:tags};
      dbo.collection("posts").insertOne(myobj, function(err, result) {
        if (err) throw err;
        console.log(myobj)
        console.log("Post Created");
        db.close();
        res.json({"success": true})
      });
    });
})

app.get('/readPosts', (req, res)=>{
  const {username} = req.body;

  var friends = []

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("uLink");
    dbo.collection("users").findOne({username:username}, function(err, result) {
      if (err) throw err;
      friends = result.friends;
      db.close();
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("uLink");
        console.log(friends);
        dbo.collection("posts").find({author: {$in: friends}},{author:username}).sort({date:-1}).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          db.close();
          res.json(result)
        });
      });
    });
  });

})


//starting server
app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`)
})