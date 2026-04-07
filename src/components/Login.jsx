import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) return alert(data.error);

      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("role", data.role);

      navigate(data.role === "admin" ? "/admin" : "/");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-[70vh] flex">

      <div className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center p-10">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold text-gray-800">
            Campus Announcements Portal
          </h1>

          <p className="mt-4 text-gray-600 leading-relaxed">
            This platform is designed to keep students and faculty informed
            about academic notices, exams, events, and important campus updates.
          </p>

          <ul className="mt-6 space-y-2 text-gray-700 text-sm list-disc list-inside">
            <li>Official college announcements</li>
            <li>Exam & academic updates</li>
            <li>Placement and event notices</li>
          </ul>

          <p className="mt-6 text-xs text-gray-500">
            Access is restricted to registered campus members only.
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-sm p-8">

          <h2 className="text-2xl font-semibold text-gray-800">
            Login
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Use your college credentials
          </p>

          <input
            type="email"
            placeholder="College Email"
            className="mt-6 w-full border-b border-gray-400 focus:border-black outline-none py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="mt-6 w-full border-b border-gray-400 focus:border-black outline-none py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="mt-8 px-6 py-2 border border-black hover:bg-black hover:text-white transition"
          >
            Sign In
          </button>

        </div>
      </div>
    </div>
  );
}
