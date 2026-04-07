import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const isLoggedIn = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="w-full bg-black border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">

        <h1 className="text-lg  font-medium text-white">
          Campus Portal
        </h1>

        <div className="flex items-center gap-6 text-sm text-slate-700">

          {!isLoggedIn && (
            <Link to="/login" className="text-white">
              Login
            </Link>
          )}

          {isLoggedIn && (
            <>
              <Link to="/" className="text-white">
                Home
              </Link>

              {(role === "admin" || role === "faculty") && (
                <Link to="/admin" className="text-white">
                  Post Announcement
                </Link>
              )}

              {role === "admin" && (
                <Link to="/register" className="text-white">Register User</Link>
              )}


              <button
                onClick={handleLogout}
                className="text-white"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
