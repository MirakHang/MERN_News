import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { Modal, Button, Spinner } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa";
import { LiaCommentDots } from "react-icons/lia";
import Slider from "../components/Slider";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  // for players list
  const [playersList, setPlayersList] = useState([]);

  // fetching players
  useEffect(() => {
    const fetchPlayers = async () => {
      const res = await fetch("/api/player/getplayers");
      const data = await res.json();
      setPlayersList(data.players);
    };
    fetchPlayers();
  }, []);
  console.log(playersList, "222");

  // fetching posts
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  const handleShowMore = async () => {
    const startIndex = playersList.length;
    try {
      const res = await fetch(
        `/api/player/getplayers?&startIndex=${startIndex}&limit=4`
      );
      const data = await res.json();
      if (res.ok) {
        setPlayersList((prev) => {
          const existingIds = new Set(prev.map((player) => player._id));
          const newPlayers = data.players.filter(
            (player) => !existingIds.has(player._id)
          );
          return [...prev, ...newPlayers];
        });
        if (data.players.length < 2) {
          // Match the limit used in server-side
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container px-2 mx-auto">
      <Slider />
      <div className="flex justify-center mx-auto ">
        <div className="flex justify-start items-center w-auto gap-4 custom-scrollbar overflow-x-auto mx-0">
          {playersList.map((player) => (
            <Link
              key={player.slug}
              to={`/player/${player.slug}`}
              className="text-center my-4"
              style={{ width: "100px" }}
            >
              <div className="w-14 h-14 overflow-hidden mx-auto bg-gray-100 flex items-center justify-center rounded-full">
                <img
                  src={player.image}
                  alt="Player"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="mt-1 text-xs sm:text-sm md:text-sm lg:text-sm font-medium text-gray-700 dark:text-gray-200">
                {player.playerName}
              </p>
            </Link>
          ))}
          {showMore && (
            <button
              className="text-blue-600 text-xs mb-2 mr-2"
              onClick={handleShowMore}
            >
              show <br></br>more
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div
          style={{ marginBottom: "40px", marginTop: "40px" }}
          className="flex justify-center items-center"
        >
          <Spinner className=" dark:text-blue-600 w-8 h-8" />
        </div>
      ) : (
        <div>
          {posts.length > 0 ? (
            <>
              <div
                className="grid  justify-center items-center md:grid-cols-2 mg:gap-2 px-1  lg:grid-cols-3 grid-cols-1 gap-4 overflow-y-scroll scrollbar  scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"
                style={{
                  overflowY: "auto",
                }}
              >
                {posts.map((post) => (
                  <Link
                    // to={`/post/${post.slug}`}
                    to={`/post/${post.slug}`}
                    className="mx-auto mb-2 bg-white rounded-md shadow-md  flex-grow w-full dark:border-gray-700 dark:bg-gray-800"
                    key={post.slug}
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
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <p>You have no user yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
