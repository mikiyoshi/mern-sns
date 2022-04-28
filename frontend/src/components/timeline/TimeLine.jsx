import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../state/AuthContext';
import Post from '../post/Post';
import Share from '../share/Share';
import './TimeLine.css';
// import { Posts } from '../../dummyData'; // import from backend "proxy": "http:localhost:5000/api"

export default function TimeLine({ username }) {
  // get backend
  const [posts, setPosts] = useState([]);

  const { user } = useContext(AuthContext); // Global Auth

  useEffect(() => {
    const fetchPosts = async () => {
      // username の post があれば表示する、なければ全て表示
      const response = username
        ? await axios.get(`/posts/profile/${username}`) // if there are username = profile page プロフィールページの場合
        : await axios.get(`/posts/timeline/${user._id}`); // 62657f2c2101d4a8b995e88c is from mongoDB realsns > users > Nick _id:  This is Home page ホームページの場合
      console.log('Timeline.jsx: ', response); // Promise {} < this error is waiting, we need await async in frontend  //  Promise {} はデータを受け取っている待ち時間を表示するエラー
      setPosts(response.data);
    };
    fetchPosts();
  }, [username, user._id]); // username, user._id どちらが変更されても更新される

  // !important error, await async in frontend // よくある間違い
  // useEffect can't add async, we need function for it, then Promise error is gone // useEffect には直接 await async 追加できない！関数を追加してを await async つけると、Promise 状態を回避できる
  // useEffect(async () => {
  //   const response = await axios.get(
  //     '/posts/timeline/62657f2c2101d4a8b995e88c'
  //   ); // 62657f2c2101d4a8b995e88c is from mongoDB realsns > users > Nick _id:
  //   console.log(response); // Promise {} < this error is waiting, we need await async in frontend  //  Promise {} はデータを受け取っている待ち時間を表示するエラー
  // }, []);

  // , [] this is important, cos it's a only once to get backend data // 初回のみデータ受け取る
  return (
    <div className="timeline">
      <div className="timelineWrapper">
        <Share />
        {/* {Posts.map((post) => (
          <Post post={post} key={post.id} />
        ))} */}
        {posts.map((post) => (
          // <Post post={post} key={post.id} /> This is dummy data
          <Post post={post} key={post._id} /> // mongoDB is _id
        ))}
      </div>
    </div>
  );
}
