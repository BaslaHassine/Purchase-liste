var express = require('express');
var bodyParser = require('body-parser');

var db = require('../database-mysql');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

////////////////////////////////////////////////////////
// ****** Admin/Items Methods *******
app.get('/items', (req, res)=> {
  db.getIems((err, items)=> {
    err ? console.log(err) : res.status(200).json(items)});
});

app.post('/items', (req, res)=> {
  db.addItem(req.body, (err, result)=> {
    err ? console.log(err) : res.status(201).send(result)});
});

app.patch('/items/:itemID', (req, res)=> {
  db.setPrice(req.params.itemID, req.body.price, (err, result)=> {
    err ? console.log(err) : res.status(200).send(result)});
});

app.delete('/items/:itemID', (req, res)=> {
  db.dropItem(Number(req.params.itemID), (err, result)=> {
    err ? console.log(err) : res.status(200).send(result)});
});

// ****** Admin/Users Methods *******
app.get('/users', (req, res)=> {
  db.getUsers((err, users)=> {
    err ? console.log(err) : res.status(202).json(users)});
});

app.post('/users', (req, res)=> {
  db.addUser(req.body.firstname, req.body.lastname, (err, result)=> {
    err ? console.log(err) : res.status(201).send(result)});
});

app.delete('/users/:userID', (req, res)=> {
  db.deleteUser(Number(req.params.userID), (err, result)=> {
    err ? console.log(err) : res.status(200).send(result)});
});

// ****** history Methods *******
app.get('/purchases', (req, res)=> {
  db.getHistory((err, result)=> {
    err ? console.log(err) : res.status(200).json(result)});
});

app.post('/purchases', (req, res)=> {
  db.addPurchase(req.body, (err, result)=> {
    err ? console.log(err) : res.status(201).send(result)});
});

////////////////////////////////////////////////////////

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

