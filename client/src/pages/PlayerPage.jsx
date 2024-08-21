import { Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function PlayerPage() {
  const [playersList, setPlayersList] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { playerSlug } = useParams();
  // State to track which section is active
  const [activeSection, setActiveSection] = useState("player");

  // fetching players
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/player/getplayers?slug=${playerSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPlayersList(data.players[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPlayers();
  }, [playerSlug]);

  if (loading)
    return (
      <div className="flex justify-center items-center ">
        <Spinner />
      </div>
    );

  // Player component
  const Player = () => (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md">
      <div>
        <img
          src={playersList.image}
          alt="player image"
          className=" flex justify-center items-center rounded-full mx-auto object-cover"
          style={{ width: "120px", height: "120px" }}
        />
        <h3 className="flex justify-center items-center mt-2 font-semibold text-lg ">
          {playersList.playerName}
        </h3>
      </div>
      <div className="">
        <h1 className="flex justify-center items-center font-semibold text-green-400">
          Personal Information
        </h1>
        <div className="flex justify-between mt-2">
          <div>Born</div>
          <div>To Do</div>
        </div>
        <div className="flex justify-between mt-2">
          <div>Role</div>
          <div>{playersList.role}</div>
        </div>
        <div className="flex justify-between mt-2">
          <div>Batting Style</div>
          <div>{playersList.battingStyle}</div>
        </div>
        <div className="flex justify-between mt-2">
          <div>Bowling Style</div>
          <div>{playersList.bowlingStyle}</div>
        </div>
      </div>
    </div>
  );

  // Batting component
  const Batting = () => (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md">
      <div>
        <div className="">
          <h2 className="flex justify-center items-center font-semibold text-green-400 mt-4">
            Batting Statistics
          </h2>
          <div className="flex justify-between mt-2">
            <div>Matches</div>
            <div>{playersList.matches}</div>
          </div>
          <div className="flex justify-between mt-2">
            <div>Innings</div>
            <div>{playersList.innings}</div>
          </div>
          <div className="flex justify-between mt-2">
            <div>Total Runs</div>
            <div>{playersList.totalRun}</div>
          </div>
          <div className="flex justify-between mt-2">
            <div>Highest Score</div>
            <div>{playersList.highestScore}</div>
          </div>
          <div className="flex justify-between mt-2">
            <div>Not Out</div>
            <div>{playersList.notOut}</div>
          </div>
          <div className="flex justify-between mt-2">
            <div>Average</div>
            <div>To Do</div>
          </div>
          <div className="flex justify-between mt-2">
            <div>Strike Rate</div>
            <div>{playersList.strikeRate}</div>
          </div>
        </div>
      </div>
    </div>
  );

  // Batting component
  const Bowling = () => (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md">
      <div>
        <h2 className="flex justify-center items-center font-semibold text-green-400 mt-4">
          Bowling Statistics
        </h2>
        <div className="flex justify-between mt-2">
          <div>Matches</div>
          <div>{playersList.matches}</div>
        </div>
        <div className="flex justify-between mt-2">
          <div>Innings</div>
          <div>{playersList.innings}</div>
        </div>
        <div className="flex justify-between mt-2">
          <div>Wickets</div>
          <div>To Do</div>
        </div>
        <div className="flex justify-between mt-2">
          <div>Overs</div>
          <div>To Do</div>
        </div>
        <div className="flex justify-between mt-2">
          <div>Run Conceded</div>
          <div>{playersList.runConceded}</div>
        </div>
        <div className="flex justify-between mt-2">
          <div>Economy</div>
          <div>{playersList.economy}</div>
        </div>
        <div className="flex justify-between mt-2">
          <div>Best Bowling</div>
          <div>{playersList.bestBowling}</div>
        </div>
      </div>
    </div>
  );

  console.log(playerSlug);
  console.log(playersList);
  console.log(playersList.playerName, "22");
  return (
    <div className=" flex items-center justify-center">
      <div className="container mx-auto p-6">
        <div className="flex justify-center gap-4 mb-6">
          {/* Button to show Player section */}
          <button
            className={`px-4 py-2 font-semibold dark:text-white  ${
              activeSection === "player"
                ? " border-b-2 dark:border-gray-400 border-green-500"
                : ""
            }`}
            onClick={() => setActiveSection("player")}
          >
            Player
          </button>

          {/* Button to show Batting section */}
          <button
            className={`px-4 py-2 font-semibold dark:text-white ${
              activeSection === "batting"
                ? " border-b-2 dark:border-gray-400 border-green-500"
                : ""
            }`}
            onClick={() => setActiveSection("batting")}
          >
            Batting
          </button>

          {/* Button to show Bowling section */}
          <button
            className={`px-4 py-2 font-semibold dark:text-white ${
              activeSection === "bowling"
                ? " border-b-2 dark:border-gray-400 border-green-500"
                : ""
            }`}
            onClick={() => setActiveSection("bowling")}
          >
            Bowling
          </button>
        </div>

        <div className="mt-4">
          {/* Conditionally render the Player or Batting component */}
          {activeSection === "player" && <Player />}
          {activeSection === "batting" && <Batting />}
          {activeSection === "bowling" && <Bowling />}
        </div>
      </div>
    </div>
  );
}
