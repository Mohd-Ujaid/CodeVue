import React, {useEffect} from "react";
import useProblemStore from "../../stores/useProblemStore";
import {Edit, Trash2, Eye} from "lucide-react";

const ProblemStates = () => {
  const {problems, getAllProblems, isProblemsLoading} = useProblemStore();

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-[var(--primary)]">
        Problems List
      </h3>
      {isProblemsLoading ? (
        <div className="text-center text-[var(--muted-foreground)] py-8">
          Loading problems...
        </div>
      ) : problems && problems.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[var(--border)]">
            <thead className="bg-[var(--background)]">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                  Title
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                  Difficulty
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                  Tags
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                  Created
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-[var(--card)] divide-y divide-[var(--border)]">
              {problems.map(problem => (
                <tr
                  key={problem.id}
                  className="hover:bg-[var(--secondary)] transition-colors"
                >
                  <td className="px-4 py-2 font-medium text-[var(--foreground)]">
                    {problem.title}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        problem.difficulty === "Easy"
                          ? "bg-green-100 text-green-700"
                          : problem.difficulty === "Medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {problem.difficulty}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-[var(--muted-foreground)]">
                    {problem.tags && problem.tags.length > 0
                      ? problem.tags.join(", ")
                      : "-"}
                  </td>
                  <td className="px-4 py-2 text-[var(--muted-foreground)]">
                    {problem.createdAt
                      ? new Date(problem.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      className="p-2 rounded hover:bg-[var(--primary)]/10 text-[var(--primary)]"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 rounded hover:bg-[var(--accent)]/10 text-[var(--accent)]"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 rounded hover:bg-[var(--destructive)]/10 text-[var(--destructive)]"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-[var(--muted-foreground)] py-8">
          No problems found.
        </div>
      )}
    </div>
  );
};

export default ProblemStates;
