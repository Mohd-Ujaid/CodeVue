import {db} from "../libs/db.js";

export const createPlaylist = async (req, res) => {
  try {
    debugger;
    const {name, description} = req.body;
    console.log("name in createPlaylist-> ", name);
    console.log("description in createPlaylist-> ", description);
    // console.log("req.user in createPlaylist-> ", req.user.id);

    const userId = req.user.id;
    console.log("userId in createPlaylist-> ", userId);
    const playlist = await db.Playlist.create({
      data: {
        name,
        description,
        userId,
      },
    });

    res.status(200).json({
      success: true,
      message: "playlist created successfully",
      playlist,
    });
  } catch (err) {
    console.error("error creating successfully", err);
    res.status(500).json({err: "failed to create playlist"});
  }
};

export const getAllListDetails = async (req, res) => {
  try {
    // const userId = req.user.id;

    console.log("userId in all-> ", req.user.id);
    const playlist = await db.Playlist.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });
    console.log("playlist-> ", playlist);

    res.status(200).json({
      success: true,
      message: "playlist fetched successfully",
      playlist: playlist,
    });
  } catch (err) {
    console.error("error fetching successfully", err);
    res.status(500).json({err: "failed to fetched playlist"});
  }
};

export const getPlayListDetails = async (req, res) => {
  try {
    const {playlistId} = req.params;

    console.log("req.params in playlist-> ", req.params);

    console.log("playlistId in playlist-> ", playlistId);

    // const userId = req.user.id;

    const playlist = await db.playlist.findUnique({
      where: {id: playlistId, userId: req.user.id},
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });
    console.log("playlist-> ", playlist);

    if (!playlist) {
      return res.status(404).json({error: "playlist not fount"});
    }

    res.status(200).json({
      success: true,
      message: "playlist fetched successfully",
      playlist,
    });
  } catch (err) {
    console.error("error fetching successfully", err);
    res.status(500).json({err: "failed to fetched playlist"});
  }
};

export const addProblemToPlaylist = async (req, res) => {
  debugger;
  const {playlistId} = req.params;
  const {problemIds} = req.body;
  // console.log("req.body in addProblemToPlaylist-> ", req.body);

  console.log("playlistId in addProblemToPlaylist-> ", playlistId);
  console.log(
    "problemIds in addProblemToPlaylist-> ",
    problemIds.toLocaleString()
  );

  try {
    if (!Array.isArray(problemIds) || problemIds.length === 0) {
      return res.status(400).json({error: "Invalid or missing problemIds"});
    }

    console.log(
      "log .....",
      problemIds.map(problemId => ({
        playListId: playlistId,
        problemId: problemId.toLocaleString(),
      }))
    );

    console.log("playlistId in addProblemToPlaylist-> ", playlistId);

    console.log("before");
    console.log("problem id in addProblemToPlaylist-> ", problemIds);
    console.log("after");
    //  create records from each problem in the playlist

    const problemInPlaylist = await db.problemInPlaylist.createMany({
      data: problemIds.map(problemId => ({
        playListId: playlistId,
        problemId: problemId.toString(), // Ensure problemId is a string
      })),
    });
    // console.log("-> ", data);
    console.log("problemInPlaylist-> ", problemInPlaylist);

    res.status(201).json({
      success: true,
      message: "problems added to playlist successfully",
      // problemInPlaylist,
    });
  } catch (err) {
    console.error("error adding in playlist", err);
    res.status(500).json({err: "failed to adding in playlist"});
  }
};

export const deletePlaylist = async (req, res) => {
  try {
    const {playlistId} = req.params;

    const userId = req.user.id;

    const deletedplaylist = await db.playlist.delete({
      where: {
        id: playlistId,
        userId,
      },
    });

    res.status(200).json({
      success: true,
      message: "playlist deleted successfully",
      deletedplaylist,
    });
  } catch (err) {
    console.error("error in deleting playlist", err);
    res.status(500).json({err: "failed to delete playlist"});
  }
};

export const removeProblemFromPlaylist = async (req, res) => {
  try {
    const {playlistId} = req.params;
    const {problemIds} = req.body;

    // const userId = req.user.id;

    const deletedproblem = await db.problemInPlaylist.deleteMany({
      where: {
        playlistId,
        problemId: {
          id: problemIds,
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "problem remove from playlist successfully",
      deletedproblem,
    });
  } catch (err) {
    console.error("error removing problem from playlist", err);
    res.status(500).json({err: "failed removing problem from playlist"});
  }
};
