const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const path = require('path');

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

const app = express();


mongoose.connect('mongodb+srv://sadiq:KszorR10J4yXQWoa@cluster0-m613z.mongodb.net/test?retryWrites=true&w=majority')
	.then(() => {
		console.log('connect successfully to MongoDB Atlas!')
	})
	.catch((error) => {
		console.log('Unable to connect to MongoDB Atlas')
		console.log('error', error)
	})

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
