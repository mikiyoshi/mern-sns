const router = require('express').Router();

// import from User.js
const User = require('../models/User');

// register / test at postman RealSns USER REGISTER
router.post('/register', async (req, res) => {
  try {
    // mongoose Document at Models Constructing Documents
    // https://mongoosejs.com/docs/models.html#constructing-documents
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    const user = await newUser.save();
    return res.status(200).json();
  } catch (err) {
    return res.status(500).json(err); // .status(500) is server error
  }
});

// login / test at postman RealSns USER LOGIN
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send('User not find');

    const vailedPassword = req.body.password === user.password; // this password is not secure, we need bcrypt hash
    // bcrypt hash // password security
    // https://qiita.com/tatsumi44/items/83ac5c18f213e22ed322
    // https://www.npmjs.com/package/bcrypt
    if (!vailedPassword) return res.status(400).json('Password is wrong');

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err); // .status(500) is server error
  }
});

// this is connect test
// router.get('/', (req, res) => {
//   res.send('auth router');
// });

module.exports = router;
