import {db} from "../libs/db.js";

export const getDiscussions = async (req, res) => {
  try {
    const discussions = await db.DiscussionComment.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            // profilePicture: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Discussions fetched successfully",
      discussions,
    });
  } catch (err) {
    console.error("Fetch discussions error : ", err);
    res.status(500).json({error: "Failed to fetch discussions"});
  }
};
export const postDiscussions = async (req, res) => {
  try {
    const {title, content, problemId} = req.body;
    const userId = req.user.id;

    if (!title || !content) {
      return res.status(400).json({error: "Title and content are required"});
    }

    const newDiscussion = await db.DiscussionComment.create({
      data: {
        title,
        content,
        problemId,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: "Discussion created successfully",
      discussion: newDiscussion,
    });
  } catch (err) {
    console.error("Create discussion error : ", err);
    res.status(500).json({error: "Failed to create discussion"});
  }
};
