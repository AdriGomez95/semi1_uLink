const express = require('express');
const app = express();
var bodyParser = require('body-parser');  //............. NUEVO
const morgan = require('morgan'); 
const cors = require('cors'); //............. NUEVO
app.use(cors());  //............. NUEVO

//settings
app.set('port', process.env.PORT || 8080)

//------------------------------------------------------------------------------------ NUEVO
app.use(bodyParser.json());

app.use(cors({ origin: true, optionsSuccessStatus: 200 }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
//------------------------------------------------------------------------------------ FIN



//starting server
const pd = app.listen(app.get('port'), ()=>{
  console.debug(`Server on port ${app.get('port')}`)
})


//------------------------------------------------------------------------------------ NUEVO
const io = require("socket.io")(pd, 
  {  
      cors: {    origin: "http://localhost:3000",  }
  });


io.on("connection", (socket) => {
  //console.log('entro desde el front')
  
  socket.on("probando", (data)=>{
    console.log("estamos conectados")
    console.log(data)
  });
      
});
//------------------------------------------------------------------------------------ FIN





//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//Database Connection
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://ec2-18-215-159-161.compute-1.amazonaws.com/";

//routes
app.get('/', (req, res)=>{
    res.send('Hello World');
})

app.post('/signup', (req, res)=>{
    const { name, lastname, username, email, password, imgurl} = req.body;
    console.log('esto: ', req.body);
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
          db.close();
          if(result.length == 1){
            res.json(result[0])
          }else{
            res.json({"success": false})
          }
        });
      });
})


app.post('/userinfo', (req, res)=>{
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
 
app.get('/users/:usuario', (req, res)=>{
  const username = req.params.usuario;
  
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

app.get('/readPosts/:usuario', (req, res)=>{
  const username = req.params.usuario;

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


app.get('/requests/:usuario', (req, res)=>{
  const username = req.params.usuario; 
  
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("uLink");
    var query = { friend: username};
    dbo.collection("requests").find(query).toArray(function(err, result) {
      if (err) throw err;
      //console.log(result);
      db.close();  
      res.json(result)
    });
  });
})


app.get('/getFriends/:usuario', (req, res)=>{
  const username = req.params.usuario;
  
  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("uLink");
      var query = { username: username};
      dbo.collection("users").find(query).toArray(function(err, result) {
        if (err) throw err;
        db.close();
        if(result.length == 1){
          res.json(result[0].friends)
        }else{
          res.json({"success": false})
        }
      });
    });
})



