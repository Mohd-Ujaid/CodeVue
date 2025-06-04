import React from "react";
import {Link} from "react-router-dom";
import {XCircle} from "lucide-react";

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] px-4">
      <div className="flex flex-col items-center bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-lg p-10">
        <XCircle className="w-16 h-16 text-[var(--destructive)] mb-4" />
        <h1 className="text-5xl font-bold text-[var(--primary)] mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-4">
          Page Not Found
        </h2>
        <p className="text-[var(--muted-foreground)] mb-6 text-center max-w-md">
          Oops! The page you are looking for does not exist or has been moved.
          <br />
          Please check the URL or return to the homepage.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 rounded-lg bg-[var(--primary)] text-white font-semibold shadow hover:bg-[var(--primary-hover)] transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
