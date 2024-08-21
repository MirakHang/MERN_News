import { Button, Modal } from "flowbite-react";
import { formatDistanceToNow } from "date-fns";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashPlayers() {
  const { currentUser } = useSelector((state) => state.user);
  const [playersList, setPlayersList] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [playerIdToDelete, setPlayerIdToDelete] = useState("");

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await fetch(
          `/api/player/getplayers?userId=${currentUser._id}`
        );
        const data = await res.json();
        if (res.ok) {
          setPlayersList(data.players);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPlayers();
    }
  }, [currentUser._id]);

  const handleDeletePlayer = async () => {
    setShowDeleteModal(false);
    try {
      const res = await fetch(
        `/api/player/deleteplayer/${playerIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setPlayersList((prev) =>
          prev.filter((player) => player._id !== playerIdToDelete)
        );
      }
    } catch (error) {}
  };

  const handleShowMore = async () => {
    const startIndex = playersList.length;
    try {
      const res = await fetch(
        `/api/player/getplayers?userId=${currentUser._id}&startIndex=${startIndex}&limit=4`
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
        if (data.players.length < 12) {
          // Match the limit used in server-side
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className=" flex justify-center mx-auto w-full"
      style={{ height: "630px", overflowY: "auto" }}
    >
      {currentUser.isAdmin && playersList.length > 0 ? (
        <>
          <div style={{ height: "30px" }}>
            <div
              className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-6 overflow-y-scroll scrollbar  scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"
              style={{
                overflowY: "auto",
              }}
            >
              {playersList.map((player) => (
                <div
                  className="p-2 my-0"
                  key={player.slug}
                  to={`/player/${player.slug}`}
                >
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700 py-0 my-0">
                    <li className="py-3 border-b border-gray-500">
                      <div className="flex items-center gap-3">
                        <div className="shrink-0">
                          <img
                            alt={player.image}
                            src={player.image}
                            className="rounded-full w-14 h-14"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                            {player.playerName}
                          </p>
                          <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                            Edited{" "}
                            {formatDistanceToNow(new Date(player.updatedAt))}{" "}
                            ago
                          </p>
                        </div>
                        <div className="flex flex-col items-start gap-1">
                          <Link to={`/update-player/${player._id}`}>
                            <button className="text-blue-500 hover:underline text-sm">
                              Edit
                            </button>
                          </Link>
                          <button
                            className="dark:hover:text-white  text-red-600 text-sm py-1 hover:underline rounded-md transition-colors duration-200"
                            onClick={() => {
                              setShowDeleteModal(true);
                              setPlayerIdToDelete(player._id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
            {showMore && (
              <button
                className="w-full text-blue-500 self-center text-sm py-7"
                onClick={handleShowMore}
              >
                Show More
              </button>
            )}
          </div>
        </>
      ) : (
        <p>No players to show!!</p>
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
                onClick={handleDeletePlayer}
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
