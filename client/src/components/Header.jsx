import { Link, useLocation } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaSearch } from "react-icons/fa";
import { TextInput } from "flowbite-react";

export default function Header() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
  ];

  return (
    // <nav className="bg-white border-gray-200 dark:bg-gray-900">
    //   <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    //     <Link
    //       to="/"
    //       className="flex items-center space-x-3 rtl:space-x-reverse"
    //     >
    //       <span className="px-2 py-1 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 rounded-lg text-white">
    //         Dhoni Ko
    //       </span>
    //       News
    //     </Link>
    //     <div className="flex md:order-2">
    //       <form className="rounded-xl">
    //         <div className="relative">
    //           <TextInput
    //             type="text"
    //             placeholder="Search..."
    //             className="pl-10 pr-4 py-2"
    //           />
    //           <div className="absolute inset-y-0 left-0 flex items-center pl-3">
    //             <FaSearch className="text-gray-500" />
    //           </div>
    //         </div>
    //       </form>
    //       <button
    //         data-collapse-toggle="navbar-search"
    //         type="button"
    //         className="inline-flex items-center justify-center w-12 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 border"
    //         aria-controls="navbar-search"
    //         aria-expanded="false"
    //       >
    //         <RxHamburgerMenu className="w-6 h-6" />
    //       </button>
    //     </div>
    //     <div
    //       className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
    //       id="navbar-search"
    //     >
    //       <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
    //         {navItems.map((item, idx) => (
    //           <li key={idx}>
    //             <Link
    //               to={item.path}
    //               className={`block py-2 px-3 rounded md:p-0 ${
    //                 location.pathname === item.path
    //                   ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700"
    //                   : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
    //               }`}
    //             >
    //               {item.name}
    //             </Link>
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   </div>
    // </nav>
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
            <form className="rounded-xl">
              <div className=" flex justify-center gap-2">
                <div>
                  <TextInput
                    type="text"
                    placeholder="Search..."
                    className="pl-8 pr-2 py-1 text-sm hidden lg:flex sm:flex md:flex"
                  />
                </div>
                <div className="  lg:flex sm:flex md:flex items-center hidden">
                  <FaSearch className="text-gray-500 text-sm" />
                </div>
              </div>
            </form>

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
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
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
        <form className="max-w-md mx-auto px-2 mt-1 sm:hidden block">
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
              className="block w-full p-2 ps-8 text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
              required
            />
            {/* <button
              type="submit"
              className="text-white absolute end-1.5 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button> */}
          </div>
        </form>
      </nav>
    </div>
  );
}
