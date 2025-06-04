import React, {useEffect, useState} from "react";
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
} from "recharts";
import useProblemStore from "../../stores/useProblemStore.js";
import {useSubmissionStore} from "../../stores/useSubmissionStore.js";
import {useAdminStore} from "../../stores/useAdminStore.js";
import {useStatsStore} from "../../stores/useStats.js";
import {useUserStatsStore} from "../../stores/useUserStats.js";

const AdminDashboard = () => {
  const {totalUsers, totalProblems, totalSubmissions, successRate, getStats} =
    useStatsStore();
  const {getUserStats} = useUserStatsStore();
  const {
    analyticsData,

    fetchAnalyticsData,
  } = useAdminStore();

  useEffect(() => {
    getStats(), getUserStats();
    fetchAnalyticsData();
  }, [getStats, getUserStats, fetchAnalyticsData]);

  const [stats, setStats] = useState({
    totalUsers: totalUsers,
    totalProblems: totalProblems,
    totalSubmissions: totalSubmissions,
    acceptanceRate: successRate,
  });

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[var(--muted-foreground)] text-sm">
                Total Users
              </p>
              <h3 className="text-3xl font-bold mt-1">{stats.totalUsers}</h3>
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
                Total Problems
              </p>
              <h3 className="text-3xl font-bold mt-1">{stats.totalProblems}</h3>
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
                Total Submissions
              </p>
              <h3 className="text-3xl font-bold mt-1">
                {stats.totalSubmissions}
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
                {stats.acceptanceRate}%
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <LineChartIcon className="w-5 h-5 text-[var(--primary)]" />
            User Growth
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={analyticsData.userGrowth}
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
                  dataKey="users"
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
  );
};

export default AdminDashboard;
