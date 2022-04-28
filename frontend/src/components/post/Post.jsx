import { MoreVert } from '@mui/icons-material';
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import './Post.css';
// import { Users } from '../../dummyData';

import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../state/AuthContext';

export default function Post({ post }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER; // add public folder root
  // console.log(post);
  // console.log(Users);
  // const user = Users.filter((user) => user.id === 1); // This is a get a data from  Users at dummyData.js
  // console.log(user); // return Object [{ id: 1, profilePicture: "assets/person/1.jpeg", username: "ShinCode" }]
  // console.log(user[0].username); // return ShinCode, we need index [0] like a user[0]
  // const [like, setLike] = useState(post.like); // useState(0) is default like is 0, This is dummy data
  const [like, setLike] = useState(post.likes.length); // post.likes.length connect from backend

  const [isLiked, setIsLiked] = useState(false); // this is default like is not clicked // like が押されているかどうか状態を確認する必要がある、false は何も押されていない状態

  // get from backend
  const [user, setUser] = useState({});

  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      // const response = await axios.get(`/users/${post.userId}`); // this post of ${post.userId} 投稿したユーザーのユーザーId is props, props from Timeline.jsx at <Post post={post} key={post.id} />, post is posts.map((post), posts is my post and following posts, following post has userId at /backend/models/Post.js, userId is post userId
      // this is old backend using by router.get('/:id', async (req, res)
      // this is new back end using query
      const response = await axios.get(`/users?userId=${post.userId}`);
      console.log('Profile.jsx', response);
      setUser(response.data);
    };
    fetchUser();
  }, [post.userId]);
  // if useEffect(() => {}, []) only one time, useEffect(() => {}, [post.userId]) is when post.userId update rendering

  const handleLike = async () => {
    try {
      // get from API /routes/post.js like
      await axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
    } catch (err) {
      console.log(err);
    }
    // ハートの画像を押すと like が 0 like か 1 like の表示がされる
    setLike(isLiked ? like - 1 : like + 1); // if already clicked like = like -1, not clicked like = like +1
    setIsLiked(!isLiked); // 押されると isLiked に true を更新する
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? // PUBLIC_FOLDER + Users.filter((user) => user.id === post.id)[0].profilePicture // post.id is get from map function which was in Timeline.js at Posts.map((post)
                      PUBLIC_FOLDER + user.profilePicture
                    : PUBLIC_FOLDER + '/person/noAvatar.png' // post.id is get from map function which was in Timeline.js at Posts.map((post)
                }
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUsername">
              {/* {Users.filter((user) => user.id === post.id)[0].username} this is dummy data */}
              {user.username}
            </span>
            <span className="postData">
              {/* {post.data} */}
              {format(post.createdAt)}
            </span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          {/* <img src={PUBLIC_FOLDER + post.photo} alt="" className="postImg" /> post.photo is dummy data */}
          <img src={PUBLIC_FOLDER + post.img} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src={PUBLIC_FOLDER + '/heart.png'}
              alt=""
              className="likeIcon"
              onClick={() => handleLike()}
            />
            <span className="postLikeCounter">
              {like} likes
              {/* {like} is state space 状態変数 */}
            </span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment}: comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
