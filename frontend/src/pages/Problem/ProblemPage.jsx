// import React, {useState, useEffect} from "react";
// import Editor from "@monaco-editor/react";
// import {
//   Play,
//   FileText,
//   MessageSquare,
//   Lightbulb,
//   Bookmark,
//   Share2,
//   Clock,
//   ChevronRight,
//   // BookOpen,
//   Terminal,
//   Code2,
//   Users,
//   ThumbsUp,
//   Home,
// } from "lucide-react";
// import {Link, useParams} from "react-router-dom";
// import useProblemStore from "../../stores/useProblemStore.js";
// import {getLanguageId} from "../../libs/lang.js";
// import {useSubmissionStore} from "../../stores/useSubmissionStore.js";
// import {useExecutionStore} from "../../stores/useExecuteStore.js";
// import Submission from "../../components/submission/Submission.jsx";
// import SubmissionsList from "../../components/submission/SubmissionList.jsx";
//
// const ProblemPage = () => {
//   const {id} = useParams();
//   const {getProblemById, problem, isProblemLoading} = useProblemStore();
//
//   const {
//     submission: submissions,
//     isLoading: isSubmissionsLoading,
//     getSubmissionForProblem,
//     getSubmissionCountForProblem,
//     submissionCount,
//     correctSubmissions,
//   } = useSubmissionStore();
//
//   const [code, setCode] = useState("");
//   const [activeTab, setActiveTab] = useState("description");
//   const [selectedLanguage, setSelectedLanguage] = useState("javascript");
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [testcases, setTestCases] = useState([]);
//
//   const {executeCode, submission, isExecuting} = useExecutionStore();
//
//   useEffect(() => {
//     getProblemById(id);
//     getSubmissionCountForProblem(id);
//   }, [id]);
//
//   useEffect(() => {
//     if (problem) {
//       setCode(
//         problem.codeSnippets?.[selectedLanguage] || submission?.sourceCode || ""
//       );
//       setTestCases(
//         problem.testcases?.map(tc => ({
//           input: tc.input,
//           output: tc.output,
//         })) || []
//       );
//     }
//   }, [problem, selectedLanguage]);
//
//   useEffect(() => {
//     if (activeTab === "submissions" && id) {
//       getSubmissionForProblem(id);
//     }
//   }, [activeTab, id]);
//
//   const handleLanguageChange = e => {
//     const lang = e.target.value;
//     setSelectedLanguage(lang);
//     setCode(problem.codeSnippets?.[lang] || "");
//   };
//
//   const handleRunCode = e => {
//     e.preventDefault();
//     try {
//       const language_id = getLanguageId(selectedLanguage);
//       const stdin = problem.testcases.map(tc => tc.input);
//       const expected_outputs = problem.testcases.map(tc => tc.output);
//       executeCode(code, language_id, stdin, expected_outputs, id);
//     } catch (error) {
//       console.log("Error executing code", error);
//     }
//   };
//
//   if (isProblemLoading || !problem) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-base-200">
//         <div className="card bg-base-100 p-8 shadow-xl">
//           <span className="loading loading-spinner loading-lg text-primary"></span>
//           <p className="mt-4 text-base-content/70">Loading problem...</p>
//         </div>
//       </div>
//     );
//   }
//
//   const successRate = (correctSubmissions / submissionCount) * 100;
//
//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "description":
//         return (
//           <div className="prose max-w-none">
//             <p className="text-lg mb-6">{problem.description}</p>
//
//             {problem.examples && (
//               <>
//                 <h3 className="text-xl font-bold mb-4">Examples:</h3>
//                 {Object.entries(problem.examples).map(([lang, example]) => (
//                   <div
//                     key={lang}
//                     className="bg-base-200 p-6 rounded-xl mb-6 font-mono"
//                   >
//                     <div className="mb-4">
//                       <div className="text-indigo-300 mb-2 text-base font-semibold">
//                         Input:
//                       </div>
//                       <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white">
//                         {example.input}
//                       </span>
//                     </div>
//                     <div className="mb-4">
//                       <div className="text-indigo-300 mb-2 text-base font-semibold">
//                         Output:
//                       </div>
//                       <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white">
//                         {example.output}
//                       </span>
//                     </div>
//                     {example.explanation && (
//                       <div>
//                         <div className="text-emerald-300 mb-2 text-base font-semibold">
//                           Explanation:
//                         </div>
//                         <p className="text-base-content/70 text-lg font-sem">
//                           {example.explanation}
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </>
//             )}
//
//             {problem.constraints && (
//               <>
//                 <h3 className="text-xl font-bold mb-4">Constraints:</h3>
//                 <div className="bg-base-200 p-6 rounded-xl mb-6">
//                   <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white text-lg">
//                     {problem.constraints}
//                   </span>
//                 </div>
//               </>
//             )}
//           </div>
//         );
//       case "submissions":
//         return (
//           <SubmissionsList
//             submissions={submissions}
//             isLoading={isSubmissionsLoading}
//           />
//         );
//       case "discussion":
//         return (
//           <div className="p-4 text-center text-base-content/70">
//             No discussions yet
//           </div>
//         );
//       case "hints":
//         return (
//           <div className="p-4">
//             {problem?.hints ? (
//               <div className="bg-base-200 p-6 rounded-xl">
//                 <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white text-lg">
//                   {problem.hints}
//                 </span>
//               </div>
//             ) : (
//               <div className="text-center text-base-content/70">
//                 No hints available
//               </div>
//             )}
//           </div>
//         );
//       default:
//         return null;
//     }
//   };
//
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-base-300 to-base-200 max-w-7xl w-full">
//       <nav className="navbar bg-base-100 shadow-lg px-4">
//         <div className="flex-1 gap-2">
//           <Link to={"/"} className="flex items-center gap-2 text-primary">
//             <Home className="w-6 h-6" />
//             <ChevronRight className="w-4 h-4" />
//           </Link>
//           <div className="mt-2">
//             <h1 className="text-xl font-bold">{problem.title}</h1>
//             <div className="flex items-center gap-2 text-sm text-base-content/70 mt-5">
//               <Clock className="w-4 h-4" />
//               <span>
//                 Updated{" "}
//                 {new Date(problem.createdAt).toLocaleString("en-US", {
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                 })}
//               </span>
//               <span className="text-base-content/30">•</span>
//               <Users className="w-4 h-4" />
//               <span>{submissionCount} Submissions</span>
//               <span className="text-base-content/30">•</span>
//               <ThumbsUp className="w-4 h-4" />
//               <span>{successRate.toFixed(1)}% Success Rate</span>
//             </div>
//           </div>
//         </div>
//         <div className="flex-none gap-4">
//           <button
//             className={`btn btn-ghost btn-circle ${
//               isBookmarked ? "text-primary" : ""
//             }`}
//             onClick={() => setIsBookmarked(!isBookmarked)}
//           >
//             <Bookmark className="w-5 h-5" />
//           </button>
//           <button className="btn btn-ghost btn-circle">
//             <Share2 className="w-5 h-5" />
//           </button>
//           <select
//             className="select select-bordered select-primary w-40"
//             value={selectedLanguage}
//             onChange={handleLanguageChange}
//           >
//             {Object.keys(problem.codeSnippets || {}).map(lang => (
//               <option key={lang} value={lang}>
//                 {lang.charAt(0).toUpperCase() + lang.slice(1)}
//               </option>
//             ))}
//           </select>
//         </div>
//       </nav>
//
//       <div className="container mx-auto p-4">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <div className="card bg-base-100 shadow-xl">
//             <div className="card-body p-0">
//               <div className="tabs tabs-bordered">
//                 <button
//                   className={`tab gap-2 ${
//                     activeTab === "description" ? "tab-active" : ""
//                   }`}
//                   onClick={() => setActiveTab("description")}
//                 >
//                   <FileText className="w-4 h-4" />
//                   Description
//                 </button>
//                 <button
//                   className={`tab gap-2 ${
//                     activeTab === "submissions" ? "tab-active" : ""
//                   }`}
//                   onClick={() => setActiveTab("submissions")}
//                 >
//                   <Code2 className="w-4 h-4" />
//                   Submissions
//                 </button>
//                 <button
//                   className={`tab gap-2 ${
//                     activeTab === "discussion" ? "tab-active" : ""
//                   }`}
//                   onClick={() => setActiveTab("discussion")}
//                 >
//                   <MessageSquare className="w-4 h-4" />
//                   Discussion
//                 </button>
//                 <button
//                   className={`tab gap-2 ${
//                     activeTab === "hints" ? "tab-active" : ""
//                   }`}
//                   onClick={() => setActiveTab("hints")}
//                 >
//                   <Lightbulb className="w-4 h-4" />
//                   Hints
//                 </button>
//               </div>
//
//               <div className="p-6">{renderTabContent()}</div>
//             </div>
//           </div>
//
//           <div className="card bg-base-100 shadow-xl">
//             <div className="card-body p-0">
//               <div className="tabs tabs-bordered">
//                 <button className="tab tab-active gap-2">
//                   <Terminal className="w-4 h-4" />
//                   Code Editor
//                 </button>
//               </div>
//
//               <div className="h-[600px] w-full">
//                 <Editor
//                   height="100%"
//                   language={selectedLanguage.toLowerCase()}
//                   theme="vs-dark"
//                   value={code}
//                   onChange={value => setCode(value || "")}
//                   options={{
//                     minimap: {enabled: false},
//                     fontSize: 20,
//                     lineNumbers: "on",
//                     roundedSelection: false,
//                     scrollBeyondLastLine: false,
//                     readOnly: false,
//                     automaticLayout: true,
//                   }}
//                 />
//               </div>
//
//               <div className="p-4 border-t border-base-300 bg-base-200">
//                 <div className="flex justify-between items-center">
//                   <button
//                     className={`btn btn-primary gap-2 ${
//                       isExecuting ? "loading" : ""
//                     }`}
//                     onClick={handleRunCode}
//                     disabled={isExecuting}
//                   >
//                     {!isExecuting && <Play className="w-4 h-4" />}
//                     Run Code
//                   </button>
//                   <button className="btn btn-success gap-2">
//                     Submit Solution
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//
//         <div className="card bg-base-100 shadow-xl mt-6">
//           <div className="card-body">
//             {submission ? (
//               <Submission submission={submission} />
//             ) : (
//               <>
//                 <div className="flex items-center justify-between mb-6">
//                   <h3 className="text-xl font-bold">Test Cases</h3>
//                 </div>
//                 <div className="overflow-x-auto">
//                   <table className="table table-zebra w-full">
//                     <thead>
//                       <tr>
//                         <th>Input</th>
//                         <th>Expected Output</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {testcases.map((testCase, index) => (
//                         <tr key={index}>
//                           <td className="font-mono">{testCase.input}</td>
//                           <td className="font-mono">{testCase.output}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default ProblemPage;

import React, {useState, useEffect} from "react";
import Editor from "@monaco-editor/react";
import toast from "react-hot-toast";
import {
  Play,
  FileText,
  MessageSquare,
  Lightbulb,
  Bookmark,
  Share2,
  Clock,
  ChevronRight,
  BookOpen,
  Terminal,
  Code2,
  Users,
  ThumbsUp,
  Home,
} from "lucide-react";
import {Link, useParams} from "react-router-dom";
import useProblemStore from "../../stores/useProblemStore";
import {useSubmissionStore} from "../../stores/useSubmissionStore";
import {useExecutionStore} from "../../stores/useExecuteStore.js";
import SubmissionsList from "../../components/submission/SubmissionList.jsx";
import Submission from "../../components/submission/Submission.jsx";
import {getLanguageId} from "../../libs/lang.js";
import {useTheme} from "../../components/ui/ThemeProvider.jsx";
import DiscussionSection from "../../components/problem/DiscussionSection.jsx";

const ProblemPage = () => {
  const {id} = useParams();
  const {getProblemById, problem, isProblemLoading} = useProblemStore();
  const {
    submission: submissions,
    isLoading: isSubmissionsLoading,
    isSubmitting,
    getSubmissionForProblem,
    getSubmissionCountForProblem,
    correctSubmissions,
    submissionCount,
    submitSolution,
  } = useSubmissionStore();
  const {theme} = useTheme();

  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [testcases, setTestCases] = useState([]);

  const {executeCode, submission, isExecuting} = useExecutionStore();

  useEffect(() => {
    getProblemById(id);
    getSubmissionCountForProblem(id);
  }, [id]);

  useEffect(() => {
    if (problem) {
      setCode(problem.codeSnippets?.[selectedLanguage.toUpperCase()] || "");
      console.log("selectedLanguage:", selectedLanguage);
      console.log("Problem code snippets:", problem.codeSnippets.JAVASCRIPT);
      console.log("code:", code);
      setTestCases(
        problem.testcases?.map(
          tc =>
            ({
              input: tc.input,
              output: tc.output,
            }) || []
        )
      );
    }
  }, [problem, selectedLanguage]);

  useEffect(() => {
    if (activeTab === "submissions" && id) {
      getSubmissionForProblem(id);
    }
  }, [activeTab, id]);

  console.log("Submissions:", JSON.stringify(submissions));

  const handleLanguageChange = e => {
    const lang = e.target.value;
    setSelectedLanguage(lang);
    setCode(problem.codeSnippets?.[lang] || "");
  };

  const handleRunCode = e => {
    e.preventDefault();
    try {
      const problemDifficulty = problem.difficulty;
      const language_id = getLanguageId(selectedLanguage);
      const stdin = problem.testcases.map(tc => tc.input);
      const expected_outputs = problem.testcases.map(tc => tc.output);
      executeCode(
        code,
        language_id,
        problemDifficulty,
        stdin,
        expected_outputs,
        id
      );
    } catch (error) {
      console.log("Error executing code", error);
    }
  };

  const handleSubmitSolution = e => {
    e.preventDefault();
    try {
      // Validate code is not empty
      if (!code.trim()) {
        toast.error("Please write some code before submitting");
        return;
      }

      const language_id = getLanguageId(selectedLanguage);
      submitSolution(code, language_id, id);

      // Switch to submissions tab after submission
      setActiveTab("submissions");
    } catch (error) {
      console.log("Error submitting solution", error);
    }
  };

  const successRate = (correctSubmissions / submissionCount) * 100;

  if (isProblemLoading || !problem) {
    return (
      <div className="grid place-items-center h-screen">
        <div className="text-center">
          <div className="w-12 h-12 animate-spin text-[var(--primary)] mb-4 mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-full h-full"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
            </svg>
          </div>
          <p className="text-[var(--muted-foreground)] animate-pulse">
            Loading problem...
          </p>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="prose max-w-none">
            <p className="text-lg mb-6">{problem.description}</p>

            {problem.examples && (
              <>
                <h3 className="text-xl font-bold mb-4">Examples:</h3>
                {Object.entries(problem.examples).map(([lang, example]) => (
                  <div
                    key={lang}
                    className="bg-[var(--secondary)] p-6 rounded-xl mb-6 font-mono"
                  >
                    <div className="flex justify-between items-center">
                      <div className="mb-4">
                        <div className="text-[var(--primary)] mb-2 text-base font-semibold">
                          Input:
                        </div>
                        <span className="bg-[var(--background)] px-4 py-1 rounded-lg font-semibold text-[var(--foreground)]">
                          {example.input}
                        </span>
                      </div>
                      <div className="mb-4">
                        <div className="text-[var(--primary)] mb-2 text-base font-semibold">
                          Output:
                        </div>
                        <span className="bg-[var(--background)] px-4 py-1 rounded-lg font-semibold text-[var(--foreground)]">
                          {example.output}
                        </span>
                      </div>
                    </div>
                    {example.explanation && (
                      <div>
                        <div className="text-[var(--accent)] mb-2 text-base font-semibold">
                          Explanation:
                        </div>
                        <p className="text-[var(--muted-foreground)] text-lg font-sem">
                          {example.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}

            {problem.constraints && (
              <>
                <h3 className="text-xl font-bold mb-4">Constraints:</h3>
                <div className="bg-[var(--secondary)] p-6 rounded-xl mb-6">
                  <span className="bg-[var(--background)] px-4 py-1 rounded-lg font-semibold text-[var(--foreground)] text-lg">
                    {problem.constraints}
                  </span>
                </div>
              </>
            )}
          </div>
        );
      case "submissions":
        return (
          <SubmissionsList
            submissions={submissions}
            isLoading={isSubmissionsLoading}
          />
        );
      case "discussion":
        return <DiscussionSection problemId={problem.id} />;
      case "hints":
        return (
          <div className="p-4">
            {problem?.hints ? (
              <div className="bg-[var(--secondary)] p-6 rounded-xl">
                <span className="bg-[var(--background)] px-4 py-1 rounded-lg font-semibold text-[var(--foreground)] text-lg">
                  {problem.hints}
                </span>
              </div>
            ) : (
              <div className="text-center text-[var(--muted-foreground)]">
                No hints available
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="min-h-screen w-full relative overflow-x-hidden">
      {/* Background gradients - using absolute positioning instead of flexbox */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[var(--primary)] opacity-10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-40 -right-20 w-72 h-72 bg-[var(--primary)] opacity-10 rounded-full blur-3xl animate-pulse delay-200"></div>
      <div className="absolute top-60 right-20 w-48 h-48 bg-[var(--accent)] opacity-10 rounded-full blur-3xl animate-pulse delay-300"></div>

      {/* Code pattern background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 text-[var(--primary)] text-opacity-20 text-xs font-mono">
          {Array.from({length: 10}).map((_, i) => (
            <div key={i} className="my-2">
              {`function solve(input) {`}
              <br />
              {`  const result = [];`}
              <br />
              {`  // Your solution here`}
              <br />
              {`  return result;`}
              <br />
              {`}`}
            </div>
          ))}
        </div>
        <div className="absolute top-10 right-10 text-[var(--primary)] text-opacity-20 text-xs font-mono">
          {Array.from({length: 10}).map((_, i) => (
            <div key={i} className="my-2">
              {`class Solution {`}
              <br />
              {`  public int[] twoSum(int[] nums, int target) {`}
              <br />
              {`    // Your solution here`}
              <br />
              {`    return new int[]{0, 1};`}
              <br />
              {`  }`}
              <br />
              {`}`}
            </div>
          ))}
        </div>
      </div>

      <nav className="relative z-10 bg-[var(--card)] shadow-lg border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Link
              to={"/"}
              className="inline-flex items-center gap-2 text-[var(--primary)] hover:text-[var(--primary)] transition-colors"
            >
              <Home className="w-5 h-5" />
              <ChevronRight className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-[var(--card-foreground)]">
                {problem.title}
              </h1>
              <div className="inline-grid grid-flow-col auto-cols-max gap-2 text-sm text-[var(--muted-foreground)] mt-1 items-center flex-wrap">
                <Clock className="w-4 h-4" />
                <span>
                  Updated{" "}
                  {new Date(problem.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="text-[var(--muted-foreground)] opacity-30">
                  •
                </span>
                <Users className="w-4 h-4" />
                <span>{submissionCount} Submissions</span>
                <span className="text-[var(--muted-foreground)] opacity-30">
                  •
                </span>
                <ThumbsUp className="w-4 h-4" />
                <span>{successRate.toFixed(1)}% Success Rate</span>
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center gap-4">
            <button
              className={`p-2 rounded-full hover:bg-[var(--accent)] hover:bg-opacity-10 transition-colors ${isBookmarked ? "text-[var(--primary)]" : "text-[var(--muted-foreground)]"}`}
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-[var(--accent)] hover:bg-opacity-10 transition-colors text-[var(--muted-foreground)]">
              <Share2 className="w-5 h-5" />
            </button>
            <select
              className="px-3 py-2 bg-[var(--secondary)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--card-foreground)] w-40"
              value={selectedLanguage.toUpperCase()}
              onChange={handleLanguageChange}
            >
              {Object.keys(problem.codeSnippets || {}).map(lang => (
                <option key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-8xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[var(--card)] shadow-xl rounded-xl border border-[var(--border)]">
            <div className="p-0">
              <div className="flex border-b border-[var(--border)]">
                <button
                  className={`px-4 py-3 flex items-center gap-2 font-medium text-sm ${activeTab === "description" ? "text-[var(--primary)] border-b-2 border-[var(--primary)]" : "text-[var(--muted-foreground)] hover:text-[var(--card-foreground)]"}`}
                  onClick={() => setActiveTab("description")}
                >
                  <FileText className="w-4 h-4" />
                  Description
                </button>
                <button
                  className={`px-4 py-3 flex items-center gap-2 font-medium text-sm ${activeTab === "submissions" ? "text-[var(--primary)] border-b-2 border-[var(--primary)]" : "text-[var(--muted-foreground)] hover:text-[var(--card-foreground)]"}`}
                  onClick={() => setActiveTab("submissions")}
                >
                  <Code2 className="w-4 h-4" />
                  Submissions
                </button>
                <button
                  className={`px-4 py-3 flex items-center gap-2 font-medium text-sm ${activeTab === "discussion" ? "text-[var(--primary)] border-b-2 border-[var(--primary)]" : "text-[var(--muted-foreground)] hover:text-[var(--card-foreground)]"}`}
                  onClick={() => setActiveTab("discussion")}
                >
                  <MessageSquare className="w-4 h-4" />
                  Discussion
                </button>
                <button
                  className={`px-4 py-3 flex items-center gap-2 font-medium text-sm ${activeTab === "hints" ? "text-[var(--primary)] border-b-2 border-[var(--primary)]" : "text-[var(--muted-foreground)] hover:text-[var(--card-foreground)]"}`}
                  onClick={() => setActiveTab("hints")}
                >
                  <Lightbulb className="w-4 h-4" />
                  Hints
                </button>
              </div>

              <div className="p-6">{renderTabContent()}</div>
            </div>
          </div>

          <div className="bg-[var(--card)] shadow-xl rounded-xl border border-[var(--border)]">
            <div className="p-0">
              <div className="flex border-b border-[var(--border)]">
                <div className="px-4 py-3 flex items-center gap-2 font-medium text-sm text-[var(--primary)] border-b-2 border-[var(--primary)]">
                  <Terminal className="w-4 h-4" />
                  Code Editor
                </div>
              </div>

              <div className="h-[600px] w-full overflow-hidden">
                <Editor
                  height="100%"
                  width="100%"
                  language={selectedLanguage.toLowerCase()}
                  theme={theme === "dark" ? "vs-dark" : "vs-light"}
                  value={code}
                  onChange={value => setCode(value || "")}
                  options={{
                    minimap: {enabled: true},
                    fontSize: 16,
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    readOnly: false,
                    automaticLayout: true,
                    wordWrap: "on",
                  }}
                />
              </div>

              <div className="p-4 border-t border-[var(--border)] bg-[var(--secondary)]">
                <div className="flex justify-between items-center">
                  <button
                    className={`px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-md flex items-center gap-2 hover:opacity-90 transition-opacity ${isExecuting ? "opacity-70" : ""}`}
                    onClick={handleRunCode}
                    disabled={isExecuting}
                  >
                    {!isExecuting && <Play className="w-4 h-4" />}
                    {isExecuting ? "Running..." : "Run Code"}
                  </button>
                  <button
                    className={`px-4 py-2 bg-[var(--accent)] text-[var(--accent-foreground)] rounded-md flex items-center gap-2 hover:opacity-90 transition-opacity ${isSubmitting ? "opacity-70" : ""}`}
                    onClick={handleSubmitSolution}
                    disabled={isSubmitting || isExecuting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Solution"}
                  </button>
                </div>
              </div>
            </div>

            <div className=" shadow-xl rounded-xl border border-[var(--border)] m-6 text-center bg-[var(--secondary)]">
              <div className="p-6 ">
                {submission ? (
                  <Submission submission={submission} />
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-6 mx-3">
                      <h3 className="text-xl font-bold text-[var(--card-foreground)]">
                        Test Cases
                      </h3>
                    </div>
                    <div className="overflow-x-auto px-2">
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-4 font-semibold text-xs text-[var(--muted-foreground)] uppercase tracking-wider pb-2 border-b border-[var(--border)]">
                          <div>Input</div>
                          <div>Expected Output</div>
                        </div>
                        {testcases.map((testCase, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-2 gap-4 items-center py-3 border-b border-[var(--border)] hover:bg-[var(--accent)] hover:bg-opacity-5"
                          >
                            <div className="font-mono text-[var(--card-foreground)] px-2">
                              {testCase.input}
                            </div>
                            <div className="font-mono text-[var(--card-foreground)] px-2">
                              {testCase.output}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemPage;
