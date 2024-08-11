import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function DashPost() {
  const [userPosts, setUserPosts] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  console.log(userPosts);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);
  return (
    <div
      className="grid  justify-center items-center md:grid-cols-2 grid-cols-1 gap-0 overflow-y-scroll scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 "
      style={{
        height: "630px",
        // maxHeight: "3rem", // Adjust this value to control the height
        overflowY: "auto",
      }}
    >
      {userPosts.map((post) => (
        // <div className=" p-2">
        //   {/* <div class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl  dark:border-gray-700 dark:bg-gray-800"> */}
        //   <div className="items-center bg-white border border-gray-200 rounded-lg shadow grid  md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 grid-cols-1   dark:border-gray-700 dark:bg-gray-800">
        //     <div>
        //       <img
        //         class="object-cover h-36 mx-auto rounded-t-lg  md:rounded-none md:rounded-s-lg"
        //         src="https://static.vecteezy.com/system/resources/thumbnails/019/167/034/small_2x/cricket-bat-with-wicket-free-png.png"
        //         alt=""
        //       />
        //     </div>
        //     <div class="flex flex-col justify-between p-4 leading-normal">
        //       <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        //         Title
        //       </h5>
        //       <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
        //         This is a content. This is a content. This is a content. This is
        //         a content. This is a content.
        //       </p>
        //       <div className="flex gap-4">
        //         <div className="flex flex-row items-center ">
        //           <MdDelete className="w-4 h-4 text-red-600 dark:hover:text-gray-700" />

        //           <button className="hover:bg-red-600 text-red-600 ">
        //             Delete
        //           </button>
        //         </div>
        //         <div className="flex flex-row items-center gap-1">
        //           <FiEdit className="text-blue-600" />
        //           <button className="text-blue-600">Edit</button>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </div>

        /////////////////////////////
        // <div className="p-2">
        //   <div className="flex flex-row sm:flex-col  items-center bg-white border border-gray-200 rounded-lg shadow   dark:border-gray-700 dark:bg-gray-800">
        //     <div>
        //       <img
        //         className="object-cover h-36 mx-auto rounded-t-lg md:rounded-none md:rounded-s-lg"
        //         src="https://static.vecteezy.com/system/resources/thumbnails/019/167/034/small_2x/cricket-bat-with-wicket-free-png.png"
        //         alt="Cricket bat with wicket"
        //       />
        //     </div>
        //     <div className="flex flex-col justify-between p-4 leading-normal">
        //       <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        //         Title
        //       </h5>
        //       <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
        //         This is a content. This is a content. This is a content. This is
        //         a content. This is a content.
        //       </p>
        //       <div className="flex gap-4">
        //         <div className="flex items-center gap-1">
        //           <MdDelete className="w-4 h-4 text-red-600 dark:hover:text-gray-700" />
        //           <button className="hover:text-white hover:bg-red-600 text-red-600 px-2 py-1 rounded-md transition-colors duration-200">
        //             Delete
        //           </button>
        //         </div>
        //         <div className="flex items-center gap-1">
        //           <FiEdit className="w-4 h-4 text-blue-600" />
        //           <button className="hover:text-white hover:bg-blue-600 text-blue-600 px-2 py-1 rounded-md transition-colors duration-200">
        //             Edit
        //           </button>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </div>

        <div className="p-2 mt-2" key={post.slug}>
          <div className="flex flex-col gap-1 md:flex-row sm:flex-row items-center bg-white border border-gray-200 rounded-lg shadow dark:border-gray-700 dark:bg-gray-800">
            <Link to={`/post/${post.slug}`}>
              <div className=" md:w-1/2">
                <img
                  className="object-cover h-28  rounded-t-lg md:rounded-none md:rounded-s-lg p-2"
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
  );
}
