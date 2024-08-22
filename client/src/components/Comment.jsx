import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import moment from "moment";
import { IoMdHeart } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Comment({ comment, onLike }) {
  const [user, setUser] = useState({});
  const commentDate = new Date(user.createdAt);
  const { currentUser } = useSelector((state) => state.user);

  //for fetching userimage, username and others
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);

  console.log(user, "user");
  return (
    <div>
      <div className="flex space-x-4 mt-3" key={comment._id} comment={comment}>
        <img
          src={user.profilePicture}
          alt="User avatar"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1 bg-gray-100 p-3 rounded-sm dark:bg-gray-700">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-semibold dark:text-gray-200">
              {user ? `@${user.username}` : "anonymous user"}
            </h4>
            {/* <span className="text-xs text-gray-500 dark:text-gray-200">
              {formatDistanceToNow(new Date(player.updatedAt))}
              ago
              {user.updatedAt}
            </span> */}
            <div className="comment">
              {/* Other comment elements */}

              {user.updatedAt ? (
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                  {moment(comment.createdAt).fromNow()}
                </p>
              ) : (
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                  No recent edits
                </p>
              )}
            </div>
          </div>
          <p className="text-gray-800 text-sm mt-1 dark:text-gray-200">
            {comment.content}
          </p>
        </div>
      </div>
      <div className="flex gap-2" style={{ marginLeft: "55px" }}>
        <div className="flex justify-center items-center gap-1 cursor-pointer">
          <span
            onClick={() => onLike(comment._id)}
            className={`text-gray-400 hover:text-blue-500 ${
              currentUser &&
              comment.likes.includes(currentUser._id) &&
              "text-red-600"
            }`}
            // className="text-red-600"
          >
            <IoMdHeart className="w-5 h-5 " />
          </span>
        </div>
        <div className="mr-2">
          <p className="test-gray-400">
            {comment.numberOfLikes > 0 &&
              comment.numberOfLikes +
                " " +
                (comment.numberOfLikes === 1 ? "like" : "likes")}
          </p>
        </div>
        <div className="flex justify-center items-center gap-1 cursor-pointer ">
          <span>
            <FaEdit
              className="text-green-500"
              style={{ width: "14px", height: "14px" }}
            />
          </span>
          <span className="text-green-500 ">Edit</span>
        </div>
        <div className="flex justify-center items-center gap-1 cursor-pointer text-red-500 ">
          <span>
            <MdOutlineDelete />
          </span>
          <span>Delete</span>
        </div>
      </div>
    </div>
  );
}
