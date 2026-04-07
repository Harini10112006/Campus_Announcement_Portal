import { useState } from "react";

export default function RegisterUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      setMessage("User registered successfully!");
      setEmail("");
      setPassword("");
      setRole("student");

      setTimeout(() => setMessage(""), 3000);
    } catch {
      alert("Server error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 border p-6 rounded bg-white">
      <h2 className="text-xl font-medium mb-4 text-center">
        Register New User
      </h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full border px-3 py-2 mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border px-3 py-2 mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <select
        className="w-full border px-3 py-2 mb-4"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="student">Student</option>
        <option value="faculty">Faculty</option>
      </select>

      <button
        onClick={handleRegister}
        className="w-full border py-2 hover:bg-slate-100"
      >
        Register
      </button>

      {message && (
        <p className="text-green-600 text-center mt-3 text-sm">
          {message}
        </p>
      )}
    </div>
  );
}
