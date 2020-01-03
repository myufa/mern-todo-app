var express = require("express"); var app = express();
var mongoose = require("mongoose");
var body_parser = require("body-parser");
var cors = require("cors");

app.use(cors());
app.use(body_parser.json());

var port = 4000;

app.get('/', (req, res)=>{
    res.send("hi");
});

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});