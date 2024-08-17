import Player from "../models/player.model.js";
import { errorHandler } from "../utils/error.js";

export const createplayer = async (req, res, next) => {
  if (!req.user.isAdmin) {
    next(errorHandler(403, "You are not allowed to add players"));
  }
  if (!req.body.playerName) {
    return next(errorHandler(400, "Please provide all the fields"));
  }
  console.log(req.body.playerName);
  const slug = req.body.playerName.split(" ").join("-").toLowerCase();
  const newPlayer = new Player({
    ...req.body,
    slug,
    playerId: req.user.id,
  });
  console.log(slug);
  try {
    const savedPlayer = await newPlayer.save();
    res.status(201).json(savedPlayer);
  } catch (error) {
    next(error);
  }
};

export const getplayers = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.body.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 12;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const players = await Player.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.playerName && { playerName: req.query.playerName }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.searchTerm && {
        $or: [
          { playerName: { $regex: req.query.searchTerm, $options: "i" } },
          { role: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPlayer = await Player.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPlayers = await Player.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      players,
      totalPlayer,
      lastMonthPlayers,
    });
  } catch (error) {
    next(error);
  }
};
