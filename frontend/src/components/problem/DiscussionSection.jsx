import React, {useEffect, useState} from "react";
import {useDiscussionStore} from "../../stores/useDiscussionStore.js";

const DiscussionSection = ({problemId}) => {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Alice",
      text: "Great problem!",
      createdAt: new Date().toLocaleString(),
    },
    {
      id: 2,
      user: "Bob",
      text: "I found a tricky edge case.",
      createdAt: new Date().toLocaleString(),
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {discussion, getAllDiscussions, createDiscussion} =
    useDiscussionStore();

  const handleAddComment = async e => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setIsSubmitting(true);
    // TODO: Replace with API call
    setTimeout(() => {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          user: "You",
          text: newComment,
          createdAt: new Date().toLocaleString(),
        },
      ]);
      setNewComment("");
      setIsSubmitting(false);
    }, 500);
  };

  useEffect(() => {
    getAllDiscussions();
    console.log("Discussion data in DiscussionSection:", discussion);
  }, []);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--primary)]">
        not working....
      </h3>
      <h3 className="text-lg font-semibold text-[var(--primary)]">
        Discussion
      </h3>
      <form onSubmit={handleAddComment} className="flex gap-2 mb-4">
        <input
          className="flex-1 px-3 py-2 border border-[var(--border)] rounded bg-[var(--background)] text-[var(--foreground)]"
          placeholder="Add a comment..."
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          disabled={isSubmitting}
        />
        <button
          type="submit"
          className="px-4 py-2 rounded bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] disabled:opacity-60"
          disabled={isSubmitting || !newComment.trim()}
        >
          {isSubmitting ? "Posting..." : "Post"}
        </button>
      </form>
      <div className="space-y-4">
        {comments.length === 0 && (
          <div className="text-[var(--muted-foreground)] text-center">
            No comments yet.
          </div>
        )}
        {comments.map(comment => (
          <div
            key={comment.id}
            className="border border-[var(--border)] rounded p-3 bg-[var(--secondary)]"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-[var(--primary)]">
                {comment.user}
              </span>
              <span className="text-xs text-[var(--muted-foreground)]">
                {comment.createdAt}
              </span>
            </div>
            <div className="text-[var(--foreground)]">{comment.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscussionSection;
