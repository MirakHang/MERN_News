import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { LiaCommentDots } from "react-icons/lia";
import { Link } from "react-router-dom";

export default function RecentPostCard({ post }) {
  return (
    <div className="flex justify-center items-center">
      <Link className="" to={`/post/${post.slug}`}>
        <div
          className="mx-auto mb-2 bg-white rounded-md shadow-md  flex-grow w-full dark:border-gray-700 dark:bg-gray-800"
          key={post._id}
          post={post}
        >
          <div>
            <div className="pt-2 px-3 pb-0">
              <h3
                href="#"
                className="block text-xl leading-tight font-medium hover:underline text-gray-900 dark:text-white"
              >
                {post.title && post.title.length > 30
                  ? `${post.title.slice(0, 27)}...`
                  : post.title}
              </h3>

              <span className="pb-1 font-bold dark:text-gray-300">
                1 hr ago
              </span>
              <div className="md:shrink-0">
                <img
                  className=" object-cover rounded-md md:w-48 justify-center items-center flex my-auto mx-auto"
                  src={post.image}
                  alt="Card Image"
                  style={{
                    width: "340px",
                    height: "180px",
                  }}
                />
              </div>
            </div>
            <div className="p-4 pt-2" style={{ height: "95px" }}>
              <div className="tracking-wide text-sm text-gray-800 font-semibold dark:text-gray-400">
                Category: {post.category}
              </div>
              <p
                className="mt-2 text-gray-700 text-sm line-clamp-2 dark:text-gray-400"
                style={{
                  height: "18px",
                }}
                dangerouslySetInnerHTML={{
                  __html:
                    post && post.content && post.content.length > 50
                      ? `${post.content.slice(0, 42)}...`
                      : post.title,
                }}
              ></p>
              <div className="flex items-center mt-2 gap-4 justify-between mx-2">
                <div className="text-gray-500 hover:text-indigo-600 flex justify-center items-center">
                  <FaRegHeart />
                  <span className="ml-2">Like</span>
                </div>
                <div className="text-gray-500 hover:text-indigo-600 flex justify-center items-center">
                  <LiaCommentDots className="h-5 w-5" />
                  <span className="ml-2">Comment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
