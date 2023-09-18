import React from "react";
import { BsPencilSquare, BsFillTrashFill } from "react-icons/bs";

const Postcard = ({ title, description, date }) => {
  return (
    <div className="flex flex-row justify-between items-center space-x-3">
      <div
        className="w-56 bg-gray-200 rounded-lg flex flex-col justify-around p-3"
      >
        <span>{title}</span>
        <span>{description}</span>
        <span>{date}</span>
        <div className="flex space-x-3">
          <div className="w-8 h-8 rounded-full bg-blue-400 hover:bg-blue-600 flex justify-center items-center">
            <BsPencilSquare />
          </div>
          <button className="w-8 h-8 rounded-full bg-red-400 hover:bg-red-600 flex justify-center items-center">
            <BsFillTrashFill />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function HomeNew() {
  const posts = [
    {
      title: "Post title 1",
      description: "This is the description of post 1.",
      date: "Jan 4, 2023",
    },
    {
      title: "Post title 2",
      description: "This is the description of post 2.",
      date: "Jan 5, 2023",
    },
    {
      title: "Post title 3",
      description: "This is the description of post 3.",
      date: "Jan 6, 2023",
    },
  ];

  return (
    <div>
      <div className="flex flex-row justify-between space-x-3">
        {posts.map((post) => (
          <Postcard key={post.title} {...post} />
        ))}
      </div>
    </div>
  );
}
