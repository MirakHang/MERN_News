import React, { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { HiUser, HiArrowSmRight } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

export default function DashSiderbar() {
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
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              as={"div"}
              active={tab === "profile"}
              icon={HiUser}
              label={"User"}
              labelColor="blue"
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer">
            SignOut
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
