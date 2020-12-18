const express = require('express');
const cors = require('cors');
const exjwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const mongoDBClient = require("mongodb").MongoClient;
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const budgetDataModel = require('./models/budgetData_scheme.js');
const Users_scheme = require('./models/Users_scheme.js');
let url = "mongodb+srv://Neeraj:P%40ssw0rd%40123%40@cluster0.jau2d.mongodb.net/test";
const app = express();
const port = 3000;
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://134.122.122.180:3000");
    res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
    next();
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use('/',express.static('public'))
var Chart1Data = {}
var Chart2Data = {}

const secretKey = "My Super Key";
const jwtMW = exjwt({
  secret: secretKey,
  algorithms: ["HS256"],
});
let users = [];

app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    mongoDBClient.connect(url,{ useUnifiedTopology: true },(operationError, dbHandler) => {
      if (operationError) {
      console.log("Error");
      } else {
      console.log("Logging User In");
      dbHandler.db("test").collection("Users").find(
          {username:username},
        {password:password}
      ).toArray((operr, opresult) => {
          if (operr) {
              console.log(operr);
          }
          else
          {
              users= opresult;
              console.log(users);
              if (username == users[0].username && password == users[0].password) {
                let token = jwt.sign(
                  { username: users[0].username },
                  secretKey,
                  { expiresIn: "3m" }
                );
                res.status(200).json({
                  success: true,
                  err: null,
                  token,
                });
              } else {
                res.status(401).json({
                  success: false,
                  err: "Username or Password is incorrect",
                  token: null,
                });
              }
          }
              dbHandler.close();
        });
      }
  });
  });
  
  app.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedError") {
      res.status(401).json({
        success: false,
        officialError: err,
        err: "Username or Password is incorrect 2",
      });
    } else {
      next(err);
    }
  });

  app.get('/api/logout', (req, res) => {
    users = [];
  });

app.post("/api/verify", (req, res) => {
  console.log("Verifying Token");
  const { token } = req.body;
  try{
    var decoded = jwt.verify(token,secretKey);
    res.status(200).json(decoded);
  }catch(err){
    res.status(401).send("Token Expired");
  }
});

app.get('/budget', (req, res) => {
    
    mongoDBClient.connect(url,{ useUnifiedTopology: true },(operationError, dbHandler) => {
        if (operationError) {
        console.log("Error");
        } else {
        console.log("Getting BudgetData");
        console.log(typeof users[0]);
        if (typeof users[0] !== 'undefined')
        {
          dbHandler.db("test").collection("budgetData").find({username:users[0].username}).toArray((operr, opresults) => {
            if (operr) {
                console.log(operr);
            }
            else
            {
                dbHandler.db("test").collection("budgetData").aggregate(
                  [{ $match: { "username": users[0].username } },
                  {$group: {_id: "$month", "totalExpense": {$sum: "$expense"},"totalBudget": {$sum: "$budget"} }}]
                  ).toArray((operr, opresult) => {
                  if (operr) {
                    console.log(operr);
                  }
                  else
                  {
                    console.log(opresult);
                    Chart2Data=opresult;
                    Chart1Data= opresults;
                    // console.log(json);
                    res.status(200).json({Chart1Data:Chart1Data,Chart2Data:Chart2Data, UserName: users[0].username});
                    dbHandler.close();               
                  }
                });
            }
            });
        }
        else{
          res.status(400).send("User not logged in!");
        }
        }
    });
});

app.post('/budget/add', (req,res) => { 
    mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true} )
        .then(()=> {
            console.log(req.body);
            let data = new budgetDataModel(req.body);
            budgetDataModel.insertMany(data)
                      .then((data) =>{
                          console.log(data);
                          res.status(200).send("Data inserted Successfully");
                          mongoose.connection.close();
                      })
                      .catch((connectionError) =>{
                          console.log(connectionError);
                          res.status(400).send();
                      })
        })
        .catch((connectionError) => {
            console.log(connectionError);
            res.status(400).send();
        })
});

app.post('/budget/update', (req,res) => { 
  mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true} )
      .then(()=> {
        console.log("Updating the Document");
          console.log(req.body);
          let dataTOUpdate = {$set:{
            title: req.body.title,
            budget: req.body.budget,
            color: req.body.color,
            expense: req.body.expense,
            month: req.body.month
            }};
          budgetDataModel.updateMany({_id:req.body.id},dataTOUpdate)
                    .then((data) =>{
                      console.log("Update done");
                        console.log(data);
                        res.status(200).send("Data inserted Successfully");
                        mongoose.connection.close();
                    })
                    .catch((connectionError) =>{
                        console.log(connectionError);
                        res.status(400).send();
                    })
      })
      .catch((connectionError) => {
          console.log(connectionError);
          res.status(400).send();
      })
});

app.post('/budget/delete', (req,res) => {
    try {
        mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true} )
        .then(()=> {
            console.log("Deleting Data");
            console.log(req)
            budgetDataModel.deleteOne({_id: req.body.id })
                .then((data) =>{
                    //console.log(data);
                    res.send(data);
                    mongoose.connection.close();
                })
                .catch((connectionError) =>{
                    console.log(connectionError);
                })
        })
        .catch((connectionError) => {
            console.log(connectionError);
        })
    } catch (error) {
        console.log(error);
        res.status(400).send();
    }
    
})

app.post('/api/signup', (req,res) => { 
  console.log("Signing Up");
  // res.status(200).send();
  mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true} )
      .then(()=> {
          console.log(req.body);
          let data = new Users_scheme(req.body);
          Users_scheme.insertMany(data)
                    .then((data) =>{
                        console.log(data);
                        res.send("User Signed Up Successfully");
                        mongoose.connection.close();
                    })
                    .catch((connectionError) =>{
                        console.log(connectionError);
                        let ExistingUser=data.username;
                        res.status(400).send(ExistingUser + " is already been taken. Please select another username.");
                    })
      })
      .catch((connectionError) => {
          console.log(connectionError);
          res.status(400).send();
      })
});
app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`);
});