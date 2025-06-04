import React from "react";
import {Link} from "react-router-dom";
import {
  Code,
  Brain,
  Zap,
  Rocket,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";

const HomePage = () => {
  return (
    <section className="min-h-screen w-full overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative mb-20 max-w-7xl mx-auto">
        {/* Background gradients */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-[var(--primary)] opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-[var(--primary)] opacity-10 rounded-full blur-3xl animate-pulse delay-200"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-[var(--accent)] opacity-10 rounded-full blur-3xl animate-pulse delay-300"></div>

        {/* Hero content with image */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12 px-4">
          {/* Left side - Text content */}
          <div className="text-left md:pr-8 animate-fadeIn">
            <div className="inline-block mb-4 bg-[var(--primary)] bg-opacity-10 px-4 py-2 rounded-full">
              <span className="text-[var(--primary-foreground)] font-semibold">
                The Ultimate Coding Practice Platform
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent leading-tight animate-slideUp animation-delay-100">
              Master Coding
              <br />
              Challenges with
              <br />
              CodeVue
            </h1>
            <p className="text-lg md:text-xl text-[var(--muted-foreground)] mb-8 animate-slideUp animation-delay-200">
              An interactive coding platform that helps you prepare for
              technical interviews and strengthen your programming skills by
              solving real-time coding challenges.
            </p>
            <div className="flex flex-wrap gap-4 animate-slideUp animation-delay-300">
              <Link to="/problems">
                <Button
                  variant="gradient"
                  size="lg"
                  icon={<Rocket className="w-5 h-5 animate-rocket-launch" />}
                  className="border-0 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white font-bold px-10 py-3 rounded-full shadow-lg hover:from-[var(--accent)] hover:to-[var(--primary)] transition-all duration-500 ease-in-out transform hover:scale-105 focus:ring-4 focus:ring-[var(--accent)] focus:outline-none animate-bounce animate-delay-300 animate-duration-700 animate-once"
                >
                  Start Coding
                </Button>
              </Link>
            </div>
          </div>

          {/* Right side - Hero image */}
          <div className="relative animate-fadeIn animation-delay-300">
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl border border-[var(--border)]">
              {/* Laptop mockup with code editor */}
              <div className="absolute inset-0 bg-[var(--card)] p-4">
                {/* Code editor header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-[var(--muted-foreground)] font-mono">
                    CodeVue Editor
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-[var(--primary)] opacity-50"></div>
                    <div className="w-3 h-3 rounded-full bg-[var(--primary)] opacity-70"></div>
                    <div className="w-3 h-3 rounded-full bg-[var(--primary)]"></div>
                  </div>
                </div>

                {/* Code editor content */}
                <div className="bg-[var(--background)] rounded-lg p-4 h-[calc(100%-2rem)] overflow-hidden font-mono text-sm">
                  <div className="flex">
                    <div className="text-[var(--muted-foreground)] text-right pr-4 select-none">
                      {Array.from({length: 15}).map((_, i) => (
                        <div key={i} className="h-6">
                          {i + 1}
                        </div>
                      ))}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="text-[var(--primary)] animate-slideUp animation-delay-100">
                        function twoSum(nums, target) {"{"}
                      </div>
                      <div className="pl-4 animate-slideUp animation-delay-200">
                        // Find two numbers that add up to target
                      </div>
                      <div className="pl-4 animate-slideUp animation-delay-300">
                        const map = new Map();
                      </div>
                      <div className="pl-4 animate-slideUp animation-delay-300"></div>
                      <div className="pl-4 animate-slideUp animation-delay-400">
                        for (let i = 0; i {"<"} nums.length; i++) {"{"}
                      </div>
                      <div className="pl-8 animate-slideUp animation-delay-500">
                        const complement = target - nums[i];
                      </div>
                      <div className="pl-8 animate-slideUp animation-delay-500 text-[var(--accent)]">
                        // Check if complement exists in map
                      </div>
                      <div className="pl-8 animate-slideUp animation-delay-600">
                        if (map.has(complement ) {"{"}
                      </div>
                      <div className="pl-12 animate-slideUp animation-delay-600 animate-pulse">
                        return [map.get(complement), i];
                      </div>
                      <div className="pl-8 animate-slideUp animation-delay-700">
                        {"}"}
                      </div>
                      <div className="pl-8 animate-slideUp animation-delay-700">
                        map.set(nums[i], i);
                      </div>
                      <div className="pl-4 animate-slideUp animation-delay-800">
                        {"}"}
                      </div>
                      <div className="pl-4 animate-slideUp animation-delay-800"></div>
                      <div className="pl-4 animate-slideUp animation-delay-900">
                        return [];
                      </div>
                      <div className="animate-slideUp animation-delay-900">
                        {"}"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-5 -right-5 animate-float">
                <div className="w-16 h-16 rounded-xl bg-[var(--primary)] bg-opacity-20 flex items-center justify-center shadow-lg">
                  <Code className="w-8 h-8 text-[var(--primary)]" />
                </div>
              </div>
              <div className="absolute -bottom-5 -left-5 animate-float delay-300">
                <div className="w-14 h-14 rounded-xl bg-[var(--accent)] bg-opacity-20 flex items-center justify-center shadow-lg">
                  <Brain className="w-7 h-7 text-[var(--accent)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 w-full max-w-7xl mx-auto px-4">
        <div className="bg-[var(--card)] shadow-lg p-8 rounded-xl border border-[var(--border)] text-center transform hover:scale-105 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[var(--primary)] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
          <p className="text-3xl md:text-5xl font-bold text-[var(--primary)] mb-3">
            100+
          </p>
          <p className="text-[var(--muted-foreground)]">Coding Challenges</p>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[var(--primary)] opacity-5 rounded-full"></div>
        </div>
        <div className="bg-[var(--card)] shadow-lg p-8 rounded-xl border border-[var(--border)] text-center transform hover:scale-105 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[var(--primary)] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
          <p className="text-3xl md:text-5xl font-bold text-[var(--primary)] mb-3">
            10k+
          </p>
          <p className="text-[var(--muted-foreground)]">Active Users</p>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[var(--primary)] opacity-5 rounded-full"></div>
        </div>
        <div className="bg-[var(--card)] shadow-lg p-8 rounded-xl border border-[var(--border)] text-center transform hover:scale-105 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[var(--primary)] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
          <p className="text-3xl md:text-5xl font-bold text-[var(--primary)] mb-3">
            5+
          </p>
          <p className="text-[var(--muted-foreground)]">Languages</p>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[var(--primary)] opacity-5 rounded-full"></div>
        </div>
        <div className="bg-[var(--card)] shadow-lg p-8 rounded-xl border border-[var(--border)] text-center transform hover:scale-105 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[var(--primary)] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
          <p className="text-3xl md:text-5xl font-bold text-[var(--primary)] mb-3">
            24/7
          </p>
          <p className="text-[var(--muted-foreground)]">Support</p>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[var(--primary)] opacity-5 rounded-full"></div>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full mb-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 animate-fadeIn">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[var(--primary)] bg-opacity-10 w-30">
            <span className="text-[var(--primary-foreground)] text-m font-medium">
              Features
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose CodeVue?
          </h2>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
            Our platform offers everything you need to excel in coding
            interviews and improve your programming skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group relative animate-slideUp animation-delay-100">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <Card
              hover
              className="h-full relative bg-[var(--card)] border-[var(--border)]"
            >
              <Card.Body>
                {/* Feature image */}
                <div className="mb-6 relative h-48 overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-[var(--background)] opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      {/* Language icons */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-wrap justify-center gap-3 w-4/5">
                        <div className="w-12 h-12 rounded-lg bg-yellow-400 flex items-center justify-center text-black font-bold text-xl shadow-lg animate-float">
                          JS
                        </div>
                        <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg animate-float delay-200">
                          Py
                        </div>
                        <div className="w-12 h-12 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold text-xl shadow-lg animate-float delay-300">
                          Ja
                        </div>
                        <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center text-white font-bold text-xl shadow-lg animate-float delay-100">
                          C#
                        </div>
                        <div className="w-12 h-12 rounded-lg bg-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg animate-float delay-500">
                          C++
                        </div>
                      </div>

                      {/* Code icon */}
                      <div className="absolute bottom-2 right-2">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--primary)] text-white group-hover:scale-110 transition-transform duration-300">
                          <Code size={20} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Card.Title className="text-center text-xl mb-3 text-[var(--card-foreground)]">
                  Multiple Languages
                </Card.Title>
                <p className="text-[var(--muted-foreground)] text-center">
                  Solve problems in JavaScript, Python, Java, and more to expand
                  your programming toolkit.
                </p>
                <div className="mt-6 text-center">
                  <span className="inline-flex items-center text-[var(--primary)] text-sm font-medium hover:underline cursor-pointer">
                    Learn more
                    <ChevronRight className="ml-1 w-4 h-4" />
                  </span>
                </div>
              </Card.Body>
            </Card>
          </div>

          <div className="group relative animate-slideUp animation-delay-300">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <Card
              hover
              className="h-full relative bg-[var(--card)] border-[var(--border)]"
            >
              <Card.Body>
                {/* Feature image */}
                <div className="mb-6 relative h-48 overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)] to-[var(--background)] opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      {/* Algorithm visualization */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5">
                        <div className="flex justify-between items-end h-24 mb-4">
                          {Array.from({length: 8}).map((_, i) => {
                            const height = 30 + Math.floor(Math.random() * 70);
                            return (
                              <div
                                key={i}
                                className="w-6 bg-gradient-to-t from-[var(--primary)] to-[var(--accent)] rounded-t-md animate-pulse"
                                style={{height: `${height}%`}}
                              ></div>
                            );
                          })}
                        </div>
                        <div className="h-1 w-full bg-[var(--muted-foreground)] opacity-30 rounded-full"></div>
                      </div>

                      {/* Brain icon */}
                      <div className="absolute bottom-2 right-2">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--accent)] text-white group-hover:scale-110 transition-transform duration-300">
                          <Brain size={20} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Card.Title className="text-center text-xl mb-3 text-[var(--card-foreground)]">
                  Algorithm Mastery
                </Card.Title>
                <p className="text-[var(--muted-foreground)] text-center">
                  Practice a wide range of algorithms and data structures to ace
                  your technical interviews.
                </p>
                <div className="mt-6 text-center">
                  <span className="inline-flex items-center text-[var(--primary)] text-sm font-medium hover:underline cursor-pointer">
                    Learn more
                    <ChevronRight className="ml-1 w-4 h-4" />
                  </span>
                </div>
              </Card.Body>
            </Card>
          </div>

          <div className="group relative animate-slideUp animation-delay-500">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <Card
              hover
              className="h-full relative bg-[var(--card)] border-[var(--border)]"
            >
              <Card.Body>
                {/* Feature image */}
                <div className="mb-6 relative h-48 overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-[var(--background)] opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      {/* Test results visualization */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5">
                        <div className="bg-[var(--background)] p-3 rounded-lg shadow-inner mb-3">
                          <div className="flex items-center mb-2">
                            <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                            <div className="text-xs text-[var(--foreground)]">
                              Test Case 1: Passed
                            </div>
                          </div>
                          <div className="text-xs font-mono text-[var(--muted-foreground)] pl-6">
                            Input: [1, 2, 3] → Output: 6
                          </div>
                        </div>

                        <div className="bg-[var(--background)] p-3 rounded-lg shadow-inner mb-3 animate-pulse">
                          <div className="flex items-center mb-2">
                            <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                            <div className="text-xs text-[var(--foreground)]">
                              Test Case 2: Passed
                            </div>
                          </div>
                          <div className="text-xs font-mono text-[var(--muted-foreground)] pl-6">
                            Input: [4, 5] → Output: 9
                          </div>
                        </div>

                        <div className="bg-[var(--background)] p-3 rounded-lg shadow-inner">
                          <div className="flex items-center mb-2">
                            <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                            <div className="text-xs text-[var(--foreground)]">
                              Test Case 3: Failed
                            </div>
                          </div>
                          <div className="text-xs font-mono text-[var(--muted-foreground)] pl-6">
                            Expected: 15, Got: 10
                          </div>
                        </div>
                      </div>

                      {/* Zap icon */}
                      <div className="absolute bottom-2 right-2">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--primary)] text-white group-hover:scale-110 transition-transform duration-300">
                          <Zap size={20} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Card.Title className="text-center text-xl mb-3 text-[var(--card-foreground)]">
                  Real-time Feedback
                </Card.Title>
                <p className="text-[var(--muted-foreground)] text-center">
                  Get instant feedback on your solutions with detailed test case
                  results and performance metrics.
                </p>
                <div className="mt-6 text-center">
                  <span className="inline-flex items-center text-[var(--primary)] text-sm font-medium hover:underline cursor-pointer">
                    Learn more
                    <ChevronRight className="ml-1 w-4 h-4" />
                  </span>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="w-full mb-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-6 py-2 rounded-full bg-[var(--primary)] bg-opacity-10">
            <span className="text-[var(--primary-foreground)] text-m font-medium">
              Simple Process
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
            Follow these simple steps to start improving your coding skills
            today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connection lines */}
          {/*<div className="absolute top-1/2 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] hidden md:block"></div>*/}

          <div className="relative z-10">
            {/*<div className="absolute top-0 right-0 mr-4 mt-8 hidden md:block">*/}
            {/*  <ArrowRight className="w-8 h-8 text-[var(--primary)]" />*/}
            {/*</div>*/}
            <Card className="h-full bg-[var(--card)] border-[var(--border)] shadow-lg hover:shadow-xl transition-shadow">
              <Card.Body>
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[var(--primary)] text-white mb-6 mx-auto shadow-md">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <Card.Title className="mb-3 text-center text-xl text-[var(--card-foreground)]">
                  Choose a Challenge
                </Card.Title>
                <p className="text-[var(--muted-foreground)] text-center">
                  Browse our collection of coding challenges filtered by
                  difficulty and topics.
                </p>
                <div className="mt-6 text-center">
                  <Link to="/problems">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[var(--primary)]"
                    >
                      View Challenges
                    </Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </div>

          <div className="relative z-10 mt-12 md:mt-0">
            {/*<div className="absolute top-0 right-0 -mr-4 mt-8 hidden md:block">*/}
            {/*  <ArrowRight className="w-8 h-8 text-[var(--primary)]" />*/}
            {/*</div>*/}
            <Card className="h-full bg-[var(--card)] border-[var(--border)] shadow-lg hover:shadow-xl transition-shadow">
              <Card.Body>
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[var(--primary)] text-white mb-6 mx-auto shadow-md">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <Card.Title className="mb-3 text-center text-xl text-[var(--card-foreground)]">
                  Solve the Problem
                </Card.Title>
                <p className="text-[var(--muted-foreground)] text-center">
                  Write your solution in our interactive code editor with syntax
                  highlighting.
                </p>
                <div className="mt-6 text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[var(--primary)]"
                  >
                    Try Editor
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>

          <div className="relative z-10 mt-12 md:mt-0">
            <Card className="h-full bg-[var(--card)] border-[var(--border)] shadow-lg hover:shadow-xl transition-shadow">
              <Card.Body>
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[var(--primary)] text-white mb-6 mx-auto shadow-md">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <Card.Title className="mb-3 text-center text-xl text-[var(--card-foreground)]">
                  Get Feedback
                </Card.Title>
                <p className="text-[var(--muted-foreground)] text-center">
                  Submit your solution and receive instant feedback on
                  correctness and performance.
                </p>
                <div className="mt-6 text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[var(--primary)]"
                  >
                    See Example
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

      {/* Explore Challenges Section */}
      <div className="mb-20 max-w-7xl mx-auto px-4" id="explore-challenges">
        <div className="w-full">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[var(--primary)] bg-opacity-10">
              <span className="text-[var(--primary-foreground)] text-sm font-medium">
                Explore Challenges
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 ">
              Ready to Test Your Skills?
            </h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
              Visit our dedicated Problems page to browse our collection of
              coding challenges and start solving them today.
            </p>
          </div>

          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[var(--primary)] opacity-5 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[var(--accent)] opacity-5 rounded-full blur-2xl"></div>

            <Card className="relative z-10 bg-[var(--card)] border-[var(--border)] shadow-2xl rounded-2xl overflow-hidden group flex flex-col md:flex-row items-center justify-between">
              {/* Left: Animated Illustration */}
              <div className="hidden md:flex items-center justify-center w-1/2 h-full">
                <img
                  src="/hiteshsir.png"
                  alt="Coding Problem"
                  className="h-80 w-80 object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110 animate-[floatY_3s_ease-in-out_infinite,wiggle_1.5s_ease-in-out_infinite]"
                  style={{background: "none"}}
                />
              </div>
              {/* Right: Content */}
              <Card.Body className="py-16 px-8 text-center md:text-left relative z-10 flex flex-col items-center md:items-start w-full md:w-1/2">
                <h2 className="text-3xl font-extrabold text-[var(--card-foreground)] mb-3 tracking-tight drop-shadow animate-fade-in-down animate-delay-100 animate-duration-700 animate-ease-in-out animate-once">
                  100+ Coding Challenges
                </h2>
                <p className="text-[var(--muted-foreground)] mb-10 max-w-lg mx-auto md:mx-0 text-base md:text-lg animate-fade-in-up animate-delay-300 animate-duration-700 animate-ease-in-out animate-once">
                  From easy to hard, our challenges cover a wide range of topics
                  including algorithms, data structures, and more. Sharpen your
                  skills and track your progress in a beautiful, interactive
                  environment.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 animate-fade-in-up animate-delay-500 animate-duration-700 animate-ease-in-out animate-once">
                  <Link to="/problems">
                    <Button
                      variant="gradient"
                      icon={<ExternalLink className="w-4 h-4" />}
                      className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white font-bold px-10 py-3 rounded-full shadow-lg hover:from-[var(--accent)] hover:to-[var(--primary)] transition-all border-0 text-lg animate-bounce animate-delay-700 animate-duration-700 animate-once"
                    >
                      Go to Problems
                    </Button>
                  </Link>
                </div>
              </Card.Body>
              {/* Subtle floating icon for extra flair */}
              <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-[var(--accent)] opacity-10 rounded-full blur-2xl animate-float"></div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
