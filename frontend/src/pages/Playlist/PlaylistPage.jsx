import React, {useEffect, useState} from "react";
import {usePlaylistStore} from "../../stores/usePlaylistStore";
import {useNavigate} from "react-router-dom";
import {Trash2, Eye, Edit, PlusCircle, Plus} from "lucide-react";
import Button from "../../components/ui/Button.jsx";
import CreatePlaylistModal from "../../components/Playlist/CreatePlaylistModal.jsx";
import AddToPlaylistModal from "../../components/Playlist/AddToPlaylist.jsx";

const PlaylistPage = () => {
  const navigate = useNavigate();
  const {
    playlists,
    isLoading,
    getAllPlaylists,
    deletePlaylist,
    updatePlaylist,
  } = usePlaylistStore();
  const {createPlaylist} = usePlaylistStore();

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [search, setSearch] = useState("");
  const [selectedProblemId, setSelectedProblemId] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] =
    useState(false);

  const filteredPlaylists = playlists.filter(
    playlist =>
      playlist.name.toLowerCase().includes(search.toLowerCase()) ||
      playlist.description.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    getAllPlaylists();
  }, [getAllPlaylists]);

  const handleDelete = async id => {
    if (window.confirm("Are you sure you want to delete this playlist?")) {
      await deletePlaylist(id);
    }
  };

  const handleView = id => {
    navigate(`/playlists/${id}`);
  };

  const handleCreatePlaylist = async data => {
    await createPlaylist(data);
  };
  const handleAddToPlaylist = problemId => {
    setSelectedProblemId(problemId);
    setIsAddToPlaylistModalOpen(true);
  };

  const handleEdit = (id, name, description) => {
    setEditingId(id);
    setEditName(name);
    setEditDescription(description);
  };

  const handleEditSave = async id => {
    await updatePlaylist(id, {name: editName, description: editDescription});
    setEditingId(null);
    setEditName("");
    setEditDescription("");
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditName("");
    setEditDescription("");
  };

  return (
    <div className="bg-gradient-to-br from-[var(--secondary)] to-[var(--background)] min-h-screen py-10 px-2">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10 animate-fade-in-down">
          <div className="flex-1">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] drop-shadow-lg tracking-tight animate-gradient-text">
              My Playlists
            </h2>
            <input
              className="mt-2 w-full md:w-72 rounded border border-[var(--border)] bg-[var(--background)] text-[var(--card-foreground)] p-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              placeholder="Search playlists..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <Button
            variant="primary"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Create Playlist
          </Button>
        </div>
        {/* Table/Grid Layout */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-[var(--border)]">
            <thead>
              <tr className="bg-[var(--background)]">
                <th className="px-6 py-3 text-left text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-center text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider">
                  Problems
                </th>
                <th className="px-6 py-3 text-center text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-center text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-8 text-[var(--muted-foreground)]"
                  >
                    Loading playlists...
                  </td>
                </tr>
              ) : filteredPlaylists.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-8 text-[var(--muted-foreground)]"
                  >
                    No playlists found. Create your first playlist!
                  </td>
                </tr>
              ) : (
                filteredPlaylists.map(playlist => (
                  <tr
                    key={playlist.id}
                    className="hover:bg-[var(--background)]/60 transition"
                  >
                    <td className="px-6 py-4 font-semibold text-[var(--primary)] max-w-[200px] truncate">
                      {editingId === playlist.id ? (
                        <input
                          className="w-full rounded border border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] p-2 font-semibold text-base"
                          value={editName}
                          onChange={e => setEditName(e.target.value)}
                        />
                      ) : (
                        playlist.name
                      )}
                    </td>
                    <td className="px-6 py-4 text-[var(--muted-foreground)] max-w-[300px] truncate">
                      {editingId === playlist.id ? (
                        <textarea
                          className="w-full rounded border border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] p-2 text-sm"
                          value={editDescription}
                          onChange={e => setEditDescription(e.target.value)}
                        />
                      ) : (
                        playlist.description
                      )}
                    </td>
                    <td className="px-6 py-4 text-center text-[var(--card-foreground)] font-bold">
                      {playlist.problems?.length ?? playlist.problemsCount ?? 0}
                    </td>
                    <td className="px-6 py-4 text-center text-xs text-[var(--muted-foreground)]">
                      {playlist.createdAt?.slice(0, 10)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {editingId === playlist.id ? (
                        <div className="flex gap-2 justify-center">
                          <button
                            className="flex items-center gap-1 bg-green-600 text-white rounded-lg px-3 py-1 font-semibold hover:bg-green-700 transition"
                            title="Save"
                            onClick={() => handleEditSave(playlist.id)}
                          >
                            Save
                          </button>
                          <button
                            className="flex items-center gap-1 bg-gray-500 text-white rounded-lg px-3 py-1 font-semibold hover:bg-gray-700 transition"
                            title="Cancel"
                            onClick={handleEditCancel}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2 justify-center">
                          <button
                            className="flex items-center gap-1 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg px-3 py-1 font-semibold hover:bg-[var(--primary-dark)] transition"
                            title="View Playlist"
                            onClick={() => handleView(playlist.id)}
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            className="flex items-center gap-1 bg-yellow-500 text-white rounded-lg px-3 py-1 font-semibold hover:bg-yellow-600 transition"
                            title="Edit Playlist"
                            onClick={() =>
                              handleEdit(
                                playlist.id,
                                playlist.name,
                                playlist.description
                              )
                            }
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            className="flex items-center gap-1 bg-red-500 text-white rounded-lg px-3 py-1 font-semibold hover:bg-red-700 transition"
                            title="Delete Playlist"
                            onClick={() => handleDelete(playlist.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modals */}
      <CreatePlaylistModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePlaylist}
      />
      <AddToPlaylistModal
        isOpen={isAddToPlaylistModalOpen}
        onClose={() => setIsAddToPlaylistModalOpen(false)}
        problemId={selectedProblemId}
      />
    </div>
  );
};

export default PlaylistPage;
