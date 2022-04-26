import React from 'react';
import { Users } from '../../dummyData';
import Online from '../online/Online';
import './Rightbar.css';

export default function Rightbar() {
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <div className="eventContainer">
          <img src="assets/star.png" alt="" className="starImg" />
          <span className="eventText">
            <b>For only Follower</b> event now!
          </span>
        </div>
        <img src="assets/event.jpeg" alt="" className="eventImg" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((user) => (
            <Online user={user} key={user.id} /> // props user={user}
          ))}
        </ul>
        <p className="promotioTitle">Promotion Ad</p>
        <img
          src="assets/promotion/promotion1.jpeg"
          alt=""
          className="rightbarPromotionImg"
        />
        <p className="promotionName">Shopping</p>
        <img
          src="assets/promotion/promotion2.jpeg"
          alt=""
          className="rightbarPromotionImg"
        />
        <p className="promotionName">Car</p>
        <img
          src="assets/promotion/promotion3.jpeg"
          alt=""
          className="rightbarPromotionImg"
        />
        <p className="promotionName">Shopping</p>
      </div>
    </div>
  );
}
