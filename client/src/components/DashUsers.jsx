import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Modal, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashUsers() {
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 8) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?&startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 8) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        setShowDeleteModal(false);
      } else {
        console.log(data.message);
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
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <div
            className="grid  justify-center items-center md:grid-cols-1 lg:grid-cols-2 grid-cols-1 gap-0 "
            style={{
              overflowY: "auto",
            }}
          >
            {users.map((user) => (
              // <div className="p-2 mt-2" key={user._id}>
              //   <div className="flex flex-col gap-1 md:flex-row sm:flex-row items-center bg-gray-100 border border-gray-200 rounded-lg shadow dark:border-gray-700 dark:bg-gray-800">
              //     <div className="">
              //       <img
              //         className="object-cover rounded-full p-2 w-auto"
              //         style={{
              //           width: "200px",
              //           height: "190px",
              //         }}
              //         src={user.profilePicture}
              //         alt={user.profilePicture}
              //       />
              //     </div>
              //     <div className="flex flex-col justify-between p-2 leading-normal w-full md:w-1/2">
              //       <h5 className="mb-2 text-2xl font-medium tracking-tight text-gray-900 dark:text-white">
              //         {user.username}
              //       </h5>
              //       <p className="mb-2 font-normal text-gray-700 dark:text-gray-400 line-clamp-3 ">
              //         User Name: {user.username}
              //       </p>
              //       <p className="mb-2 font-normal text-gray-700 dark:text-gray-400 line-clamp-3 flex gap-2">
              //         Admin:
              //         {user.isAdmin ? (
              //           <FaCheck className="text-green-500 self-center w-5 h-5" />
              //         ) : (
              //           <FaTimes className="text-red-500 self-center w-5 h-5" />
              //         )}
              //       </p>
              //       <p
              //         className="font-normal text-gray-700 dark:text-gray-400 "
              //         style={{
              //           height: "50px",
              //           display: "-webkit-box",
              //           WebkitLineClamp: 2,
              //           WebkitBoxOrient: "vertical",
              //           overflow: "hidden",
              //           textOverflow: "ellipsis",
              //         }}
              //       >
              //         Email: {user.email}
              //       </p>
              //       <div>
              //         <span className="text-gray-400">
              //           Created Date:{" "}
              //           {new Date(user.createdAt).toLocaleDateString()}
              //         </span>
              //       </div>
              //       <div className="flex gap-4">
              //         <div className="flex items-center gap-1">
              //           <MdDelete className="w-4 h-4 text-red-600 dark:hover:text-gray-700" />
              //           <button
              //             className="dark:hover:text-white  text-red-600 px-2 py-1 rounded-md transition-colors duration-200"
              //             onClick={() => {
              //               setShowDeleteModal(true);
              //               setUserIdToDelete(user._id);
              //             }}
              //           >
              //             Delete
              //           </button>
              //         </div>
              //       </div>
              //     </div>
              //   </div>
              // </div>
              <div className="p-2 mt-2" key={user._id}>
                <div className="flex flex-col gap-4 md:flex-row sm:flex-row items-center bg-gray-100 border border-gray-200 rounded-lg shadow dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex-shrink-0">
                    <img
                      className="object-cover rounded-full p-2 w-auto"
                      style={{
                        width: "150px", // Reduce the size for smaller screens
                        height: "150px",
                      }}
                      src={user.profilePicture}
                      alt={user.username}
                    />
                  </div>
                  <div className="flex flex-col justify-between p-4 leading-normal w-full md:w-3/4">
                    <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                      {user.username}
                    </h5>
                    <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">
                      User Name: {user.username}
                    </p>
                    <p className="mb-2 font-normal text-gray-700 dark:text-gray-400 flex gap-2">
                      Admin:
                      {user.isAdmin ? (
                        <FaCheck className="text-green-500 self-center w-5 h-5" />
                      ) : (
                        <FaTimes className="text-red-500 self-center w-5 h-5" />
                      )}
                    </p>
                    <p
                      className="font-normal text-gray-700 dark:text-gray-400"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Email: {user.email}
                    </p>
                    <div>
                      <span className="text-gray-400">
                        Created Date:{" "}
                        {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <MdDelete className="w-4 h-4 text-red-600 dark:hover:text-gray-700" />
                        <button
                          className="dark:hover:text-white text-red-600 px-2 py-1 rounded-md transition-colors duration-200"
                          onClick={() => {
                            setShowDeleteModal(true);
                            setUserIdToDelete(user._id);
                          }}
                        >
                          Delete
                        </button>
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
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
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
