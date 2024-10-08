import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Projects from "./pages/Projects";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import CreatePost from "./pages/CreatePost";
import CreatePlayer from "./pages/CreatePlayer";
import UpdatePost from "./pages/UpdatePost";
import PostPage from "./pages/PostPage";
import UpdatePlayer from "./pages/UpdatePlayer";
import PlayerPage from "./pages/PlayerPage";
import ScrollToTop from "./components/ScrollToTop";
import ChangeSliderImages from "./pages/ChangeSliderImages";
import Search from "./pages/Search";

export default function App() {
  return (
    <div
      className=" bg-gray-50 dark:bg-gray-900"
      style={{ minHeight: "100vh" }}
    >
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/teams" element={<Projects />} />
          <Route path="/post/:postSlug" element={<PostPage />} />
          <Route path="/player/:playerSlug" element={<PlayerPage />} />
          <Route path="/Search" element={<Search />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<OnlyAdminPrivateRoute />}>
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post/:postId" element={<UpdatePost />} />
            <Route path="/create-player" element={<CreatePlayer />} />
            <Route path="/update-player/:playerId" element={<UpdatePlayer />} />
            <Route
              path="/update-slider-image"
              element={<ChangeSliderImages />}
            />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
