const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');

// add new Post / test at postman RealSns CREATE POST
router.post('/', async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    return res.status(200).json(savePost);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// update Post / test at postman RealSns UPDATE POST
router.put('/:id', async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const post = await Post.findById(req.params.id); // /:id = req.params.id
    if (post.userId === req.body.userId) {
      await post.updateOne({
        $set: req.body,
      });
      return res.status(200).json('You success edit your post');
    } else {
      return res.status(403).json("You can't edit other users post");
    }
  } catch (err) {
    return res.status(403).json(err);
  }
});

// delete Post / test at postman RealSns DELETE POST
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); // /:id = req.params.id
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      return res.status(200).json('You success delete your post');
    } else {
      return res.status(403).json("You can't delete other users post");
    }
  } catch (err) {
    return res.status(403).json(err);
  }
});

// get Single Post / test at postman RealSns GET SINGLE POST
router.get('/:id', async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const post = await Post.findById(req.params.id); // /:id = req.params.id
    return res.status(200).json(post);
  } catch (err) {
    return res.status(403).json(err);
  }
});

// add likes Single Post / test at postman RealSns LIKE POST
router.put('/:id/like', async (req, res) => {
  // this like can add like by yourself
  try {
    const post = await Post.findById(req.params.id); // like this post = likes = req.params.id
    // your post check already like or not
    // .includes is check likes Array / likeが押されてなければ、likeできる
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({
        // $push id add from Array
        $push: {
          likes: req.body.userId,
        },
      });
      return res.status(200).json('You success like this post');
    } else {
      // remove userId from likes
      await post.updateOne({ $pull: { likes: req.body.userId } });
      return res.status(403).json('You are remove like from this post');
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// get profile timeline
router.get('/profile/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// get timeline / test at postman RealSns LIKE POST
router.get('/timeline/:userId', async (req, res) => {
  // :userId is random id / 任意のid
  // update '/timeline/:userId' connect frontend from '/timeline/all'
  // why use /timeline/all?  if use only /timeline, we can't define /timeline or /:id
  try {
    // const currentUser = await User.findById(req.body.userId); // get this user get a data from '/timeline/all'
    const currentUser = await User.findById(req.params.userId); // get this user get a data from '/timeline/:userId'
    const userPosts = await Post.find({ userId: currentUser._id }); // get this user's all post
    // get followers all posts
    const friendPosts = await Promise.all(
      // Promise.all is currentUser use await means asynchronous processing / 非同期処理, so it's not sure when can get currentUser Data
      // Promise.all can wait anytime when get a data from currentUser / 非同期処理なのでいつでも受け取れる状態で待っている
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    // .concat() is connect Array and Array
    return res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    return res.status(500).json(err);
  }
});

// this is connect test
// router.get('/', (req, res) => {
//   res.send('posts router');
// });

module.exports = router;
