import { Spinner } from "flowbite-react";
import React from "react";

export default function Projects() {
  return (
    <div
      className="bg-gray-50 dark:bg-gray-900 flex justify-center items-center text-2xl flex-col gap-6"
      style={{ height: "330px" }}
    >
      This page is in development phase will be updating soon...
      <Spinner className="w-10 h-10 text-blue-700" />
    </div>
  );
}
