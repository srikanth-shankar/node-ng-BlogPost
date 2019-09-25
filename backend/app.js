const express = require('express');
const mongoose = require('mongoose');
const app = express();
mongoose.connect('mongodb+srv://sri:0BlLDZZTDwIwYKjk@cluster0-m6hr7.mongodb.net/blog-post?retryWrites=true&w=majority')
  .then(()=>{
    console.log('connected to mongodb');
  })
  .catch((err)=>{
    console.log(`connection failed ${err}`);
  });
const bodyParser = require('body-parser');
const Post = require('./models/post');

app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, content-type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
})

app.use(bodyParser.json());

app.get('/api/posts', (req, res, next) => {
  Post.find()
      .then((docs)=>{
        res.status(200).json({
          message:'posts fetched succesgully',
          posts: docs
        });
      })
});

app.post('/api/posts', (req, res, next)=>{
  const post = new Post({title: req.body.title, content: req.body.content});
  post.save().then((x)=>{
    res.status(201).json({message: 'post created sucesfuly', id: x._id});
  });
});

app.delete('/api/posts/:id', (req, res, next)=>{
  Post.deleteOne({_id: req.params.id}).then((x)=>{
    console.log(x);
  })
  res.status(200).json({message: 'post deleted successfully'});
})

module.exports = app;
