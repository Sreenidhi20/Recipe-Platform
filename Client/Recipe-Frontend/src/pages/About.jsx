import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          About Me
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Learn more about the developer behind RecipeShare.
        </p>
      </div>

      {/* Developer Section */}
      <div className="p-8 md:w-2/3 mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Sreenidhi BS
        </h2>

        <p className="text-indigo-600 dark:text-indigo-400 font-semibold mb-4">
          Full Stack Developer
        </p>

        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          I'm a full stack developer who enjoys building clean, practical web
          applications from front to back. I work across technologies like
          React, .NET, and both SQL and NoSQL databases, and I'm always looking
          to learn something new along the way.
        </p>

        <div className="flex justify-center gap-4 mb-6"></div>

        <Link
          to="/"
          className="inline-block px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>

      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Share Your Recipes?
          </h2>
          <Link
            to="/register"
            className="inline-block px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Get Started Today
          </Link>
        </div>
      </div>
    </div>
  );
}
