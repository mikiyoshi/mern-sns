const router = require('express').Router();

// import from User.js
const User = require('../models/User');

// CRUD / Create, Read, Update, Delete = GET(edit), POST(create), PATCH(update), DELETE(delete)

// User Update / test at postman RealSns UPDATE USER
router.put('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    // this is user account check, res.params.id = /:id, req.body.isAdmin = admin
    try {
      // mongoose Document at .findByIdAndUpdate
      // https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
        // $set is all parameter from UserSchema of models/User.js
      });
      res.status(200).json('Update user information');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json('You can update only your account');
  }
});

// User Delete / test at postman RealSns DELETE USER
router.delete('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    // this is user account check, lores.params.id = /:id, req.body.isAdmin = admin
    try {
      // mongoose Document at .findByIdAndDelete
      // https://mongoosejs.com/docs/api.html#model_Model.findByIdAndDelete
      const user = await User.findByIdAndDelete(req.params.id, {
        $set: req.body,
        // $set is all parameter from UserSchema of models/User.js
      });
      res.status(200).json('Delete user information');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json('You can delete only your account');
  }
});

// User Read / test at postman RealSns GET USER
router.get('/:id', async (req, res) => {
  try {
    // mongoose Document at .findById
    // https://mongoosejs.com/docs/api.html#model_Model.findById
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc; // this is Destructuring assignment / 分割代入
    // we don't need password and updatedAt data, cos protect security
    res.status(200).json(other);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// User Follow / test at postman RealSns FOLLOW USER
router.put('/:id/follow', async (req, res) => {
  // follower can't follow yourself
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id); // follow this user = followers = req.params.id
      const currentUser = await User.findById(req.body.userId); // follower = followings = req.body.userId
      // follower check already follow or not
      // .includes is check followers Array / フォローしたいユーザーがなければ、フォローできる
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({
          // $push id add from Array
          $push: {
            followers: req.body.userId,
          },
        });
        await currentUser.updateOne({
          // $push id add from Array
          $push: {
            followings: req.params.id,
          },
        });
        return res.status(200).json('You success follow this user');
      } else {
        return res.status(403).json('You are already follow this user');
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(500).json("You can't follow yourself");
  }
});

// User unFollow / test at postman RealSns UNFOLLOW USER
router.put('/:id/unfollow', async (req, res) => {
  // follower can't follow yourself
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id); // follow this user = followers = req.params.id
      const currentUser = await User.findById(req.body.userId); // follower = followings = req.body.userId
      // follower can unfollow when follower follow before
      // .includes is check followers Array / 解除したいフォロワーがあれば、解除できる
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({
          // $pull id remove from Array
          $pull: {
            followers: req.body.userId,
          },
        });
        await currentUser.updateOne({
          // $pull id remove from Array
          $pull: {
            followings: req.params.id,
          },
        });
        return res.status(200).json('You success unfollow this user');
      } else {
        return res.status(403).json("You can't unfollow this user");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(500).json("You can't unfollow yourself");
  }
});

// User Create > this function is in auth.js

// this is connect test
// router.get('/', (req, res) => {
//   res.send('users router');
// });

module.exports = router;
