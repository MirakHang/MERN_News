import {
  Alert,
  Button,
  FileInput,
  Select,
  Textarea,
  TextInput,
} from "flowbite-react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";

export default function CreatePlayer() {
  const [file, setFile] = useState([]);
  const navigate = useNavigate();
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please upload an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      // console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //for preventing refreshing page when this function runs
    try {
      const res = await fetch("/api/player/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        navigate(`/player/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };
  console.log(formData, "aaaa");
  return (
    <div className="p-3 lg:px-8 md:px-6 px-4 py-4 max-w-3xl mx-auto container">
      <h1 className="text-center text-3xl my-7 font-semibold">Add a player</h1>
      <form className="flex flex-col gap-4 px-8" onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Player Name"
          required
          id="playerName"
          className="flex-1"
          onChange={(e) =>
            setFormData({ ...formData, playerName: e.target.value })
          }
        />
        <Textarea
          type="text"
          placeholder="About something about this player or you may can skip"
          id="aboutPlayer"
          className="flex-1"
          onChange={(e) =>
            setFormData({ ...formData, aboutPlayer: e.target.value })
          }
        />
        <TextInput
          type="number"
          placeholder="Matches"
          id="matches"
          className="flex-1"
          onChange={(e) =>
            setFormData({ ...formData, matches: e.target.value })
          }
        />

        <TextInput
          type="number"
          placeholder="Innings"
          id="innings"
          className="flex-1"
          onChange={(e) =>
            setFormData({ ...formData, innings: e.target.value })
          }
        />

        <TextInput
          type="number"
          placeholder="Total Runs"
          id="totalRun"
          className="flex-1"
          onChange={(e) =>
            setFormData({ ...formData, totalRun: e.target.value })
          }
        />

        <TextInput
          type="number"
          placeholder="Highest Score"
          id="higestScore"
          className="flex-1"
          onChange={(e) =>
            setFormData({ ...formData, highestScore: e.target.value })
          }
        />

        <TextInput
          type="number"
          placeholder="Not Out"
          id="notOut"
          className="flex-1"
          onChange={(e) => setFormData({ ...formData, notOut: e.target.value })}
        />

        <TextInput
          type="number"
          placeholder="Strike Rate"
          id="strikeRate"
          className="flex-1"
          onChange={(e) =>
            setFormData({ ...formData, strikeRate: e.target.value })
          }
        />

        <TextInput
          type="number"
          placeholder="Wickets"
          id="wicket"
          className="flex-1"
          onChange={(e) => setFormData({ ...formData, wicket: e.target.value })}
        />

        <TextInput
          type="number"
          placeholder="Overs"
          id="over"
          className="flex-1"
          onChange={(e) => setFormData({ ...formData, over: e.target.value })}
        />

        <TextInput
          type="number"
          placeholder="Runs Conceded"
          id="runConceded"
          className="flex-1"
          onChange={(e) =>
            setFormData({ ...formData, runConceded: e.target.value })
          }
        />

        <TextInput
          type="number"
          placeholder="Economy"
          id="economy"
          className="flex-1"
          onChange={(e) =>
            setFormData({ ...formData, economy: e.target.value })
          }
        />

        <TextInput
          type="number"
          placeholder="Best Bowling"
          id="bestBowling"
          className="flex-1"
          onChange={(e) =>
            setFormData({ ...formData, bestBowling: e.target.value })
          }
        />

        <Select
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
          <option value="Not Available">Select a role</option>
          <option value="Square leg">Square leg</option>
          <option value="Cover">Cover</option>
          <option value="Gully">Gully</option>
          <option value="Mid off">Mid off</option>
          <option value="Wicket">Wicket</option>
          <option value="Point">Point</option>
          <option value="Slips">Slips</option>
          <option value="Fine leg">Fine leg</option>
          <option value="Third Man">Third Man</option>
          <option value="Wicket-keeper">Wicket-keeper</option>
          <option value="Long stop">Long stop</option>
          <option value="Sweeper">Sweeper</option>
          <option value="Backward Point: A Cricket Podcast">
            Backward Point: A Cricket Podcast
          </option>
          <option value="XtraCover">XtraCover</option>
          <option value="Short leg">Short leg</option>
          <option value="Captain">Captain</option>
          <option value="Fielders">Fielders</option>
          <option value="Leg gully">Leg gully</option>
          <option value="Short leg (bat pad)">Short leg (bat pad)</option>
        </Select>
        <Select
          onChange={(e) =>
            setFormData({ ...formData, batingStyle: e.target.value })
          }
        >
          <option value="Not Available">Batting Style</option>
          <option value="Pull">Pull</option>
          <option value="Sweep">Sweep</option>
          <option value="Straight drive">Straight drive</option>
          <option value="Backlift">Backlift</option>
          <option value="Cricket bat">Cricket bat</option>
          <option value="Cut">Cut</option>
          <option value="Defend your off stump">Defend your off stump</option>
          <option value="Drive">Drive</option>
          <option value="Feet position">Feet position</option>
          <option value="Head position">Head position</option>
          <option value="Hook">Hook</option>
          <option value="Knee bend">Knee bend</option>
          <option value="Leg glance">Leg glance</option>
          <option value="Mid wicket">Mid wicket</option>
          <option value="Reverse sweep">Reverse sweep</option>
        </Select>
        <Select
          onChange={(e) =>
            setFormData({ ...formData, bowlingStyle: e.target.value })
          }
        >
          <option value="Not Available">Bowling style</option>
          <option value="Cutter">Cutter</option>
          <option value="Bouncer">Bouncer</option>
          <option value="Slow ball">Slow ball</option>
          <option value="Yorker">Yorker</option>
          <option value="Reverse swing">Reverse swing</option>
          <option value="Arm ball">Arm ball</option>
          <option value="Doosra">Doosra</option>
          <option value="Swing bowling">Swing bowling</option>
          <option value="Top Spinner">Top Spinner</option>
          <option value="Carrom ball">Carrom ball</option>
          <option value="Googly">Googly</option>
          <option value="Leg spin">Leg spin</option>
          <option value="Seam bowling">Seam bowling</option>
          <option value="Finger spin">Finger spin</option>
          <option value="Flipper">Flipper</option>
          <option value="Fast bowling">Fast bowling</option>
          <option value="Spin bowling">Spin bowling</option>
          <option value="Off spin">Off spin</option>
        </Select>

        <div
          className="flex flex-col md:flex-row lg-flex-row sm:flex-row gap-4 items-center justify-between border-dotted p-3"
          style={{ border: "red", border: "dashed", borderWidth: "1px" }}
        >
          <div>
            <FileInput
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div>
            <Button
              type="button"
              onClick={handleUploadImage}
              size="sm"
              className="!dark:bg-red-500 bg-gray-500"
              disabled={imageUploadProgress}
            >
              {imageUploadProgress ? (
                <div className="w-16 h-16 ">
                  <CircularProgressbar
                    value={imageUploadProgress}
                    text={`${imageUploadProgress || 0}%`}
                  />
                </div>
              ) : (
                "Upload Image"
              )}
            </Button>
          </div>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}

        <Button className="bg-blue-600" type="submit">
          Add
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
