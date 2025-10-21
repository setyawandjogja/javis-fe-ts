import { useState } from "react";
import PageBreadcrumb from "../components/PageBreadCrumb";
import PageMeta from "../components/PageMeta";
import useDarkMode from "../components/useDarkMode";

export default function Dashboard() {
  const [darkMode, toggleDarkMode] = useDarkMode();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        alert("Logout success ✅");
        window.location.href = "/";
      } else {
        alert(data.error || "Logout failed ❌");
      }
    } catch (err: unknown) {
      alert("Network error ❌");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen px-5 py-7 xl:px-10 xl:py-12 transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <PageMeta
        title="React.js Dashboard | TailAdmin - React.js Tailwind CSS Admin Dashboard"
        description="This is the React.js Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />

      <PageBreadcrumb pageTitle="Dashboard" />

      <div
        className={`rounded-2xl border border-gray-200 p-6 transition-colors duration-500 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white"
        }`}
      >
        <div className="mx-auto w-full max-w-[630px] text-center">
          <h3
            className={`mb-4 font-semibold sm:text-2xl transition-colors duration-500 ${
              darkMode ? "text-white/90" : "text-gray-800"
            }`}
          >
            Welcome to Dashboard
          </h3>
          <p
            className={`text-sm sm:text-base mb-6 transition-colors duration-500 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Start putting content on grids or panels, you can also use different
            combinations of grids. Check out the dashboard and other pages.
          </p>

          <button
            onClick={handleLogout}
            disabled={loading}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            {loading ? "Logging out..." : "Logout"}
          </button>

          <div className="mt-4">
            <button
              onClick={toggleDarkMode}
              className="px-3 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
            >
              {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
