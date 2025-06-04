import React, {useState, useMemo} from "react";
import {useAuthStore} from "../../stores/useAuthStore.js";
import {Link} from "react-router-dom";
import {
  Bookmark,
  PencilIcon,
  TrashIcon,
  Plus,
  Search,
  Filter,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Award,
} from "lucide-react";
import {useActions} from "../../stores/useAction.js";
import {usePlaylistStore} from "../../stores/usePlaylistStore.js";
import Button from "../ui/Button.jsx";
import CreatePlaylistModal from "../Playlist/CreatePlaylistModal.jsx";
import AddToPlaylistModal from "../Playlist/AddToPlaylist.jsx";
import Badge from "../ui/Badge.jsx";
import Card from "../ui/Card.jsx";

// Difficulty configuration
const difficultyConfig = {
  EASY: {
    variant: "success",
    label: "Easy",
    icon: <Award className="w-3 h-3" />,
  },
  MEDIUM: {
    variant: "warning",
    label: "Medium",
    icon: <Award className="w-3 h-3" />,
  },
  HARD: {variant: "danger", label: "Hard", icon: <Award className="w-3 h-3" />},
};

const ProblemsTable = ({problems}) => {
  const {authUser} = useAuthStore();
  const {onDeleteProblem} = useActions();
  const {createPlaylist} = usePlaylistStore();
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("ALL");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] =
    useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState(null);

  // Extract all unique tags from problems
  const allTags = useMemo(() => {
    if (!Array.isArray(problems)) return [];
    const tagsSet = new Set();
    problems.forEach(p => p.tags?.forEach(t => tagsSet.add(t)));
    return Array.from(tagsSet);
  }, [problems]);

  // Define allowed difficulties
  const difficulties = ["EASY", "MEDIUM", "HARD"];

  // Filter problems based on search, difficulty, and tags
  const filteredProblems = useMemo(() => {
    return (problems || [])
      .filter(problem =>
        problem.title.toLowerCase().includes(search.toLowerCase())
      )
      .filter(problem =>
        difficulty === "ALL" ? true : problem.difficulty === difficulty
      )
      .filter(problem =>
        selectedTag === "ALL" ? true : problem.tags?.includes(selectedTag)
      );
  }, [problems, search, difficulty, selectedTag]);

  // Pagination logic
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
  const paginatedProblems = useMemo(() => {
    return filteredProblems.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredProblems, currentPage]);

  const handleDelete = id => {
    onDeleteProblem(id);
  };

  const handleCreatePlaylist = async data => {
    await createPlaylist(data);
  };

  const handleAddToPlaylist = problemId => {
    setSelectedProblemId(problemId);
    setIsAddToPlaylistModalOpen(true);
  };

  return (
    <div className="w-full mt-10">
      {/* Header with Create Playlist Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-1 text-[var(--card-foreground)]">
            Coding Challenges
          </h2>
          <p className="text-[var(--muted-foreground)]">
            Solve problems to improve your coding skills
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Create Playlist
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <Card.Body>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-[var(--muted-foreground)]" />
              </div>
              <input
                type="text"
                placeholder="Search by title"
                className="w-full pl-10 pr-4 py-2 bg-[var(--secondary)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent text-[var(--card-foreground)]"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-[var(--muted-foreground)]" />
              </div>
              <select
                className="w-full pl-10 pr-4 py-2 bg-[var(--secondary)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent appearance-none text-[var(--card-foreground)]"
                value={difficulty}
                onChange={e => setDifficulty(e.target.value)}
              >
                <option value="ALL">All Difficulties</option>
                {difficulties.map(diff => (
                  <option key={diff} value={diff}>
                    {diff.charAt(0).toUpperCase() + diff.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-[var(--muted-foreground)]" />
              </div>
              <select
                className="w-full pl-10 pr-4 py-2 bg-[var(--secondary)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent appearance-none text-[var(--card-foreground)]"
                value={selectedTag}
                onChange={e => setSelectedTag(e.target.value)}
              >
                <option value="ALL">All Tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Problems List */}
      <Card className="overflow-hidden mb-6">
        <div className="m-6">
          {/* Header Row */}
          <div className="hidden md:grid grid-cols-5 bg-[var(--secondary)] bg-opacity-50 border-b border-[var(--border)] text-m font-medium text-[var(--muted-background)] uppercase tracking-wider py-3 rounded-2xl pl-4">
            <div className="px-6 py-3 text-left">Status</div>
            <div className="px-6 py-3 text-left">Title</div>
            <div className="px-8 py-3 text-">Tags</div>
            <div className="px-3 py-3 text-left">Difficulty</div>
            <div className="px-6 py-3 text-center">Actions</div>
          </div>
          {/* Data Rows */}
          <div className="divide-y divide-[var(--border)]">
            {paginatedProblems.length > 0 ? (
              paginatedProblems.map(problem => {
                const isSolved = problem.solvedBy.some(
                  user => user.userId === authUser?.id
                );
                const diffConfig = difficultyConfig[problem.difficulty];

                return (
                  <div
                    key={problem.id}
                    className="group grid grid-cols-1 md:grid-cols-5 transition-all duration-200 hover:bg-[var(--primary)]/5 hover:shadow-lg hover:scale-[1.01] rounded-xl cursor-pointer items-center"
                  >
                    {/* Status */}
                    <div className="px-4 py-4 whitespace-nowrap flex items-center">
                      {isSolved ? (
                        <div className="flex items-center animate-fade-in">
                          <CheckCircle className="w-5 h-5 text-green-500 animate-bounce-in" />
                          <span className="ml-2 text-sm text-green-500">
                            Solved
                          </span>
                        </div>
                      ) : (
                        <div className="w-5 h-5 border-2 border-[var(--border)] rounded-full"></div>
                      )}
                    </div>
                    {/* Title */}
                    <div className="px-4 py-4">
                      <Link
                        to={`/problem/${problem.id}`}
                        className="font-medium text-[var(--card-foreground)] group-hover:text-[var(--primary)] transition-colors duration-200 underline-offset-2 group-hover:underline"
                      >
                        {problem.title}
                      </Link>
                    </div>
                    {/* Tags */}
                    <div className="px-4 py-4 ">
                      <div className="flex flex-wrap gap-1">
                        {(problem.tags || []).slice(0, 3).map((tag, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            size="sm"
                            className="transition-all duration-200 group-hover:border-[var(--primary)] group-hover:text-[var(--primary)] text-center"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {(problem.tags || []).length > 3 && (
                          <Badge
                            variant="outline"
                            size="sm"
                            className="transition-all duration-200 group-hover:border-[var(--primary)] group-hover:text-[var(--primary)]"
                          >
                            +{problem.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                    {/* Difficulty */}
                    <div className="px-4 py-4">
                      <Badge
                        variant={diffConfig.variant}
                        size="sm"
                        className="flex items-center gap-1 animate-fade-in"
                      >
                        {diffConfig.icon}
                        {diffConfig.label}
                      </Badge>
                    </div>
                    {/* Actions */}
                    <div className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        {authUser?.role === "ADMIN" && (
                          <>
                            <Button
                              variant="danger"
                              size="sm"
                              icon={<TrashIcon className="w-4 h-4" />}
                              onClick={() => handleDelete(problem.id)}
                              className="transition-all duration-200 hover:scale-110 hover:shadow-md"
                            />
                            <Button
                              variant="secondary"
                              size="sm"
                              icon={<PencilIcon className="w-4 h-4" />}
                              disabled
                              className="transition-all duration-200 hover:scale-110 hover:shadow-md"
                            />
                          </>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          icon={<Bookmark className="w-4 h-4" />}
                          onClick={() => handleAddToPlaylist(problem.id)}
                          className="transition-all duration-200 hover:scale-110 hover:border-[var(--primary)] hover:text-[var(--primary)]"
                        >
                          <span className="hidden sm:inline">Save</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="px-4 py-8 text-center text-[var(--muted-foreground)] animate-fade-in">
                No problems found matching your filters.
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        <Button
          variant="secondary"
          size="sm"
          icon={<ChevronLeft className="w-4 h-4" />}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
        >
          Prev
        </Button>
        <span className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium bg-[var(--secondary)] rounded-md text-[var(--card-foreground)]">
          {currentPage} / {totalPages || 1}
        </span>
        <Button
          variant="secondary"
          size="sm"
          icon={<ChevronRight className="w-4 h-4" />}
          iconPosition="right"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          Next
        </Button>
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

export default ProblemsTable;
