import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  User,
  Shield,
  Code,
  BookOpen,
  BarChart2,
  Settings,
  Calendar,
  CheckCircle,
  Edit,
  Key,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import {useAuthStore} from "../../stores/useAuthStore";
import ProfileSubmission from "../../components/Profile/ProfileSubmission.jsx";
import ProblemSolvedByUser from "../../components/Profile/ProblemSolvedByUser.jsx";
import PlaylistProfile from "../../components/Profile/PlaylistProfile.jsx";
import {useStatsStore} from "../../stores/useStats.js";
import {useUserStatsStore} from "../../stores/useUserStats.js";

const Profile = () => {
  const {authUser} = useAuthStore();
  const [activeTab, setActiveTab] = useState("overview");

  const {
    totalProblems,
    totalEasyProblems,
    totalMediumProblems,
    totalHardProblems,
    getStats,
  } = useStatsStore();
  const {
    totalEasyProblemsSolved,
    totalMediumProblemsSolved,
    totalHardProblemsSolved,
    userSuccessRate,
    totalProblemsSolved,
    getUserStats,
  } = useUserStatsStore();

  useEffect(() => {
    getStats();
    getUserStats();
    console.log("Total Easy Problems Solved:", totalEasyProblemsSolved);
    console.log("Total Medium Problems Solved:", totalMediumProblemsSolved);
    console.log("Total Hard Problems Solved:", totalHardProblemsSolved);
    console.log("Total Problems Solved:", totalProblemsSolved);
  }, [totalEasyProblemsSolved, totalProblemsSolved]);

  return (
    <div className="min-h-screen flex flex-col py-6 w-full max-w-7xl mx-auto px-4 md:px-6">
      {/* Background gradients */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[var(--primary)] opacity-10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-48 h-48 bg-[var(--accent)] opacity-10 rounded-full blur-3xl animate-pulse delay-300"></div>

      {/* Header with back button */}
      <div className="flex flex-row justify-between items-center w-full mb-8 animate-fadeIn">
        <div className="flex items-center gap-3">
          <Link
            to={"/"}
            className="p-2 rounded-full hover:bg-[var(--primary)]/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[var(--foreground)]" />
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
            My Profile
          </h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--secondary)] hover:bg-[var(--secondary)]/80 transition-colors">
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
      </div>

      {/* Profile Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Profile Card */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-md overflow-hidden animate-slideUp">
          <div className="h-32 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] relative">
            <button className="absolute top-4 right-4 p-2 bg-[var(--background)]/20 rounded-full hover:bg-[var(--background)]/40 transition-all">
              <Edit className="w-4 h-4 text-white" />
            </button>
          </div>

          <div className="px-6 pb-6 pt-14 relative">
            {/* Avatar */}
            <div className="absolute -top-12 left-6">
              <div className="bg-[var(--card)] p-1 rounded-full">
                <div className="bg-[var(--primary)]/10 text-[var(--primary)] rounded-full w-24 h-24 flex items-center justify-center border-2 border-[var(--primary)]/30">
                  {authUser.image ? (
                    <img
                      src={
                        authUser?.image ||
                        "https://avatar.iran.liara.run/public/boy"
                      }
                      alt={authUser.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl font-bold">
                      {authUser.name ? authUser.name.charAt(0) : "U"}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="my-6">
              <div className="flex gap-10 items-center justify-between">
                <h2 className="text-2xl font-bold text-[var(--foreground)]">
                  {authUser.name}
                </h2>
                <div className="inline-block px-2 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-medium mt-2">
                  {authUser.role}
                </div>
              </div>
              <p className="text-[var(--muted-foreground)] mt-2">
                Joined on {new Date().toLocaleDateString()}
              </p>
            </div>

            {/* User Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--primary)]">
                  {totalProblemsSolved}
                </div>
                <div className="text-xs text-[var(--muted-foreground)]">
                  Problems Solved
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--accent)]">0</div>
                <div className="text-xs text-[var(--muted-foreground)]">
                  Day Streak
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--foreground)]">
                  {userSuccessRate}%
                </div>
                <div className="text-xs text-[var(--muted-foreground)]">
                  Success Rate
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4">
              <button className="p-2 rounded-full bg-[var(--secondary)] hover:bg-[var(--secondary)]/80 transition-colors">
                <Github className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full bg-[var(--secondary)] hover:bg-[var(--secondary)]/80 transition-colors">
                <Linkedin className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full bg-[var(--secondary)] hover:bg-[var(--secondary)]/80 transition-colors">
                <Twitter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 animate-slideUp animation-delay-100">
          {/* Coding Calendar */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-md p-6 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[var(--primary)]" />
              Coding Calendar
            </h3>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({length: 35}).map((_, i) => {
                const intensity = Math.floor(Math.random() * 5); // 0-4 for demo
                let bgClass = "bg-[var(--secondary)]";
                if (intensity > 0) {
                  const opacity = 0.2 + intensity * 0.2;
                  bgClass = `bg-[var(--primary)] opacity-${Math.floor(opacity * 10)}`;
                }
                return (
                  <div
                    key={i}
                    className={`w-full aspect-square rounded-sm ${bgClass} hover:opacity-80 transition-opacity cursor-pointer`}
                    title={`${Math.floor(Math.random() * 5)} submissions`}
                  ></div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-[var(--border)] mb-6 animate-slideUp animation-delay-200">
        <div className="flex space-x-8">
          <button
            className={`pb-4 px-1 font-medium text-sm transition-colors relative ${
              activeTab === "overview"
                ? "text-[var(--primary)]"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4" />
              Overview
            </div>
            {activeTab === "overview" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--primary)]"></div>
            )}
          </button>
          <button
            className={`pb-4 px-1 font-medium text-sm transition-colors relative ${
              activeTab === "submissions"
                ? "text-[var(--primary)]"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }`}
            onClick={() => setActiveTab("submissions")}
          >
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              Submissions
            </div>
            {activeTab === "submissions" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--primary)]"></div>
            )}
          </button>
          <button
            className={`pb-4 px-1 font-medium text-sm transition-colors relative ${
              activeTab === "problems"
                ? "text-[var(--primary)]"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }`}
            onClick={() => setActiveTab("problems")}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Problems Solved
            </div>
            {activeTab === "problems" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--primary)]"></div>
            )}
          </button>
          <button
            className={`pb-4 px-1 font-medium text-sm transition-colors relative ${
              activeTab === "playlists"
                ? "text-[var(--primary)]"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }`}
            onClick={() => setActiveTab("playlists")}
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Playlists
            </div>
            {activeTab === "playlists" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--primary)]"></div>
            )}
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="animate-fadeIn">
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">
                Account Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[var(--muted-foreground)]">
                      Email
                    </div>
                    <div className="text-base font-medium mt-1 break-all">
                      {authUser.email}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[var(--muted-foreground)]">
                      User ID
                    </div>
                    <div className="text-xs font-medium mt-1 break-all">
                      {authUser.id}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[var(--muted-foreground)]">
                      Role
                    </div>
                    <div className="text-base font-medium mt-1">
                      {authUser.role}
                    </div>
                    <div className="text-xs text-[var(--muted-foreground)] mt-1">
                      {authUser.role === "ADMIN"
                        ? "Full system access"
                        : "Limited access"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button className="px-4 py-2 rounded-lg border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/10 transition-colors flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
                <button className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90 transition-colors flex items-center gap-2">
                  <Key className="w-4 h-4" />
                  Change Password
                </button>
              </div>
            </div>

            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Coding Progress</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">
                      Overall Progress
                    </span>
                    <span className="text-sm font-medium">
                      {totalProblemsSolved}/{totalProblems}
                    </span>
                  </div>
                  <div className="w-full bg-[var(--secondary)] rounded-full h-2.5">
                    <div
                      className="bg-[var(--primary)] h-2.5 rounded-full"
                      style={{
                        width: `${(totalProblemsSolved / totalProblems) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Easy Problems</span>
                    <span className="text-sm font-medium">
                      {totalEasyProblemsSolved}/{totalEasyProblems}
                    </span>
                  </div>
                  <div className="w-full bg-[var(--secondary)] rounded-full h-2.5">
                    <div
                      className="bg-green-500 h-2.5 rounded-full"
                      style={{
                        width: `${(totalEasyProblemsSolved / totalEasyProblems) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Medium Problems</span>
                    <span className="text-sm font-medium">
                      {totalMediumProblemsSolved}/{totalMediumProblems}
                    </span>
                  </div>
                  <div className="w-full bg-[var(--secondary)] rounded-full h-2.5">
                    <div
                      className="bg-yellow-500 h-2.5 rounded-full"
                      style={{
                        width: `${(totalMediumProblemsSolved / totalMediumProblems) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Hard Problems</span>
                    <span className="text-sm font-medium">
                      {totalHardProblemsSolved}/{totalHardProblems}
                    </span>
                  </div>
                  <div className="w-full bg-[var(--secondary)] rounded-full h-2.5">
                    <div
                      className="bg-red-500 h-2.5 rounded-full"
                      style={{
                        width: `${(totalHardProblemsSolved / totalHardProblems) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "submissions" && <ProfileSubmission />}
        {activeTab === "problems" && <ProblemSolvedByUser />}
        {activeTab === "playlists" && <PlaylistProfile />}
      </div>
    </div>
  );
};

export default Profile;
