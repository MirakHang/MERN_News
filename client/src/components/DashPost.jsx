import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function DashPost() {
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  console.log(userPosts);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.legth < 8) {
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
  return (
    <div
      className="mx-auto"
      style={{
        height: "630px",
        overflowY: "auto",
      }}
    >
      <div
        className="grid  justify-center items-center md:grid-cols-1 lg:grid-cols-2 grid-cols-1 gap-0 overflow-y-scroll scrollbar  scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"
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
                    className="object-cover h-48  rounded-t-lg md:rounded-none md:rounded-s-lg p-2"
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
                >
                  {post.content}
                </p>
                <div>
                  <span className="text-gray-400">
                    Updated On: {new Date(post.updatedAt).toLocaleDateString()}
                  </span>
                  <span></span>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1">
                    <MdDelete className="w-4 h-4 text-red-600 dark:hover:text-gray-700" />
                    <button className="dark:hover:text-white  text-red-600 px-2 py-1 rounded-md transition-colors duration-200">
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
    </div>
  );
}
