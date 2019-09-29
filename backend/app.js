const express = require('express');
const mongoose = require('mongoose');
const app = express();
const postRoutes = require('../backend/routes/posts.routes');
const bodyParser = require('body-parser');

mongoose.connect('mongodb+srv://sri:0BlLDZZTDwIwYKjk@cluster0-m6hr7.mongodb.net/blog-post?retryWrites=true&w=majority')
  .then(()=>{
    console.log('connected to mongodb');
  })
  .catch((err)=>{
    console.log(`connection failed ${err}`);
  });


app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, content-type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
})

app.use('/api/posts', postRoutes);

app.use(bodyParser.json());

module.exports = app;
