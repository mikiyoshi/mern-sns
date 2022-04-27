import React from 'react';

export default function CloseFriend({ user }) {
  // get props { user } from Sidebar.jsx at <CloseFriend user={user} key={user.id} />
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER; // add public folder root
  return (
    <li className="sidebarFriend">
      <img
        src={PUBLIC_FOLDER + user.profilePicture}
        className="sidebarFriendImg"
        alt="Miki"
      />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
}
