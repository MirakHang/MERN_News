// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

// export default function DashboardComp() {
//   const [users, setUsers] = useState([]);
//   const [comments, setComments] = useState([]);
//   const [post, setPosts] = useState([]);
//   const [players, setPlayers] = useState([]);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [totalPlayers, setTotalPlayers] = useState(0);
//   const [totalComments, setTotalComments] = useState(0);
//   const [totalPosts, setTotalPosts] = useState(0);
//   const [lastMonthUsers, setLastMonthUsers] = useState(0);
//   const [lastMonthPlayers, setLastMonthPlayers] = useState(0);
//   const [lastMonthComments, setLastMonthComments] = useState(0);
//   const [lastMonthPosts, setLastMonthPosts] = useState(0);
//   const { currentUser } = useSelector((state) => state.user);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await fetch("/api/user/getusers?limit=6");
//         const data = await res.json();
//         if (res.ok) {
//           setUsers(data.users);
//           setTotalUsers(data.totalUsers);
//           setLastMonthUsers(data.lastMonthUsers);
//         }
//       } catch (error) {
//         console.log(error.message);
//       }
//     };
//     const fetchPosts = async () => {
//       try {
//         const res = await fetch("/api/post/getposts?limit=6");
//         const data = await res.json();
//         if (res.ok) {
//           setPosts(data.posts);
//           setTotalPosts(data.totalPosts);
//           setLastMonthPosts(data.lastMonthPosts);
//         }
//       } catch (error) {
//         console.log(error.message);
//       }
//     };
//     const fetchComments = async () => {
//       try {
//         const res = await fetch("/api/comment/getcomments?limit=6");
//         const data = await res.json();
//         if (res.ok) {
//           setComments(data.comments);
//           setTotalComments(data.totalComments);
//           setLastMonthComments(data.lastMonthComments);
//         }
//       } catch (error) {
//         console.log(error.message);
//       }
//     };

//     const fetchPlayers = async () => {
//       try {
//         const res = await fetch("/api/player/getplayers?limit=6");
//         const data = await res.json();
//         if (res.ok) {
//           setPlayers(data.players);
//           setTotalPlayers(data.totalPlayer);
//           setLastMonthPlayers(data.lastMonthPlayers);
//         }
//       } catch (error) {
//         console.log(error.message);
//       }
//     };

//     if (currentUser.isAdmin) {
//       fetchUsers();
//       fetchPosts();
//       fetchComments();
//       fetchPlayers();
//     }
//   }, []);

//   return <div>Dash comp</div>;
// }

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { Link } from "react-router-dom";

export default function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [players, setPlayers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPlayers, setLastMonthPlayers] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [openCard, setOpenCard] = useState(null); // State for managing open cards
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers?limit=6");
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts?limit=6");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/getcomments?limit=6");
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchPlayers = async () => {
      try {
        const res = await fetch("/api/player/getplayers?limit=6");
        const data = await res.json();
        if (res.ok) {
          setPlayers(data.players);
          setTotalPlayers(data.totalPlayer);
          setLastMonthPlayers(data.lastMonthPlayers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
      fetchPlayers();
    }
  }, [currentUser.isAdmin]);

  const renderCategoryDetails = () => {
    switch (openCard) {
      case "users":
        return (
          <div className="space-y-4 mt-3">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 dark:text-gray-300">
              Users
            </h2>
            <ul className="space-y-2 ">
              {users.map((user) => (
                <div className="" key={user.createdAt}>
                  <div className="w-full">
                    <li className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                          {user.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Email: {user.email}
                        </p>
                      </div>
                      <span className="text-gray-500 dark:text-gray-300">
                        Joined: {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                    </li>
                  </div>
                </div>
              ))}
              <a
                href={"/dashboard?tab=users"}
                className="flex justify-center items-center text-blue-500 pt-2"
              >
                See All
              </a>
            </ul>
          </div>
        );
      case "posts":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold dark:text-gray-300 text-gray-800 mb-4">
              Posts
            </h2>
            <ul className="space-y-2">
              {posts.map((post) => (
                <div className="" key={post.createdAt}>
                  <div className="w-full">
                    <li className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md flex justify-between items-center">
                      <div>
                        <h3 className="text-base font-semibold text-gray-700 dark:text-gray-400">
                          {post.title}
                        </h3>
                        <h3 className="text-base font-semibold text-gray-700 dark:text-gray-400">
                          UserId: {post.userId}
                        </h3>
                      </div>
                      <p className="text-gray-600">{post.body}</p>
                      <span className="text-gray-500">
                        Created: {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </li>
                  </div>
                </div>
              ))}
              <a
                href={"/dashboard?tab=posts"}
                className="flex justify-center items-center text-blue-500 pt-2"
              >
                See All
              </a>
            </ul>
          </div>
        );
      case "comments":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl dark:text-gray-300 font-bold text-gray-800 mb-4">
              Comments
            </h2>
            <ul className="space-y-2">
              {comments.map((comment) => (
                <div className="" key={comment.createdAt}>
                  <div className="w-full">
                    <li className="bg-white p-4 rounded-lg dark:bg-gray-700 shadow-md flex flex-col">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 dark:text-gray-400">
                          By: {comment.userId}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          Created:{" "}
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-300">
                          Content: {comment.content}
                        </span>
                      </div>
                    </li>
                  </div>
                </div>
              ))}
              <a
                href={"/dashboard?tab=comments"}
                className="flex justify-center items-center text-blue-500 pt-2"
              >
                See All
              </a>
            </ul>
          </div>
        );
      case "players":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl dark:text-gray-300 font-bold text-gray-800 mb-4">
              Players
            </h2>
            <ul className="space-y-2">
              {players.map((player) => (
                <div className="" key={player.createdAt}>
                  <div className="w-full">
                    <li className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-400">
                          {player.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Name: {player.playerName}
                        </p>
                      </div>
                      <span className="text-gray-500 dark:text-gray-400">
                        Joined:{" "}
                        {new Date(player.createdAt).toLocaleDateString()}
                      </span>
                    </li>
                  </div>
                </div>
              ))}
              <a
                href={"/dashboard?tab=players"}
                className="flex justify-center items-center text-blue-500 pt-2"
              >
                See All
              </a>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-900 p-4 mx-auto w-full">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center dark:text-gray-200">
        Dashboard
      </h1>
      <div className="">
        <div
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer relative my-4"
          onClick={() => setOpenCard(openCard === "users" ? null : "users")}
        >
          <div className="flex justify-between items-center w-full">
            <div>
              <p className="text-gray-600 dark:text-gray-300 flex flex-col">
                <span>TOTAL USERS</span>
                <span className="text-3xl font-semibold">{totalUsers}</span>
              </p>
            </div>
            <div className="p-2 bg-blue-500 rounded-full text-white">
              <HiOutlineUserGroup className="w-10 h-10" />
            </div>
          </div>
          <p className="text-gray-500 flex gap-2 items-center justify-start mt-4 dark:text-gray-300">
            <span className="flex justify-center items-center text-green-400">
              <HiArrowNarrowUp className="text-green-400 font-semibold text-xl" />
              {lastMonthUsers}
            </span>
            <span>Last Month:</span>
          </p>
          {openCard === "users" && (
            <div className="flex flex-col mt-4">{renderCategoryDetails()}</div>
          )}
        </div>
        <div
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer relative my-4"
          onClick={() => setOpenCard(openCard === "posts" ? null : "posts")}
        >
          <div className="flex justify-between items-center w-full">
            <div>
              <p className="text-gray-600 dark:text-gray-300 flex flex-col">
                <span>TOTAL POSTS</span>
                <span className="text-3xl font-semibold">{totalPosts}</span>
              </p>
            </div>
            <div className="p-2 bg-blue-500 rounded-full text-white">
              <HiDocumentText className="w-10 h-10" />
            </div>
          </div>
          <p className="text-gray-500 flex gap-2 items-center justify-start mt-4 dark:text-gray-300">
            <span className="flex justify-center items-center text-green-400">
              <HiArrowNarrowUp className="text-green-400 font-semibold text-xl" />
              {lastMonthPosts}
            </span>
            <span>Last Month:</span>
          </p>
          {openCard === "posts" && (
            <div className="flex flex-col mt-4">{renderCategoryDetails()}</div>
          )}
        </div>
        <div
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer relative my-4"
          onClick={() =>
            setOpenCard(openCard === "comments" ? null : "comments")
          }
        >
          <div className="flex justify-between items-center w-full">
            <div>
              <p className="text-gray-600 dark:text-gray-300 flex flex-col">
                <span>TOTAL COMMENTS</span>
                <span className="text-3xl font-semibold">{totalComments}</span>
              </p>
            </div>
            <div className="p-2 bg-blue-500 rounded-full text-white">
              <HiAnnotation className="w-10 h-10" />
            </div>
          </div>
          <p className="text-gray-500 flex gap-2 items-center justify-start mt-4 dark:text-gray-300">
            <span className="flex justify-center items-center text-green-400">
              <HiArrowNarrowUp className="text-green-400 font-semibold text-xl" />
              {lastMonthComments}
            </span>
            <span>Last Month:</span>
          </p>
          {openCard === "comments" && (
            <div className="flex flex-col mt-4">{renderCategoryDetails()}</div>
          )}
        </div>
        <div
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer relative"
          onClick={() => setOpenCard(openCard === "players" ? null : "players")}
        >
          <div className="flex justify-between items-center w-full">
            <div>
              <p className="text-gray-600 dark:text-gray-300 flex flex-col">
                <span>TOTAL PLAYERS</span>
                <span className="text-3xl font-semibold">{totalPlayers}</span>
              </p>
            </div>
            <div className="p-2 bg-blue-500 rounded-full text-white">
              <HiOutlineUserGroup className="w-10 h-10" />
            </div>
          </div>
          <p className="text-gray-500 flex gap-2 items-center justify-start mt-4 dark:text-gray-300">
            <span className="flex justify-center items-center text-green-400">
              <HiArrowNarrowUp className="text-green-400 font-semibold text-xl" />
              {lastMonthPlayers}
            </span>
            <span>Last Month:</span>
          </p>
          {openCard === "players" && (
            <div className="flex flex-col mt-4">{renderCategoryDetails()}</div>
          )}
        </div>
      </div>
    </div>
  );
}
