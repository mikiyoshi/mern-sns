import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';
import TimeLine from '../../components/timeline/TimeLine';
import Topbar from '../../components/topbar/Topbar';
import './Profile.css';
import { useParams } from 'react-router-dom'; // this can get URL parameter

export default function Profile() {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER; // add public folder root
  // get mongoDB realsns/users from backend
  const [user, setUser] = useState({});
  const username = useParams().username; // this can get URL parameter which was like a "Nick" from http://localhost:3000/profile/Nick

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/users?username=${username}`); // 123abc is query from /users?username=123abc
      console.log('Profile.jsx: ', response);
      setUser(response.data);
    };
    fetchUser();
  }, [username]);
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                // src={PUBLIC_FOLDER + '/post/3.jpeg'}

                src={
                  user.coverPicture || PUBLIC_FOLDER + '/post/3.jpeg' // post.id is get from map function which was in Timeline.js at Posts.map((post)
                }
                alt=""
                className="profileCoverImg"
              />
              <img
                // src={PUBLIC_FOLDER + '/person/1.jpeg'}

                src={
                  // PUBLIC_FOLDER + Users.filter((user) => user.id === post.id)[0].profilePicture // post.id is get from map function which was in Timeline.js at Posts.map((post)
                  user.profilePicture || PUBLIC_FOLDER + '/person/noAvatar.png' // post.id is get from map function which was in Timeline.js at Posts.map((post)
                }
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            {/* <TimeLine /> */}
            <TimeLine username={username} /> {/* add props username */}
            {/* <Rightbar profile /> */}
            <Rightbar user={user} />
            {/* profile is props to components/rightbar/Rightbar.jsx */}
          </div>
        </div>
      </div>
    </>
  );
}
