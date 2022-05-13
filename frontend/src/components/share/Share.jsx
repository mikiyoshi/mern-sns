import { Analytics, Face, Gif, Image } from '@mui/icons-material';
import axios from 'axios';
import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../state/AuthContext';
import './Share.css';

export default function Share() {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER; // add public folder root
  const { user } = useContext(AuthContext);
  const desc = useRef();

  const [file, setFile] = useState(null);
  console.log('Share.jsx: ', file);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (file) {
      console.log('XXXXXXXXX Share.jsx: ', file);
      // const data = new FormData(); // this is get input form data, data is Object {key: value}
      const fileName = Date.now() + file.name; // we don't make same file name, cos if same file name has error // Date.now() is get a date and time
      // data.append('name', fileName); // { name: fileName }
      // data.append('file', file); // { file: file }
      newPost.img = fileName; // { img: fileName}
      try {
        // console.log('DDDDDDDDDD Share.jsx: ', ...data.entries());
        // console.log('DDDDDDDDDD Share.jsx: ', data.get('name'));
        // console.log('DDDDDDDDDD Share.jsx: ', data.get('file'));
        // await axios.post('/upload', ...data.entries());
        const data = new FormData();
        data.append('name', fileName);
        data.append('file', file);
        await axios.post('/upload', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } catch (err) {
        console.log('file get error', err);
      }
    }

    try {
      await axios.post('/posts', newPost);
      window.location.reload(); // this is reload browser, cos when I post it, it needs reload to display at post list 投稿した後にリロードしなければ、記事がリストに表示されないから
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div>
          <form
            method="POST"
            action="http://localhost:5000/api/upload/"
            enctype="multipart/form-data"
          >
            <input type="file" name="file" />
            <br />
            <input type="submit" value="アップロード" />
          </form>
        </div>
        <div className="shareTop">
          <img
            // src="/assets/person/1.jpeg"

            // src={PUBLIC_FOLDER + '/person/noAvatar.png'}

            src={
              user.profilePicture
                ? // PUBLIC_FOLDER + Users.filter((user) => user.id === post.id)[0].profilePicture // post.id is get from map function which was in Timeline.js at Posts.map((post)
                  PUBLIC_FOLDER + user.profilePicture
                : PUBLIC_FOLDER + '/person/noAvatar.png' // post.id is get from map function which was in Timeline.js at Posts.map((post)
            }
            alt=""
            className="shareProfileImg"
          />
          <input
            type="text"
            className="shareInput"
            placeholder="How do you feel now?"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        <form className="shareButtons" onSubmit={(e) => handleSubmit(e)}>
          <div className="shareOptions">
            {/* <div className="shareOption"> */}
            <label className="shareOption" htmlFor="file">
              {/* Update label and add htmlFor="file" has function of <input id="file" has same input form function */}
              <Image className="shareIcon" htmlColor="blue" />
              <span className="shareOptionText">Photo</span>
              <input
                type="file"
                id="file"
                name="file"
                accept=".png, .jpeg, .jpg"
                style={{ display: 'none' }}
                onChange={(e) => setFile(e.target.files[0])}
              />
              {/* this is a file image upload form */}
            </label>
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
              <span className="shareOptionText">Poll</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
