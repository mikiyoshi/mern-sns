import React from 'react';
import { Users } from '../../dummyData';
import Online from '../online/Online';
import './Rightbar.css';

// export default function Rightbar({ profile }) { profile is dummy data
export default function Rightbar({ user }) {
  // update user
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER; // add public folder root
  const HomeRightbar = () => {
    return (
      <>
        <div className="eventContainer">
          <img src={PUBLIC_FOLDER + '/star.png'} alt="" className="starImg" />
          <span className="eventText">
            <b>For only Follower</b> event now!
          </span>
        </div>
        <img src={PUBLIC_FOLDER + '/event.jpeg'} alt="" className="eventImg" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((user) => (
            <Online user={user} key={user.id} /> // props user={user}
          ))}
        </ul>
        <p className="promotioTitle">Promotion Ad</p>
        <img
          src={PUBLIC_FOLDER + '/promotion/promotion1.jpeg'}
          alt=""
          className="rightbarPromotionImg"
        />
        <p className="promotionName">Shopping</p>
        <img
          src={PUBLIC_FOLDER + '/promotion/promotion2.jpeg'}
          alt=""
          className="rightbarPromotionImg"
        />
        <p className="promotionName">Car</p>
        <img
          src={PUBLIC_FOLDER + '/promotion/promotion3.jpeg'}
          alt=""
          className="rightbarPromotionImg"
        />
        <p className="promotionName">Shopping</p>
      </>
    );
  };
  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">User info</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Lives in: </span>
            <span className="rightbarInfoKey">Osaka</span>
            <h4 className="rightbarTitle">Your friends</h4>
            <div className="rightbarFollowings">
              <div className="rightbarFollowing">
                <img
                  src={PUBLIC_FOLDER + '/person/1.jpeg'}
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">Mith</span>
              </div>
              <div className="rightbarFollowing">
                <img
                  src={PUBLIC_FOLDER + '/person/2.jpeg'}
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">Jeff</span>
              </div>
              <div className="rightbarFollowing">
                <img
                  src={PUBLIC_FOLDER + '/person/3.jpeg'}
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">Mike</span>
              </div>
              <div className="rightbarFollowing">
                <img
                  src={PUBLIC_FOLDER + '/person/4.jpeg'}
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">Shane</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
