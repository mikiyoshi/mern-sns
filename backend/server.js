const express = require('express');
const app = express();

const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

const PORT = 3000;

const mongoose = require('mongoose');

// import .env file
require('dotenv').config();

// connect Database
mongoose
  .connect(process.env.MONGOURL) // connect to mongoDB server
  // mongoDB > Database > connect > connect your application > Add your connection string into your application code > set up <password> and myFirstDatabase
  // <password> is your set up password
  // myFirstDatabase is you make original name
  .then(() => {
    console.log('connect Database');
  })
  .catch((err) => {
    console.log(err);
  });

// middleware
app.use(express.json());
app.use('/api/users', userRoute); // end point
app.use('/api/auth', authRoute); // end point
app.use('/api/posts', postRoute); // end point

// refactoring to middleware
// app.get('/', (req, res) => {
//   res.send('hello express');
// });

// refactoring to middleware
// app.get('/users', (req, res) => {
//   res.send('users express');
// });

app.listen(PORT, () => console.log('start server'));
