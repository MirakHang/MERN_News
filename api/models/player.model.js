import mongoose from "mongoose";

const playerSchema = new mongoose.Schema(
  {
    playerId: {
      type: String,
      required: true,
    },
    aboutPlayer: {
      type: String,
    },
    playerName: {
      type: String,
      required: true,
    },
    playerImage: {
      type: String,
      default:
        "https://www.pikpng.com/pngl/m/11-114289_cricket-batsman-vector-png-cricket-vector-png-clipart.png",
    },
    role: {
      type: String,
      default: "Not Available",
    },
    battingStyle: {
      type: String,
      default: "Not Available",
    },
    bowlingStyle: {
      type: String,
      default: "Not Available",
    },
    matches: {
      type: Number,
      default: 0,
    },
    innings: {
      type: Number,
      default: 0,
    },
    totalRun: {
      type: Number,
      default: 0,
    },
    higestScore: {
      type: Number,
      default: 0,
    },
    notOut: {
      type: Number,
      default: 0,
    },
    strikeRate: {
      type: Number,
      default: 0,
    },
    wicket: {
      type: Number,
      default: 0,
    },
    over: {
      type: Number,
      default: 0,
    },
    runConceded: {
      type: Number,
      default: 0,
    },
    economy: {
      type: Number,
      default: 0,
    },
    bestBowling: {
      type: Number,
      default: 0,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Player = mongoose.model("Player", playerSchema);

export default Player;
