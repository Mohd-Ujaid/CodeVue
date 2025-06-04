import React, {useEffect, useState} from "react";
import {usePlaylistStore} from "../../stores/usePlaylistStore";
import {Link} from "react-router-dom";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  List,
  Tag,
  ExternalLink,
} from "lucide-react";

const PlaylistProfile = () => {
  const {getAllPlaylists, playlists, deletePlaylist} = usePlaylistStore();
  const [expandedPlaylist, setExpandedPlaylist] = useState(null);

  useEffect(() => {
    getAllPlaylists();
  }, [getAllPlaylists]);

  const togglePlaylist = id => {
    if (expandedPlaylist === id) {
      setExpandedPlaylist(null);
    } else {
      setExpandedPlaylist(id);
    }
  };

  const handleDelete = async id => {
    await deletePlaylist(id);
  };

  const getDifficultyBadge = difficulty => {
    switch (difficulty) {
      case "EASY":
        return <span className="badge badge-success">Easy</span>;
      case "MEDIUM":
        return <span className="badge badge-warning">Medium</span>;
      case "HARD":
        return <span className="badge badge-error">Hard</span>;
      default:
        return <span className="badge">Unknown</span>;
    }
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--secondary)] to-[var(--background)] py-10 px-2">
      <div className="w-full max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-10 animate-fade-in-down">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] drop-shadow-lg tracking-tight animate-gradient-text">
            My Playlists
          </h2>
          <button className="btn btn-primary btn-sm shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 animate-bounce-in">
            + Create Playlist
          </button>
        </div>

        {playlists.length === 0 ? (
          <div className="card bg-base-100 shadow-2xl border border-[var(--border)] rounded-2xl animate-fade-in-up">
            <div className="card-body items-center text-center">
              <h3 className="text-2xl font-semibold text-[var(--primary)] animate-pulse">
                No playlists found
              </h3>
              <p className="text-base-content/70 mb-4">
                Create your first playlist to organize problems!
              </p>
              <div className="card-actions justify-center">
                <button className="btn btn-primary animate-bounce-in">
                  Create Playlist
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            {playlists.map((playlist, idx) => (
              <div
                key={playlist.id}
                className={`card bg-base-100 shadow-2xl border border-[var(--border)] rounded-2xl animate-fade-in-up animate-delay-[${idx * 100}ms] hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.14)] transition-all duration-300 group relative overflow-hidden`}
              >
                {/* Animated background accent */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--primary)] opacity-10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500"></div>
                <div className="card-body p-8 relative z-10">
                  {/* Playlist Header */}
                  <div
                    className="flex justify-between items-center cursor-pointer group"
                    onClick={() => togglePlaylist(playlist.id)}
                  >
                    <div className="flex items-center gap-5">
                      <div className="avatar placeholder flex items-center justify-center">
                        <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white rounded-xl w-16 h-16 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 animate-bounce-in">
                          <BookOpen size={32} />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[var(--card-foreground)] group-hover:text-[var(--primary)] transition-colors duration-300">
                          {playlist.name}
                        </h3>
                        <div className="flex items-center gap-6 mt-1 text-sm text-base-content/70">
                          <div className="flex items-center gap-1">
                            <List size={16} />
                            <span>{playlist.problems.length} problems</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={16} />
                            <span>
                              Created {formatDate(playlist.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="btn btn-ghost btn-sm group-hover:bg-[var(--primary)]/10 transition-colors duration-300">
                      {expandedPlaylist === playlist.id ? (
                        <ChevronUp />
                      ) : (
                        <ChevronDown />
                      )}
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-base-content/80 mt-3 italic animate-fade-in-up">
                    {playlist.description}
                  </p>

                  {/* Expanded Problems List */}
                  <div
                    className={`transition-all duration-500 ${expandedPlaylist === playlist.id ? "max-h-[1000px] opacity-100 mt-8 pt-8 border-t border-base-300 animate-fade-in-up" : "max-h-0 opacity-0 overflow-hidden p-0 m-0 border-0"}`}
                  >
                    {expandedPlaylist === playlist.id && (
                      <>
                        <h4 className="text-lg font-semibold mb-4 text-[var(--primary)] animate-slide-in-left">
                          Problems in this playlist
                        </h4>
                        {playlist.problems.length === 0 ? (
                          <div className="alert animate-fade-in">
                            <span>No problems added to this playlist yet.</span>
                          </div>
                        ) : (
                          <div className="overflow-x-auto">
                            <table className="table table-zebra w-full rounded-xl overflow-hidden animate-fade-in-up">
                              <thead>
                                <tr>
                                  <th>Problem</th>
                                  <th>Difficulty</th>
                                  <th>Tags</th>
                                  <th className="text-right">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {playlist.problems.map((item, i) => (
                                  <tr
                                    key={item.id}
                                    className="hover:bg-[var(--primary)]/10 transition-colors duration-200 group"
                                  >
                                    <td className="font-medium text-[var(--card-foreground)] group-hover:text-[var(--primary)] transition-colors duration-200">
                                      {item.problem.title}
                                    </td>
                                    <td>
                                      {getDifficultyBadge(
                                        item.problem.difficulty
                                      )}
                                    </td>
                                    <td>
                                      <div className="flex flex-wrap gap-1">
                                        {item.problem.tags &&
                                          item.problem.tags.map((tag, idx) => (
                                            <div
                                              key={idx}
                                              className="badge badge-outline badge-sm animate-bounce-in"
                                            >
                                              <Tag size={10} className="mr-1" />
                                              {tag}
                                            </div>
                                          ))}
                                      </div>
                                    </td>
                                    <td className="text-right">
                                      <Link
                                        to={`/problem/${item.problem.id}`}
                                        className="btn btn-xs btn-outline btn-primary hover:scale-110 transition-transform duration-200 animate-fade-in"
                                      >
                                        <ExternalLink size={12} />
                                        Solve
                                      </Link>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                        <div className="flex justify-between items-center mt-6">
                          <button
                            onClick={() => handleDelete(playlist.id)}
                            className="btn btn-sm btn-error hover:scale-110 transition-transform duration-300 animate-bounce-in"
                          >
                            Delete Playlist
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistProfile;
