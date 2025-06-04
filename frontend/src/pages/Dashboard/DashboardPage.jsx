import React, {useEffect, useState} from "react";
import useUserStore from "../../stores/useUserStore.js";
import {useAuthStore} from "../../stores/useAuthStore.js";
import {useUserStatsStore} from "../../stores/useUserStats.js";
import {
  Activity,
  BarChart as BarChartIcon,
  ChevronDown,
  ChevronUp,
  Code,
  FileText,
  LineChart as LineChartIcon,
  PieChart,
  Users,
} from "lucide-react";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const defaultAvatar =
  "https://ui-avatars.com/api/?name=User  &background=2979ff&color=fff";

const DashboardPage = () => {
  const {authUser} = useAuthStore();
  const {
    totalEasyProblemsSolved,
    totalMediumProblemsSolved,
    totalHardProblemsSolved,
    userSuccessRate,
    analyticsData,
    getUserStats,
    getUsergrowths,
  } = useUserStatsStore();

  useEffect(() => {
    getUserStats();
    getUsergrowths();
    console.log("sub============>", analyticsData.submissionsPerDay);
  }, [getUserStats, getUsergrowths]);

  return (
    // <div className="w-full overflow-x-hidden">
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-8 overflow-x-hidden">
      <div className="min-h-screen bg-[var(--background)] ">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Header Section */}
          <div className="flex items-center justify-between bg-[var(--card)] rounded-2xl p-6 border border-[var(--border)] shadow-lg">
            <div className="flex items-center gap-4">
              {/*<img src={user.avatar} alt="avatar" className="w-16 h-16 rounded-full border-4 border-[var(--primary)] shadow-md" />*/}
              <div>
                <h1 className="text-3xl font-bold text-[var(--primary)]">
                  Welcome, {authUser.name}
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="m-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[var(--muted-foreground)] text-sm">
                    Easy Problems Solved
                  </p>
                  <h3 className="text-3xl font-bold mt-1">
                    {totalEasyProblemsSolved}
                  </h3>
                  <p className="text-[var(--success)] text-sm mt-2 flex items-center">
                    <ChevronUp className="w-4 h-4 mr-1" />
                    12% increase
                  </p>
                </div>
                <div className="p-4 rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                  <Users className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[var(--muted-foreground)] text-sm">
                    Total Medium Problems Solved
                  </p>
                  <h3 className="text-3xl font-bold mt-1">
                    {totalMediumProblemsSolved}
                  </h3>
                  <p className="text-[var(--success)] text-sm mt-2 flex items-center">
                    <ChevronUp className="w-4 h-4 mr-1" />
                    5% increase
                  </p>
                </div>
                <div className="p-4 rounded-full bg-[var(--accent)]/10 text-[var(--accent)]">
                  <Code className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[var(--muted-foreground)] text-sm">
                    Total Hard Problem Solved
                  </p>
                  <h3 className="text-3xl font-bold mt-1">
                    {totalHardProblemsSolved}
                  </h3>
                  <p className="text-[var(--success)] text-sm mt-2 flex items-center">
                    <ChevronUp className="w-4 h-4 mr-1" />
                    18% increase
                  </p>
                </div>
                <div className="p-4 rounded-full bg-[var(--success)]/10 text-[var(--success)]">
                  <FileText className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[var(--muted-foreground)] text-sm">
                    Success Rate
                  </p>
                  <h3 className="text-3xl font-bold mt-1">
                    {userSuccessRate}%
                  </h3>
                  <p className="text-[var(--warning)] text-sm mt-2 flex items-center">
                    <ChevronDown className="w-4 h-4 mr-1" />
                    3% decrease
                  </p>
                </div>
                <div className="p-4 rounded-full bg-[var(--warning)]/10 text-[var(--warning)]">
                  <Activity className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-10">
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <LineChartIcon className="w-5 h-5 text-[var(--primary)]" />
                User submissions
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    width={500}
                    height={300}
                    data={analyticsData.submissionsPerDay}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <YAxis />
                    <XAxis dataKey={"xaxis"} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255,255,255)",
                        color: "green",
                        border: "none",
                        borderRadius: "0.5rem",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="submissions"
                      dot={{r: 4, fill: "grey"}}
                      stroke="green"
                      activeDot={{r: 5, stroke: "black", strokeWidth: 2}}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-[var(--primary)]" />
                Submission Statistics
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={analyticsData.submissionStats}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      nameKey="status"
                      label={({name, percent}) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {analyticsData.submissionStats.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255,255,255)",
                        color: "green",
                        border: "none",
                        borderRadius: "0.5rem",
                      }}
                    />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChartIcon className="w-5 h-5 text-[var(--primary)]" />
                Problem Difficulty Distribution
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={analyticsData.problemDifficulty}
                    margin={{top: 20, right: 30, left: 20, bottom: 5}}
                  >
                    <XAxis dataKey="difficulty" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255,255,255)",
                        // borderColor: COLORS.border,
                        border: "none",
                        color: "green",
                        borderRadius: "0.5rem",
                      }}
                    />

                    <Legend />

                    <Bar dataKey="count" name="Number of Problems">
                      {analyticsData.problemDifficulty.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-[var(--primary)]" />
                Language Submission Percentage
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={analyticsData.LanguageSubmissionActivity}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      nameKey="language"
                      label={({name, percent}) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {analyticsData.LanguageSubmissionActivity.map(
                        (entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        )
                      )}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255,255,255)",
                        color: "green",
                        border: "none",
                        borderRadius: "0.5rem",
                      }}
                    />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
