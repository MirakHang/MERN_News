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

// export const getplayers = async (req, res, next) => {
//   try {
//     const startIndex = parseInt(req.body.startIndex) || 0;
//     const limit = parseInt(req.query.limit) || 2;
//     const sortDirection = req.query.order === "asc" ? 1 : -1;

//     const players = await Player.find({
//       ...(req.query.playerId && { playerId: req.query.playerId }),
//       ...(req.query.playerName && { playerName: req.query.playerName }),
//       ...(req.query.slug && { slug: req.query.slug }),
//       ...(req.query.searchTerm && {
//         $or: [
//           { playerName: { $regex: req.query.searchTerm, $options: "i" } },
//           { role: { $regex: req.query.searchTerm, $options: "i" } },
//           { battingStyle: { $regex: req.query.searchTerm, $options: "i" } },
//           { bowlingStyle: { $regex: req.query.searchTerm, $options: "i" } },
//         ],
//       }),
//     })

//       .sort({ updatedAt: sortDirection })
//       .skip(startIndex)
//       .limit(limit);

//     const totalPlayer = await Player.countDocuments();

//     const now = new Date();
//     const oneMonthAgo = new Date(
//       now.getFullYear(),
//       now.getMonth() - 1,
//       now.getDate()
//     );

//     const lastMonthPlayers = await Player.countDocuments({
//       createdAt: { $gte: oneMonthAgo },
//     });

//     console.log(players);
//     res.status(200).json({
//       players,
//       totalPlayer,
//       lastMonthPlayers,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const getplayers = async (req, res, next) => {
  try {
    // Use req.query to get startIndex from query parameters
    const startIndex = parseInt(req.query.startIndex) || 0; // Changed from req.body
    const limit = parseInt(req.query.limit) || 4;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    // Build query filter dynamically
    const filter = {
      ...(req.query.playerId && { playerId: req.query.playerId }),
      ...(req.query.playerName && { playerName: req.query.playerName }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.searchTerm && {
        $or: [
          { playerName: { $regex: req.query.searchTerm, $options: "i" } },
          { role: { $regex: req.query.searchTerm, $options: "i" } },
          { battingStyle: { $regex: req.query.searchTerm, $options: "i" } },
          { bowlingStyle: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    };

    // Query players with pagination and sorting
    const players = await Player.find(filter)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    // Get total count of documents for pagination
    const totalPlayer = await Player.countDocuments(filter);

    // Get count of documents created within the last month
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthPlayers = await Player.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    console.log(players);
    res.status(200).json({
      players,
      totalPlayer,
      lastMonthPlayers,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteplayer = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this player"));
  }
  try {
    await Player.findByIdAndDelete(req.params.playerId);
    res.status(200).json("The player has been deleted");
  } catch (error) {
    next(error);
  }
};
