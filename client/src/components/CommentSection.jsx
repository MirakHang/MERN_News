import { Alert, Modal, Textarea, TextInput, Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaLocationArrow } from "react-icons/fa6";
import Comment from "./Comment";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function CommentSection({ postId }) {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

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
        setCommentError(null);
        setComments([...comments, data]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = (comment, editedContent) => {
    setComment(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };

  const handleDelete = async (commentId) => {
    setShowDeleteModal(false);
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const data = await res.json();
        setComments(comments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {
      console.log(error.message);
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
          <div className="max-w-2xl mx-auto p-4  bg-white rounded-lg shadow-md dark:bg-gray-800">
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
            {comments.length == 0 ? (
              <p className="text-sm my-5">No comments Yet!</p>
            ) : (
              <>
                <div className="flex gap-2">
                  <p>Comments</p>
                  <div>
                    <p>{comments.length}</p>
                  </div>
                </div>
                {comments.map((comment) => (
                  <Comment
                    key={comment._id}
                    comment={comment}
                    onLike={handleLike}
                    onEdit={handleEdit}
                    onDelete={(commentId) => {
                      setShowDeleteModal(true);
                      setCommentToDelete(commentId);
                    }}
                  />
                ))}
              </>
            )}
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}
      <Modal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        popup
        className="fixed inset-0 flex bg-transparent items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10 pt-52 sm:pt-0 md:pt-0 lg:pt-0 mx-auto"
        size="md"
        style={{
          // background: "rgba(54, 62, 70, 0.8)", // Adjusted opacity to cover the full screen
          zIndex: 50, // Ensure it's on top of other content
        }}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-red-500 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-6 text-lg font-semibold text-gray-700 dark:text-gray-300">
              Are you sure you want to delete this post?
            </h3>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                color="failure"
                onClick={() => handleDelete(commentToDelete)}
                className="w-full sm:w-auto"
              >
                Yes, I am sure
              </Button>
              <Button
                onClick={() => setShowDeleteModal(false)}
                color="gray"
                className="w-full sm:w-auto"
              >
                No, Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
