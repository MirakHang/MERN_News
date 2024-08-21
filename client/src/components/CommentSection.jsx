import { Alert, Textarea, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaLocationArrow } from "react-icons/fa6";

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
        commentError(null);
      }
    } catch (error) {
      commentError(error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1  my-5 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt="profile picture"
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-sm text-blue-600 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-gray-400 my-5 flex gap-1">
          You must login to to comment.
          <Link className="text-blue-500 hover:underline" to={"/sign-in"}>
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form>
          <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="flex justify-center space-x-4">
              <div>
                <img
                  src={currentUser.profilePicture}
                  alt="User avatar"
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="flex items-center w-full space-x-2">
                <textarea
                  className="flex-1 w-full p-2 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 h-10 rounded-sm dark:bg-gray-700"
                  rows="1"
                  placeholder="Write a comment..."
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                />
                <FaLocationArrow
                  className="w-6 h-6 text-blue-500"
                  style={{ rotate: "45deg" }}
                  onClick={handleSubmit}
                />
              </div>
            </div>
            <p className="mb-6 mt-2" style={{ marginLeft: "50px" }}>
              {200 - comment.length} character remaining
            </p>

            <div className="space-y-6">
              <div className="flex space-x-4 ">
                <img
                  src="https://via.placeholder.com/40"
                  alt="User avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1 bg-gray-100 p-3 rounded-sm dark:bg-gray-700">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-semibold dark:text-gray-200">
                      John Doe
                    </h4>
                    <span className="text-xs text-gray-500 dark:text-gray-200">
                      2 hours ago
                    </span>
                  </div>
                  <p className="text-gray-800 text-sm mt-1 dark:text-gray-200">
                    This is a sample comment, reflecting Facebook's comment
                    style.
                  </p>
                </div>
              </div>

              <div className="flex space-x-4">
                <img
                  src="https://via.placeholder.com/40"
                  alt="User avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1 bg-gray-100 p-3 rounded-sm dark:bg-gray-700">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-semibold dark:text-gray-200">
                      Jane Smith
                    </h4>
                    <span className="text-xs text-gray-500 dark:text-gray-200">
                      1 day ago
                    </span>
                  </div>
                  <p className="text-gray-800 text-sm mt-1 dark:text-gray-200">
                    Another comment, giving feedback on the topic discussed.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}
    </div>
  );
}
