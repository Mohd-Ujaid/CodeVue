import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {
  BarChart2,
  Users,
  Code,
  FileText,
  Settings,
  Plus,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";
import useProblemStore from "../../stores/useProblemStore";
import {useSubmissionStore} from "../../stores/useSubmissionStore";
import {useAdminStore} from "../../stores/useAdminStore";
import SubmissionStates from "../../components/Admin/SubmissionStates.jsx";
import UsersStates from "../../components/Admin/UsersStates.jsx";
import ProblemStates from "../../components/Admin/ProblemStates.jsx";
import AdminDashboard from "../../components/Admin/AdminDashboard.jsx";

const AdminPage = () => {
  const {problems} = useProblemStore();
  const {submissions} = useSubmissionStore();
  const {
    isLoading,
    fetchAnalyticsData,
    getUserStats,
    getProblemStats,
    getSubmissionStats,
  } = useAdminStore();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [expandedSection, setExpandedSection] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 1200,
    totalProblems: problems?.length || 120,
    totalSubmissions: submissions?.length || 1500,
    acceptanceRate: 68,
  });

  // Fetch analytics data when component mounts
  useEffect(() => {
    const loadData = async () => {
      fetchAnalyticsData();

      // Get additional stats
      const userStats = await getUserStats();
      const problemStats = await getProblemStats();
      const submissionStats = await getSubmissionStats();

      setStats({
        totalUsers: userStats?.totalUsers || 1200,
        totalProblems: problemStats?.totalProblems || problems?.length || 120,
        totalSubmissions:
          submissionStats?.totalSubmissions || submissions?.length || 1500,
        acceptanceRate: submissionStats?.acceptanceRate || 68,
      });
    };

    loadData();
  }, [
    fetchAnalyticsData,
    getUserStats,
    getProblemStats,
    getSubmissionStats,
    problems,
    submissions,
  ]);

  // Function to refresh data
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchAnalyticsData();

    // Get additional stats
    const userStats = await getUserStats();
    const problemStats = await getProblemStats();
    const submissionStats = await getSubmissionStats();

    // Update stats with real data if available
    setStats({
      totalUsers: userStats?.totalUsers || 1200,
      totalProblems: problemStats?.totalProblems || problems?.length || 120,
      totalSubmissions:
        submissionStats?.totalSubmissions || submissions?.length || 1500,
      acceptanceRate: submissionStats?.acceptanceRate || 68,
    });

    setIsRefreshing(false);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden relative">
      {/* Background gradients */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[var(--primary)] opacity-10 rounded-full blur-3xl animate-pulse overflow-hidden"></div>
      <div className="absolute bottom-40 -right-20 w-72 h-72 bg-[var(--primary)] opacity-10 rounded-full blur-3xl animate-pulse delay-200 overflow-hidden"></div>
      <div className="absolute top-60 right-20 w-48 h-48 bg-[var(--accent)] opacity-10 rounded-full blur-3xl animate-pulse delay-300 overflow-hidden"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 overflow-x-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="p-2 rounded-full hover:bg-[var(--primary)]/10 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-[var(--foreground)]" />
              </Link>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
            </div>
            <p className="text-[var(--muted-foreground)] mt-2">
              Manage your platform and monitor activity
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="px-4 py-2 rounded-lg border border-[var(--border)] hover:bg-[var(--secondary)] transition-colors flex items-center gap-2"
              onClick={handleRefresh}
              disabled={isRefreshing || isLoading}
            >
              <RefreshCw
                className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
              <span>{isRefreshing ? "Refreshing..." : "Refresh Data"}</span>
            </button>
            <button className="px-4 py-2 rounded-lg border border-[var(--border)] hover:bg-[var(--secondary)] transition-colors flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
            <Link
              to="/add-problem"
              className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Problem</span>
            </Link>
          </div>
        </div>

        {/* Admin Navigation */}
        <div className="flex border-b border-[var(--border)] mb-8">
          <button
            className={`px-4 py-3 flex items-center gap-2 font-medium text-sm ${
              activeTab === "dashboard"
                ? "text-[var(--primary)] border-b-2 border-[var(--primary)]"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            <BarChart2 className="w-4 h-4" />
            Dashboard
          </button>
          <button
            className={`px-4 py-3 flex items-center gap-2 font-medium text-sm ${
              activeTab === "problems"
                ? "text-[var(--primary)] border-b-2 border-[var(--primary)]"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }`}
            onClick={() => setActiveTab("problems")}
          >
            <Code className="w-4 h-4" />
            Problems
          </button>
          <button
            className={`px-4 py-3 flex items-center gap-2 font-medium text-sm ${
              activeTab === "users"
                ? "text-[var(--primary)] border-b-2 border-[var(--primary)]"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }`}
            onClick={() => setActiveTab("users")}
          >
            <Users className="w-4 h-4" />
            Users
          </button>
          <button
            className={`px-4 py-3 flex items-center gap-2 font-medium text-sm ${
              activeTab === "submissions"
                ? "text-[var(--primary)] border-b-2 border-[var(--primary)]"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }`}
            onClick={() => setActiveTab("submissions")}
          >
            <FileText className="w-4 h-4" />
            Submissions
          </button>
        </div>

        {/* Dashboard Content */}
        {activeTab === "dashboard" && <AdminDashboard />}
        {/* Problems Section */}
        {activeTab === "problems" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-4">Manage Problems</h2>
            <p className="text-[var(--muted-foreground)] mb-4">
              View and manage all problems in the system
            </p>
            {/* Problem States Component */}
            <ProblemStates />
          </div>
        )}

        {/* Users Section */}
        {activeTab === "users" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
            <p className="text-[var(--muted-foreground)] mb-4">
              View and manage all users in the system
            </p>
            {/* Users States Component */}
            <UsersStates />
          </div>
        )}

        {/* Submissions Section */}
        {activeTab === "submissions" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-4">Manage Submissions</h2>
            <p className="text-[var(--muted-foreground)] mb-4">
              View and manage all submissions in the system
            </p>
            {/* Submission States Component */}
            <SubmissionStates />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
