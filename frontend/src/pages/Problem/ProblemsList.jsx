import React, {useEffect} from "react";
import {Loader, Code, Brain, Trophy, Filter} from "lucide-react";
import useProblemStore from "../../stores/useProblemStore.js";
import Card from "../../components/ui/Card.jsx";
import ProblemsTable from "../../components/problem/ProblemsTable.jsx";
import Button from "../../components/ui/Button.jsx";

const ProblemsList = () => {
  const {getAllProblems, problems, isProblemsLoading} = useProblemStore();

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  if (isProblemsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <Loader className="w-12 h-12 animate-spin text-[var(--primary)] mb-4" />
          <p className="text-[var(--muted-foreground)] animate-pulse">
            Loading challenges...
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen w-full relative overflow-x-hidden">
      {/* Background gradients */}
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

      <div className="relative z-10 py-10 px-4 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[var(--primary)] bg-opacity-10">
            <span className="text-[var(--primary-foreground)] text-sm font-medium">
              Coding Challenges
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
            All Problems
          </h1>
          <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
            Browse our collection of coding challenges and start solving them to
            improve your skills.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[var(--card)] shadow-lg p-6 rounded-xl border border-[var(--border)] text-center transform hover:scale-105 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[var(--primary)] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--primary)] bg-opacity-10 text-[var(--primary)] mb-4 mx-auto">
              <Code className="w-6 h-6" />
            </div>
            <p className="text-2xl font-bold text-[var(--primary)] mb-2">
              {problems.length}
            </p>
            <p className="text-[var(--muted-foreground)]">Total Problems</p>
          </div>

          <div className="bg-[var(--card)] shadow-lg p-6 rounded-xl border border-[var(--border)] text-center transform hover:scale-105 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[var(--primary)] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--primary)] bg-opacity-10 text-[var(--primary)] mb-4 mx-auto">
              <Brain className="w-6 h-6" />
            </div>
            <p className="text-2xl font-bold text-[var(--primary)] mb-2">
              {problems.filter(p => p.difficulty === "MEDIUM").length}
            </p>
            <p className="text-[var(--muted-foreground)]">Medium Difficulty</p>
          </div>

          <div className="bg-[var(--card)] shadow-lg p-6 rounded-xl border border-[var(--border)] text-center transform hover:scale-105 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[var(--primary)] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--primary)] bg-opacity-10 text-[var(--primary)] mb-4 mx-auto">
              <Trophy className="w-6 h-6" />
            </div>
            <p className="text-2xl font-bold text-[var(--primary)] mb-2">
              {problems.filter(p => p.difficulty === "HARD").length}
            </p>
            <p className="text-[var(--muted-foreground)]">Hard Challenges</p>
          </div>
        </div>

        {/* Problems Table */}
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-[var(--primary)] opacity-5 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[var(--accent)] opacity-5 rounded-full blur-2xl"></div>

          {problems.length > 0 ? (
            <div className="relative z-10">
              <ProblemsTable problems={problems} />
            </div>
          ) : (
            <Card className="relative z-10 bg-[var(--card)] border-[var(--border)] shadow-xl">
              <Card.Body className="py-20 text-center">
                <div className="w-20 h-20 rounded-full bg-[var(--primary)] bg-opacity-10 flex items-center justify-center mx-auto mb-6">
                  <Trophy className="w-10 h-10 text-[var(--primary)]" />
                </div>
                <p className="text-2xl font-bold text-[var(--card-foreground)] mb-4">
                  No problems found
                </p>
                <p className="text-[var(--muted-foreground)] mb-8 max-w-md mx-auto">
                  Our team is working on adding new challenges. Check back later
                  or subscribe to get notified.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    variant="primary"
                    className="shadow-lg shadow-[var(--primary)] shadow-opacity-20"
                  >
                    Refresh
                  </Button>
                  <Button variant="outline">Subscribe</Button>
                </div>
              </Card.Body>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProblemsList;
