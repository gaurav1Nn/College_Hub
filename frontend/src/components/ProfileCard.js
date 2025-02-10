// ProfileCard.jsx
import React from "react";
import photo from ".././assets/vhjkl.jpeg";
import coverimage from "../assets/coverimage.jpg"
const ProfileCard = () => (
  <div className="bg-gray-800 rounded-lg text-white overflow-hidden relative max-w-xs mx-auto">
    {/* Banner Image */}
    <div className="relative">
      <img
        src={coverimage|| "https://miro.medium.com/v2/resize:fit:1400/0*Eww7pEGuh5F3K8fm"}// Keep your banner image URL here
        alt="Banner"
        className="w-full h-24 object-cover"
      />
      {/* Profile Image (overlapping the banner) */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12">
        <img
          src={photo} // Replace with actual profile image URL
          alt="Profile"
          className="rounded-full w-20 h-20 border-4 border-gray-800"
        />
      </div>
    </div>

    {/* Profile Details */}
    <div className="pt-16 px-4 pb-4 text-center">
      <h2 className="text-xl font-bold mt-2">Sample user</h2>
      <p className="text-base font-semibold">@sample</p>
      <p className="text-sm mt-1 font-semibold">
        Computer Science Student
        <br /> Full-Stack Developer
        <br /> UI/UX Enthusiast
      </p>

      {/* Stats */}
      <div className="flex justify-between mt-4 text-center text-sm font-semibold">
        <div>
          <p className="text-lg font-bold">1002</p>
          <p>Total Likes</p>
        </div>
        <div>
          <p className="text-lg font-bold">32</p>
          <p>Posts</p>
        </div>
      </div>

      {/* Profile Link */}
      <a
        href="/profile"
        className="block text-center mt-4 text-blue-400 font-semibold"
      >
        My Profile
      </a>
    </div>
  </div>
);

export default ProfileCard;
