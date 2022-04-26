import { MoreVert } from '@mui/icons-material';
import React, { useState } from 'react';
import './Post.css';
import { Users } from '../../dummyData';

export default function Post({ post }) {
  // console.log(post);
  // console.log(Users);
  // const user = Users.filter((user) => user.id === 1); // This is a get a data from  Users at dummyData.js
  // console.log(user); // return Object [{ id: 1, profilePicture: "assets/person/1.jpeg", username: "ShinCode" }]
  // console.log(user[0].username); // return ShinCode, we need index [0] like a user[0]
  const [like, setLike] = useState(post.like); // useState(0) is default like is 0

  const [isLiked, setIsLiked] = useState(false); // this is default like is not clicked // like が押されているかどうか状態を確認する必要がある、false は何も押されていない状態

  const handleLike = () => {
    // ハートの画像を押すと like が 0 like か 1 like の表示がされる
    setLike(isLiked ? like - 1 : like + 1); // if already clicked like = like -1, not clicked like = like +1
    setIsLiked(!isLiked); // 押されると isLiked に true を更新する
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              src={
                Users.filter((user) => user.id === post.id)[0].profilePicture // post.id is get from map function which was in Timeline.js at Posts.map((post)
              }
              alt=""
              className="postProfileImg"
            />
            <span className="postUsername">
              {Users.filter((user) => user.id === post.id)[0].username}
            </span>
            <span className="postData">{post.data}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          <img src={post.photo} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src="./assets/heart.png"
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
