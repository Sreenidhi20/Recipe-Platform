import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About RecipeShare
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            A platform for culinary enthusiasts to share, discover, and celebrate recipes from around the world.
          </p>
        </div>
      </div>

      {/* Developer Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              {/* Developer Image */}
              <div className="md:flex-shrink-0 md:w-1/3 bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="w-40 h-40 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-8xl">👩‍💻</span>
                  </div>
                </div>
              </div>

              {/* Developer Info */}
              <div className="p-8 md:w-2/3">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Sreenidhi BS
                </h2>
                <p className="text-indigo-600 dark:text-indigo-400 font-semibold mb-4">
                  Full Stack Developer & Founder
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  Sreenidhi is a passionate full-stack developer with a love for creating intuitive and engaging web applications. With expertise in modern web technologies and a keen eye for user experience, Sreenidhi created RecipeShare to bring cooking enthusiasts together and make recipe sharing effortless.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="text-2xl mr-3">💻</span>
                    <span>Specializes in MERN Stack Development</span>
                  </div>
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="text-2xl mr-3">🍳</span>
                    <span>Passionate about Food and Cooking</span>
                  </div>
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="text-2xl mr-3">🌍</span>
                    <span>Building Global Communities</span>
                  </div>
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="text-2xl mr-3">🚀</span>
                    <span>Innovation & Continuous Learning</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-4 mb-6">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                    title="Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-full hover:opacity-90 transition-opacity"
                    title="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.265-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072C2.88.08.942 2.022.8 5.047-.048 6.416.003 7.146.4 19c.134 3.024 2.044 4.961 5.102 5.101 1.28.057 1.689.073 4.948.073 3.259 0 3.668-.016 4.948-.0742 3.106-.14 4.814-2.080 4.958-5.105.058-1.265.073-1.645.073-4.849 0-3.204-.015-3.584-.074-4.849-.143-3.024-1.921-4.979-5.099-5.117-1.279-.058-1.690-.072-4.948-.072zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 11.436-2.888 1.44 1.44 0 01-.436 2.888z" />
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors"
                    title="Twitter"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors"
                    title="LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>

                <Link
                  to="/"
                  className="inline-block px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Our Mission
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Connect Communities
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Build meaningful connections between food lovers and cooking enthusiasts from around the world.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Share Knowledge
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Make cooking accessible by sharing recipes, tips, and culinary wisdom with everyone.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Inspire Creativity
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Empower users to experiment in the kitchen and discover their culinary passion.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            What Makes RecipeShare Special
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Easy Recipe Sharing
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Share your favorite recipes with beautiful descriptions and images.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  User Profiles
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Create personalized profiles to showcase your culinary interests.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Discover Recipes
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Find new recipes and cooking inspiration from talented cooks.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Connect Socially
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Share your social profiles and build your cooking network.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
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
