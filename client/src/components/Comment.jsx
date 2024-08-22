import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import moment from "moment";
import { IoMdHeart } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaLocationArrow } from "react-icons/fa6";
import { Button } from "flowbite-react";

export default function Comment({ comment, onLike, onEdit, onDelete }) {
  const [user, setUser] = useState({});
  const commentDate = new Date(user.createdAt);
  const { currentUser } = useSelector((state) => state.user);
  const [editComment, setEditComment] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [deleteModal, setDeleteModal] = useState(false);

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

  const handleEdit = () => {
    setEditComment(true);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });
      if (res.ok) {
        setEditedContent(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
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
            <div className="comment">
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
          {editComment ? (
            <div className="items-center w-full space-x-2">
              <>
                <textarea
                  className="flex-1 w-full p-2 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 h-10 rounded-md dark:bg-gray-700"
                  rows="1"
                  placeholder="Write a comment..."
                  onChange={(e) => setEditedContent(e.target.value)}
                  value={editedContent}
                />
                <div className="flex justify-end gap-2">
                  <button
                    className="bg-orange-500 rounded-md p-1 text-sm text-white"
                    onClick={() => setEditComment(false)}
                  >
                    Cancle
                  </button>
                  <button
                    className="bg-green-500 rounded-md p-1 text-sm text-white"
                    onClick={handleSave}
                  >
                    Update
                  </button>
                </div>
              </>
              {/* <FaLocationArrow
                className="w-6 h-6 text-blue-500"
                style={{ rotate: "45deg" }}
                // onClick={handleSubmit}
              /> */}
            </div>
          ) : (
            <>
              <div className="flex gap-2 mt-2">
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
                {currentUser &&
                  (currentUser._id === comment.userId ||
                    currentUser.isAdmin) && (
                    <>
                      <div
                        className="flex justify-center items-center gap-1 cursor-pointer"
                        onClick={handleEdit}
                      >
                        <span>
                          <FaEdit
                            className="text-green-500"
                            style={{ width: "14px", height: "14px" }}
                          />
                        </span>
                        <span className="text-green-500 ">Edit</span>
                      </div>
                      <div
                        className="flex justify-center items-center gap-1 cursor-pointer text-red-500 "
                        onClick={() => onDelete(comment._id)}
                      >
                        <span>
                          <MdOutlineDelete />
                        </span>
                        <span>Delete</span>
                      </div>
                    </>
                  )}
                {/* {currentUser &&
                  (currentUser._id === comment.userId ||
                    currentUser.isAdmin) && (
                    
                  )} */}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
