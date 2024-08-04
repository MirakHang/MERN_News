import { Link, useLocation } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaSearch } from "react-icons/fa";
import { TextInput } from "flowbite-react";
import { MdDarkMode } from "react-icons/md";

export default function Header() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
  ];

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto pt-2 px-2">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="px-2 py-1 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 rounded-lg text-white">
              Dhoni Ko
            </span>
            News
          </Link>
          <div className="flex md:order-2">
            <div className="flex justify-center gap-2 ">
              <div className="w-[200px]">
                <form className="max-w-md mx-auto mt-1 hidden sm:block ">
                  <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                  >
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 end-0 pr-4 flex items-center ps-3 pointer-events-none cursor-pointer">
                      <FaSearch className="text-gray-500 text-xs" />
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      className="block p-2 ps-8 text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-auto"
                      placeholder="Search..."
                      required
                    />
                  </div>
                </form>
              </div>
              <div>
                <MdDarkMode className="hidden sm:flex justify-center items-center my-2 w-6 h-6" />
              </div>
            </div>
            <button className="flex items-center justify-center  my-1  text-sm font-medium text-white rounded-lg shadow-lg bg-blue-500 mx-2">
              <Link to="/sign-in" className="mx-4">
                Login
              </Link>
            </button>
            <button
              data-collapse-toggle="navbar-search"
              type="button"
              className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1 text-sm text-gray-500 rounded-lg md:hidden  focus:outline-none focus:ring-2 "
              aria-controls="navbar-search"
              aria-expanded="false"
            >
              <RxHamburgerMenu className="w-6 h-6" />
            </button>
          </div>
          <div
            className="items-center relative w-full justify-between hidden  md:flex md:w-auto md:order-1"
            id="navbar-search"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {navItems.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    className={`block py-2 px-3 rounded md:p-0 ${
                      location.pathname === item.path
                        ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700"
                        : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex justify-center gap-2 ">
          <div className="w-[200px]">
            <form className="max-w-md mx-auto mt-1 sm:hidden block ">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 end-0 pr-4 flex items-center ps-3 pointer-events-none cursor-pointer">
                  <FaSearch className="text-gray-500 text-xs" />
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block p-2 ps-8 text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-72"
                  placeholder="Search..."
                  required
                />
              </div>
            </form>
          </div>
          <div>
            <MdDarkMode className="sm:hidden flex justify-center items-center my-2 w-6 h-6" />
          </div>
        </div>
      </nav>
    </div>
  );
}
