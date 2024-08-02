import "flowbite/dist/flowbite.css";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import React from "react";
// import { Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const path = useLocation().path;

  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-400 rounded-lg text-white">
          Dhoni Ko
        </span>
        News
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={IoSearchOutline}
          className="hidden lg:inline"
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray">
        <IoSearchOutline />
      </Button>
      <div className="flex gap-2 md:order-2">
        <button className="w-12 h-10 hidden sm:inline" color="gray">
          <FaMoon />
        </button>
        <Link to="/sign-in">
          <Button className="bg-blue-500 rounded-lg px-2">Sign In</Button>
        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link as="div" active={path === "/"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link as="div" active={path === "/about"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link as="div" active={path === "/projects"}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
