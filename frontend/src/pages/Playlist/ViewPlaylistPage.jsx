import React, {useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {usePlaylistStore} from "../../stores/usePlaylistStore";
import {ArrowLeft, List, Clock, Trash2} from "lucide-react";
import useProblemStore from "../../stores/useProblemStore.js";

const ViewPlaylistPage = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const {
    currentPlaylist,
    getPlaylistDetails,
    isLoading,
    error,
    removeProblemFromPlaylist,
  } = usePlaylistStore();
  const {problems} = useProblemStore();
  console.log("problems: ", problems);
  console.log("currentPlaylist: ", currentPlaylist);

  useEffect(() => {
    getPlaylistDetails(id);
  }, [id, getPlaylistDetails]);

  const handleRemoveProblem = async problemId => {
    if (!currentPlaylist) return;
    try {
      await removeProblemFromPlaylist(currentPlaylist.id, [problemId]);
      // Optionally, you can show a toast here
    } catch (e) {
      // Optionally, handle error
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-[var(--primary)] text-xl">Loading playlist...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  if (!currentPlaylist) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--secondary)] to-[var(--background)] py-10 px-2">
      <div className="w-full max-w-8xl mx-auto bg-[var(--card)] rounded-2xl shadow-lg border border-[var(--border)] p-8 flex flex-col gap-8">
        <div className="flex items-center gap-4 mb-4">
          <button
            className="flex items-center gap-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg px-3 py-2 font-semibold hover:bg-[var(--primary-dark)] transition"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
        </div>

        <div className="bg-[var(--background)] border border-[var(--border)] rounded-xl p-6">
          <h2 className="text-lg font-semibold text-[var(--primary)] mb-4">
            Problems in this Playlist
          </h2>
          {currentPlaylist.problems && currentPlaylist.problems.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[var(--border)] text-sm">
                <thead>
                  <tr className="bg-[var(--card)]">
                    <th className="px-4 py-2 text-left font-bold text-[var(--muted-foreground)] uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-4 py-2 text-left font-bold text-[var(--muted-foreground)] uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-4 py-2 text-center font-bold text-[var(--muted-foreground)] uppercase tracking-wider">
                      Difficulty
                    </th>
                    <th className="px-4 py-2 text-center font-bold text-[var(--muted-foreground)] uppercase tracking-wider">
                      Tags
                    </th>

                    <th className="px-4 py-2 text-center font-bold text-[var(--muted-foreground)] uppercase tracking-wider">
                      View
                    </th>
                    <th className="px-4 py-2 text-center font-bold text-[var(--muted-foreground)] uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {currentPlaylist.problems.map((problem, idx) => (
                    <tr
                      key={problem.id}
                      className="hover:bg-[var(--background)]/60 transition"
                    >
                      <td className="px-4 py-2 text-[var(--muted-foreground)] text-xs text-center">
                        {idx + 1}
                      </td>
                      <td
                        className="px-4 py-2 text-[var(--primary)] font-semibold max-w-[250px] truncate cursor-pointer hover:underline"
                        title={problem.title}
                      >
                        {problem.problem.title}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${problem.difficulty === "EASY" ? "bg-green-100 text-green-700" : problem.difficulty === "MEDIUM" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}
                        >
                          {problem.problem.difficulty}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-center text-xs text-[var(--muted-foreground)] max-w-[180px] truncate">
                        {problem.problem.tags && problem.problem.tags.length > 0
                          ? problem.problem.tags.join(", ")
                          : "-"}
                      </td>

                      <td className="px-4 py-2 text-center">
                        <button
                          className="flex items-center gap-1 bg-blue-500 text-white rounded px-3 py-1 text-xs hover:bg-blue-700 transition"
                          onClick={() => navigate(`/problem/${problem.id}`)}
                          title="View Problem"
                        >
                          View
                        </button>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <button
                          className="flex items-center gap-1 bg-red-500 text-white rounded px-3 py-1 text-xs hover:bg-red-700 transition"
                          title="Remove"
                          onClick={() => handleRemoveProblem(problem.id)}
                        >
                          <Trash2 className="w-4 h-4" /> Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-[var(--muted-foreground)]">
              No problems in this playlist yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewPlaylistPage;
