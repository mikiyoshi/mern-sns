const express = require('express');
const app = express();

const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const uploadRoute = require('./routes/upload');

const PORT = 5000;
// import axios in Frontend
// frontend/package.json setup
// "proxy": "http://localhost:5000/api/"

const mongoose = require('mongoose');

const path = require('path'); // this is a replace to backend localhost:5000 to frontend localhost:3000

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
app.use('/images', express.static(path.join(__dirname, 'public/images'))); // '/images'(REACT_APP_PUBLIC_FOLDER=http://localhost:5000/images) を見に行った時、静的なファイルの時は現在のディレクトリー(__dirname) プラス 'public/images' を参照する
// this is image root replace from frontend(.env file) to backend
// replace from REACT_APP_PUBLIC_FOLDER=http://localhost:3000/assets to REACT_APP_PUBLIC_FOLDER=http://localhost:5000/images
app.use(express.json());
app.use('/api/users', userRoute); // end point
app.use('/api/auth', authRoute); // end point
app.use('/api/posts', postRoute); // end point
app.use('/api/upload', uploadRoute); // end point

// refactoring to middleware
// app.get('/', (req, res) => {
//   res.send('hello express');
// });

// refactoring to middleware
// app.get('/users', (req, res) => {
//   res.send('users express');
// });

app.listen(PORT, () => console.log('start server'));
