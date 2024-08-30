import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Modal, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashPost() {
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 8) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 8) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async () => {
    setShowDeleteModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className="mx-auto overflow-y-scroll custom-scrollbar scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"
      style={{
        height: "630px",
        overflowY: "auto",
      }}
    >
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <div
            className="grid  justify-center items-center md:grid-cols-1 lg:grid-cols-2 grid-cols-1 gap-0 "
            style={{
              overflowY: "auto",
            }}
          >
            {userPosts.map((post) => (
              <div className="p-2 mt-2" key={post.slug}>
                <div className="flex flex-col gap-1 md:flex-row sm:flex-row items-center bg-gray-100 border border-gray-200 rounded-lg shadow dark:border-gray-700 dark:bg-gray-800">
                  <Link to={`/post/${post.slug}`}>
                    <div className=" md:w-1/2">
                      <img
                        className="object-cover h-48 w-80 rounded-t-lg md:rounded-none md:rounded-s-lg p-2"
                        src={post.image}
                        alt="Cricket bat with wicket"
                      />
                    </div>
                  </Link>
                  <div className="flex flex-col justify-between p-2 leading-normal w-full md:w-1/2">
                    <Link to={`/post/${post.slug}`}>
                      <h5 className="mb-2 text-2xl font-medium tracking-tight text-gray-900 dark:text-white">
                        {post.title}
                      </h5>
                    </Link>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3 uppercase">
                      {post.category}
                    </p>
                    <p
                      className="mb-3 font-normal text-gray-700 dark:text-gray-400 "
                      style={{
                        height: "45px",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      dangerouslySetInnerHTML={{ __html: post && post.content }}
                    ></p>
                    <div>
                      <span className="text-gray-400">
                        Updated On:{" "}
                        {new Date(post.updatedAt).toLocaleDateString()}
                      </span>
                      <span></span>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1">
                        <MdDelete className="w-4 h-4 text-red-600 dark:hover:text-gray-700" />
                        <button
                          className="dark:hover:text-white  text-red-600 px-2 py-1 rounded-md transition-colors duration-200"
                          onClick={() => {
                            setShowDeleteModal(true);
                            setPostIdToDelete(post._id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiEdit className="w-4 h-4 text-blue-600" />
                        <Link to={`/update-post/${post._id}`}>
                          <button className="dark:hover:text-white hover:bg-blue-600 text-blue-600 px-2 py-1 rounded-md transition-colors duration-200">
                            Edit
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {showMore && (
            <button
              className="w-full mb-2 text-blue-600 self-center text-sm py-7"
              onClick={handleShowMore}
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no user yet.</p>
      )}

      <Modal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        popup
        size="md"
        style={{
          padding: "0",
          background: " rgba(	54,	62,	70, 0.6)",
        }}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-red-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeletePost}>
                Yes, I am sure
              </Button>
              <Button onClick={() => setShowDeleteModal(false)} color="gray">
                No, Cancle
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
