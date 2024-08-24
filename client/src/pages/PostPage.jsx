import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Spinner } from "flowbite-react";
import { FaRegHeart } from "react-icons/fa";
import { LiaCommentDots } from "react-icons/lia";
import CommentSection from "../components/CommentSection";
import RecentPostCard from "../components/RecentPostCard";

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState([]);
  const [recentNews, setRecentNews] = useState([]);

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

  // Recent News
  useEffect(() => {
    try {
      const fetchRecentNews = async () => {
        const res = await fetch("/api/post/getposts?limit=3");
        const data = await res.json();
        if (res.ok) {
          setRecentNews(data.posts);
        }
      };
      fetchRecentNews();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  // console.log(post._id, "1");
  // console.log(recentNews[4]._id, "2");

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
      <div>
        <CommentSection postId={post._id} />
        <h1 className="text-lg font-bold my-5 flex justify-center">
          Recent News
        </h1>
        <div className="justify-center items-center mb-5 flex flex-wrap gap-5">
          {recentNews &&
            recentNews.map((post) => (
              <RecentPostCard key={post._id} post={post} />
            ))}
        </div>
      </div>
    </div>
  );
}
