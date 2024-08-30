import React, { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiChartPie,
  HiAnnotation,
} from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import { useSelector } from "react-redux";

export default function DashSiderbar() {
  const loacation = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, []);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Sidebar className="w-full md:w-52">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          {currentUser.isAdmin && (
            <a href="/dashboard?tab=dash">
              <Sidebar.Item
                active={tab === "dashboard"}
                icon={HiChartPie}
                as={"div"}
              >
                Dashboard
              </Sidebar.Item>
            </a>
          )}
          <a href={"/dashboard?tab=profile"}>
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.isAdmin ? "Admin" : "User"}
              labelColor="blue"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </a>
          {currentUser.isAdmin && (
            <a href="/dashboard?tab=posts">
              <Sidebar.Item
                active={tab === "posts"}
                icon={HiDocumentText}
                as={"div"}
              >
                Posts
              </Sidebar.Item>
            </a>
          )}
          {currentUser.isAdmin && (
            <a href="/dashboard?tab=comments">
              <Sidebar.Item
                active={tab === "comments"}
                icon={HiAnnotation}
                as={"div"}
              >
                Comments
              </Sidebar.Item>
            </a>
          )}
          {currentUser.isAdmin && (
            <a href="/dashboard?tab=users">
              <Sidebar.Item
                active={tab === "users"}
                icon={HiOutlineUserGroup}
                as={"div"}
              >
                Users
              </Sidebar.Item>
            </a>
          )}
          {currentUser.isAdmin && (
            <a href="/dashboard?tab=players">
              <Sidebar.Item
                active={tab === "players"}
                icon={HiOutlineUserGroup}
                as={"div"}
              >
                Players
              </Sidebar.Item>
            </a>
          )}

          <Sidebar.Item
            onClick={handleSignout}
            icon={HiArrowSmRight}
            className="cursor-pointer"
          >
            SignOut
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
