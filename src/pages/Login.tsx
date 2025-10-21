import { useState } from "react";
import type { FormEvent } from "react";

import useDarkMode from "../components/useDarkMode"
import { FaMoon, FaSun, FaEye, FaEyeSlash, FaApple, FaGoogle, FaTwitter } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [darkMode, toggleDarkMode] = useDarkMode();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      alert("Login success!");
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen px-4 py-6 sm:py-12 transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-green-900 to-green-800 text-white"
          : "bg-gradient-to-br from-green-100 via-green-200 to-green-300 text-gray-900"
      }`}
    >
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl relative">
        {/* Dark Mode Toggle */}
        <div className="absolute top-4 right-4">
          <button
            onClick={toggleDarkMode}
            className="flex items-center px-3 py-2 rounded-full bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors duration-300"
          >
            {darkMode ? <FaSun className="mr-2" /> : <FaMoon className="mr-2" />}
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className={`shadow-2xl rounded-3xl p-8 sm:p-12 transition-colors duration-500 space-y-6 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-center text-3xl sm:text-4xl font-extrabold mb-4">Login</h2>

          {error && (
            <p
              className={`text-sm p-3 rounded-md text-center ${
                darkMode ? "bg-red-700 text-red-100" : "bg-red-100 text-red-700"
              }`}
            >
              {error}
            </p>
          )}

          <div className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Email"
              className={`w-full rounded-xl p-3 border focus:outline-none focus:ring-2 transition-all duration-300 ${
                darkMode
                  ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-green-400"
                  : "border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-green-400"
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`w-full rounded-xl p-3 border focus:outline-none focus:ring-2 transition-all duration-300 pr-12 ${
                  darkMode
                    ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-green-400"
                    : "border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-green-400"
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors duration-300"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Login Button with Spinner */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-green-500 text-white font-semibold text-lg hover:bg-green-600 transition-colors duration-300 flex items-center justify-center"
            disabled={loading}
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Social Login */}
          <div className="mt-6">
            <p className="text-center text-gray-400 mb-3">or login with</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button className="flex items-center justify-center px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-900 transition-colors w-full">
                <FaApple className="mr-2" /> Apple
              </button>
              <button className="flex items-center justify-center px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors w-full">
                <FaGoogle className="mr-2" /> Google
              </button>
              <button className="flex items-center justify-center px-4 py-2 rounded-xl bg-blue-400 text-white hover:bg-blue-500 transition-colors w-full">
                <FaTwitter className="mr-2" /> X
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
