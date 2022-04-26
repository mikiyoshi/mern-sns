import React from 'react';

export default function CloseFriend({ user }) {
  // get props { user } from Sidebar.jsx at <CloseFriend user={user} key={user.id} />
  return (
    <li className="sidebarFriend">
      <img src={user.profilePicture} className="sidebarFriendImg" alt="Miki" />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
}
