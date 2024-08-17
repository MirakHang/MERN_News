import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSiderbar from "../components/DashSiderbar";
import DashProfile from "../components/DashProfile";
import DashPost from "../components/DashPost";
import DashUsers from "../components/DashUsers";
import DashPlayers from "../components/DashPlayers";

export default function Dashboard() {
  const loacation = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, []);
  return (
    <div
      className=" bg-gray-50 dark:bg-gray-900 flex flex-col md:flex-row"
      style={{ minHeight: "100vh" }}
    >
      {/* SideBar */}
      <div className="md:w-56">
        <DashSiderbar />
      </div>

      {/* profile... */}
      {tab === "profile" && <DashProfile />}
      {/* posts... */}
      {tab === "posts" && <DashPost />}
      {/* users */}
      {tab === "users" && <DashUsers />}
      {/* players */}
      {tab === "players" && <DashPlayers />}
      {/* comments  */}
      {tab === "comments" && <DashComments />}
      {/* dashboard comp */}
      {tab === "dash" && <DashboardComp />}
    </div>
  );
}
