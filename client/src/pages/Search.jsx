import { Button, TextInput } from "flowbite-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Search() {
  const [width, setWidth] = useState("10px");
  const [filterData, setFilterData] = useState({
    sort: "desc",
    category: "uncategorized",
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(filterData, "111");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setFilterData({
        ...filterData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }
    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 12) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth >= 640) {
        // Adjust the breakpoint as needed for md and lg screens
        setWidth("100%"); // Full width for medium and large screens
      } else {
        setWidth("290px"); // Fixed width for small screens
      }
    };

    // Call the function initially and on resize
    updateWidth();
    window.addEventListener("resize", updateWidth);

    // Clean up event listener on unmount
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleChange = (e) => {
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setFilterData({ ...filterData, sort: "order" });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setFilterData({ ...filterData, category });
    }
  };

  //   const handleSubmit = (e) => {
  //     const urlParams = new URLSearchParams(location.search);
  //     urlParams.set("sort", filterData.sort);
  //     urlParams.set("category", filterData.category);
  //     const searchQuery = urlParams.toString();
  //     navigator(`/search${searchQuery}`);
  //   };
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", filterData.searchTerm);
    urlParams.set("sort", filterData.sort);
    urlParams.set("category", filterData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className="flex flex-col bg-gray-100 w-full dark:bg-gray-900">
      {/* Filters */}
      <form
        className="bg-white shadow-md p-2 flex items-center space-x-3 dark:bg-gray-900 w-full"
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <select
          className="border rounded-full p-1 text-sm dark:bg-gray-900"
          onChange={handleChange}
          defaultValue={filterData.sort}
          id="sort"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
        <select
          className="border rounded-full p-1 text-sm dark:bg-gray-900"
          onChange={handleChange}
          defaultValue={filterData.category}
          id="category"
        >
          <option value="national">National</option>
          <option value="international">International</option>
          <option value="uncategorized">Uncharacterized</option>
        </select>
        <Button type="submit" outline gradientDuoTone="purpleToPink">
          Apply Filters
        </Button>
      </form>

      {/* Search Results */}
      <main className="flex-grow py-3">
        <div className="gap-4 w-full mx-auto lg:px-12 md:px-6 sm:px-4">
          {!loading && posts.length === 0 && (
            <p className="text-xl text-gray-500" style={{ height: "250px" }}>
              No Post Found
            </p>
          )}
          {loading && (
            <p className="text-xl text-gray-500" style={{ height: "250px" }}>
              Loading...
            </p>
          )}
          {/* Example search result item */}
          {!loading &&
            posts &&
            posts.map((post) => (
              <div
                className="bg-gray-100 overflow-hidden mx-auto flex flex-col sm:flex-row md:flex-row lg:flex-row my-4 dark:bg-gray-900 shadow-md"
                style={{ width }}
                key={post.slug}
              >
                <div className="relative">
                  <img
                    src={post.image}
                    alt="Post Image"
                    className="w-96 h-48 object-cover rounded-md"
                  />
                </div>
                <div className="p-3 flex flex-col w-full">
                  <h2 className="text-xl md:text-md font-semibold">
                    {post.title}
                  </h2>
                  <p className="truncate text-md text-gray-700 dark:text-gray-400 flex justify-end mb-2 font-semibold">
                    {moment(post.createdAt).fromNow()}
                  </p>
                  <p
                    className="text-gray-700 text-md md:text-sm font-medium dark:text-gray-500"
                    dangerouslySetInnerHTML={{ __html: post && post.content }}
                  ></p>

                  <div className="tracking-wide text-md text-gray-700 dark:text-gray-400">
                    Category: {post.category}
                  </div>
                </div>
              </div>
            ))}

          {/* Repeat the above item for more search results */}
        </div>
      </main>
    </div>
  );
}
