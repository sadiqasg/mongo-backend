const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const userRoutes = require('./routes/user');
const courseRoutes = require('./routes/course');
const orderRoutes = require('./routes/order');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/auth', userRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/order', orderRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/', (req, res) => {
	res.json({
		status: 200,
		message: 'saslearn api'
	})
})

module.exports = app;
