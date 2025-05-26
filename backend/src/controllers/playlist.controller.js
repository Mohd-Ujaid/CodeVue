import { db } from "../libs/db.js";

export const createPlaylist = async (req, res) => {
  try {
    const { name, description } = req.body;

    const userId = req.user.id;
    const playlist = await db.playlist.create({
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
    res.status(500).json({ err: "failed to create playlist" });
  }
};

export const getAllListDetails = async (req, res) => {
  try {
    const userId = req.user.id;

    const playlist = await db.playlist.findMany({
      where: {
        userId,
      },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "playlist fetched successfully",
      playlist,
    });
  } catch (err) {
    console.error("error fetching successfully", err);
    res.status(500).json({ err: "failed to fetched playlist" });
  }
};

export const getPlayListDetails = async (req, res) => {
  try {
    const { playlistId } = req.params;

    const userId = req.user.id;

    const playlist = await db.playlist.findUnique({
      where: {
        id: playlistId,
        userId,
      },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });

    if (!playlist) {
      return res.status(404).json({ error: "playlist not fount" });
    }

    res.status(200).json({
      success: true,
      message: "playlist fetched successfully",
      playlist,
    });
  } catch (err) {
    console.error("error fetching successfully", err);
    res.status(500).json({ err: "failed to fetched playlist" });
  }
};

export const addProblemToPlaylist = async (req, res) => {
  const { playlistId } = req.params;
  const { problemIds } = req.body;

  try {
    if (!Array.isArray(problemIds) || problemIds.length === 0) {
      return res.status(400).json({ error: "Invalid or missing problemId" });
    }

    //  create records from each problems in the playlist

    const problemInPlaylist = await db.problemInPlaylist.createMany({
      data: problemIds.map((problemId) => {
        playlistId, problemId;
      }),
    });

    res.status(201).json({
      success: true,
      message: "problems added to playlist successfully",
      problemInPlaylist,
    });
  } catch (err) {
    console.error("error adding in playlist", err);
    res.status(500).json({ err: "failed to adding in playlist" });
  }
};

export const deletePlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;

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
    res.status(500).json({ err: "failed to delete playlist" });
  }
};

export const removeProblemFromPlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { problemIds } = req.body;

    const userId = req.user.id;

    const deletedproblem = await db.problemInPlaylist.deleteMany({
      where: {
        playlistId,
        problemId: {
          in: problemIds,
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
    res.status(500).json({ err: "failed removing problem from playlist" });
  }
};
