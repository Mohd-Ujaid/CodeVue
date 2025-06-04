import React, {useEffect, useState} from "react";
import {Edit, Trash2, Eye} from "lucide-react";
import {useSubmissionStore} from "../../stores/useSubmissionStore";
import useProblemStore from "../../stores/useProblemStore";
import useUserStore from "../../stores/useUserStore.js";

const SubmissionStates = () => {
  const {submissions, getAllSubmissions, isLoading} = useSubmissionStore();

  console.log("Submissions data: ", submissions);
  const {problems, getAllProblems} = useProblemStore();
  console.log("Problems data: ", problems);
  const [statusFilter, setStatusFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");

  useEffect(() => {
    getAllSubmissions();
    getAllProblems();
  }, [getAllSubmissions, getAllProblems]);

  // Get unique values for filters
  const statusOptions = Array.from(
    new Set(submissions.map(s => s.status))
  ).filter(Boolean);
  const languageOptions = Array.from(
    new Set(submissions.map(s => s.language))
  ).filter(Boolean);
  const userOptions = Array.from(
    new Set(submissions.map(s => s.user?.name))
  ).filter(Boolean);
  // const test

  // Filter submissions
  const filteredSubmissions = submissions.filter(sub => {
    return (
      (!statusFilter || sub.status === statusFilter) &&
      (!languageFilter || sub.language === languageFilter) &&
      (!userFilter || sub.user?.name === userFilter)
    );
  });
  console.log("Filtered submissions:===1 ", filteredSubmissions);

  // const test = filteredSubmissions.filter(sub => {
  //   const testUser = users.filter(return sub.id)
  //   return ()
  // })

  // Numbers bar data
  const total = submissions.length;
  const accepted = submissions.filter(s => s.status === "Accepted").length;
  const wrong = submissions.filter(s => s.status === "Wrong Answer").length;
  const others = total - accepted - wrong;
  console.log("Total submissions: ", submissions);

  // Helper to get problem name from id
  const getProblemName = sub => {
    if (sub.problem?.title) return sub.problem.title;
    if (problems && problems.length > 0) {
      const found = problems.find(p => p.id === sub.problemId);
      if (found) return found.title;
    }
    return sub.problemId || "-";
  };

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-[var(--primary)]">
        Submissions List
      </h3>
      {/* Numbers Bar */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex flex-col items-center px-4 py-2 rounded bg-[var(--secondary)]">
          <span className="text-lg font-bold text-[var(--primary)]">
            {total}
          </span>
          <span className="text-xs text-[var(--muted-foreground)]">Total</span>
        </div>
        <div className="flex flex-col items-center px-4 py-2 rounded bg-green-100">
          <span className="text-lg font-bold text-green-700">{accepted}</span>
          <span className="text-xs text-green-700">Accepted</span>
        </div>
        <div className="flex flex-col items-center px-4 py-2 rounded bg-red-100">
          <span className="text-lg font-bold text-red-700">{wrong}</span>
          <span className="text-xs text-red-700">Wrong</span>
        </div>
        <div className="flex flex-col items-center px-4 py-2 rounded bg-yellow-100">
          <span className="text-lg font-bold text-yellow-700">{others}</span>
          <span className="text-xs text-yellow-700">Other</span>
        </div>
      </div>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          className="px-3 py-2 rounded border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          {statusOptions.map(status => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <select
          className="px-3 py-2 rounded border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]"
          value={languageFilter}
          onChange={e => setLanguageFilter(e.target.value)}
        >
          <option value="">All Languages</option>
          {languageOptions.map(lang => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        <select
          className="px-3 py-2 rounded border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]"
          value={userFilter}
          onChange={e => setUserFilter(e.target.value)}
        >
          <option value="">All Users</option>
          {userOptions.map(user => (
            <option key={user} value={user}>
              {user}
            </option>
          ))}
        </select>
        {(statusFilter || languageFilter || userFilter) && (
          <button
            className="px-3 py-2 rounded bg-[var(--destructive)] text-white hover:bg-[var(--destructive-dark)]"
            onClick={() => {
              setStatusFilter("");
              setLanguageFilter("");
              setUserFilter("");
            }}
          >
            Clear Filters
          </button>
        )}
      </div>
      {isLoading ? (
        <div className="text-center text-[var(--muted-foreground)] py-8">
          Loading submissions...
        </div>
      ) : filteredSubmissions && filteredSubmissions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[var(--border)]">
            <thead className="bg-[var(--background)]">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                  Problem
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                  User
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                  Language
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                  Time
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-[var(--card)] divide-y divide-[var(--border)]">
              {filteredSubmissions.map(sub => (
                <tr
                  key={sub.id}
                  className="hover:bg-[var(--secondary)] transition-colors"
                >
                  <td className="px-4 py-2 font-medium text-[var(--foreground)]">
                    {getProblemName(sub)}
                  </td>
                  <td className="px-4 py-2 text-[var(--muted-foreground)]">
                    {sub.user?.name || sub.userId || "-"}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        sub.status === "Accepted"
                          ? "bg-green-100 text-green-700"
                          : sub.status === "Wrong Answer"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-[var(--muted-foreground)]">
                    {sub.language || "-"}
                  </td>
                  <td className="px-4 py-2 text-[var(--muted-foreground)]">
                    {sub.createdAt
                      ? new Date(sub.createdAt).toLocaleString()
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
          No submissions found.
        </div>
      )}
    </div>
  );
};

export default SubmissionStates;
