import { Button, FileInput, Select, TextInput } from "flowbite-react";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreatePost() {
  return (
    <div className="p-3 max-w-3xl mx-auto">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
          />
          <Select>
            <option value="uncategorized">Select a category</option>
            <option value="national">National</option>
            <option value="international">International</option>
            <option value="friendly">Friendly</option>
          </Select>
        </div>
        <div
          className="flex gap-4 items-center justify-between border-dotted p-3"
          style={{ border: "red", border: "dashed", borderWidth: "1px" }}
        >
          <FileInput type="file" accept="image/*" />
          <Button
            type="button"
            // gradientDuoTone="purpleToBlue"
            size="sm"
            className="!dark:bg-red-500 bg-gray-500"
          >
            Upload Image
          </Button>
        </div>
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 "
          required
          style={{
            marginBottom: "50px",
          }}
        />
        <Button className="bg-blue-600" type="submit">
          Publish
        </Button>
      </form>
    </div>
  );
}
