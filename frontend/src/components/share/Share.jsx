import { Analytics, Face, Gif, Image } from '@mui/icons-material';
import React from 'react';
import './Share.css';

export default function Share() {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER; // add public folder root
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            // src="/assets/person/1.jpeg"

            src={PUBLIC_FOLDER + '/person/noAvatar.png'}
            alt=""
            className="shareProfileImg"
          />
          <input
            type="text"
            className="shareInput"
            placeholder="How do you feel now?"
          />
        </div>
        <hr className="shareHr" />
        <div className="shareButtons">
          <div className="shareOptions">
            <div className="shareOption">
              <Image className="shareIcon" htmlColor="blue" />
              <span className="shareOptionText">Photo</span>
            </div>
            <div className="shareOption">
              <Gif className="shareIcon" htmlColor="hotpink" />
              <span className="shareOptionText">Gif</span>
            </div>
            <div className="shareOption">
              <Face className="shareIcon" htmlColor="green" />
              <span className="shareOptionText">Feeling</span>
            </div>
            <div className="shareOption">
              <Analytics className="shareIcon" htmlColor="red" />
              <span className="shareOptionText">Post</span>
            </div>
          </div>
          <button className="shareButton">Post</button>
        </div>
      </div>
    </div>
  );
}
