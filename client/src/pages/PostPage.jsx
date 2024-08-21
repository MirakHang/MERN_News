import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Spinner } from "flowbite-react";
import { FaRegHeart } from "react-icons/fa";
import { LiaCommentDots } from "react-icons/lia";
import CommentSection from "../components/CommentSection";

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState([]);

  // useEffect(() => {
  //   const fetchPost = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await fetch("/api/post/getposts");
  //       const data = await res.json();
  //       if (!res.ok) {
  //         setError(true);
  //         setLoading(false);
  //         return;
  //       }
  //       if (res.ok) {
  //         setPost(data.posts[0]);
  //         setLoading(false);
  //         setError(false);
  //       }
  //     } catch (error) {
  //       setError(true);
  //       setLoading(false);
  //     }
  //   };
  //   fetchPost();
  // }, [postSlug]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  if (loading)
    return (
      <div className="flex justify-center items-center ">
        <Spinner />
      </div>
    );
  return (
    <div className="px-2">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className="items-center flex justify-center mt-5"
      >
        <Button color="blue" size="xs" pill>
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.image}
        className="mt-10 p-3 mx-auto object-cover"
        style={{ maxHeight: "500px" }}
      />
      <div className="flex justify-between px-3 border-b border-gray-500 mx-auto mb-2 w-full max-w-2xl text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post.content.length / 1000).toFixed(2)} mins to read
        </span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      {/* <div className="max-w-md mx-auto my-8 bg-white rounded-md shadow-md">
        <div className="flex-col">
          <div className="md:shrink-0 lg:shrink-0">
            <img
              className=" object-cover rounded-md md:w-48 lg:w-48 md:h-auto lg:h-auto"
              src={post.image}
              alt="Card Image"
              style={{
                width: "100%",
                height: "160px",
              }}
            />
          </div>
          <div className="p-3">
            <h3 className="block text-xl leading-tight font-medium hover:underline text-gray-900">
              {post.title}
            </h3>
            <div className="tracking-wide text-sm text-gray-800 font-semibold">
              Category: {post.category}
            </div>
            <p className="mt-2 text-gray-700 text-sm line-clamp-2">
              {post.content}
            </p>
            <div className="flex items-center mt-2 gap-4">
              <div className="text-gray-500 hover:text-indigo-600 flex justify-center items-center">
                <FaRegHeart />
                <span className="ml-2">Like</span>
              </div>
              <div className="text-gray-500 hover:text-indigo-600 flex justify-center items-center">
                <LiaCommentDots className="h-5 w-5" />
                <span className="ml-2">Comment</span>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div>
        <CommentSection postId={post._id} />
      </div>
    </div>
  );
}
