import { useState } from "react";

export default function Admin() {
  const role = sessionStorage.getItem("role"); 

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Academic");
  const [priority, setPriority] = useState("Normal");

  const [targetAudience, setTargetAudience] = useState(
    role === "faculty" ? "students" : "both"
  );

  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const announcementData = {
      title,
      category,
      priority,
      description,
      targetAudience,
    };

    try {
      const res = await fetch("http://localhost:3000/announcements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify(announcementData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to post announcement");
        return;
      }

      setMessage("Announcement posted successfully!");

      setTitle("");
      setCategory("Academic");
      setPriority("Normal");
      setDescription("");
      setTargetAudience(role === "faculty" ? "students" : "both");

      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 border rounded">
      <h1 className="text-2xl font-medium mb-2 text-center">
        {role === "admin" ? "Admin Dashboard" : "Faculty Dashboard"}
      </h1>

      <p className="text-sm text-slate-500 text-center mb-6">
        Post a new campus announcement
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
       
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Academic">Academic</option>
            <option value="Exam">Exam</option>
            <option value="Event">Event</option>
            <option value="Placement">Placement</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Priority</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Normal">Normal</option>
            <option value="Important">Important</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Target Audience
          </label>

          <select
            className="w-full border rounded px-3 py-2 bg-white"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            disabled={role === "faculty"}
          >
            <option value="students">Students</option>

            {role === "admin" && (
              <>
                <option value="faculty">Faculty</option>
                <option value="both">Students & Faculty</option>
              </>
            )}
          </select>

          {role === "faculty" && (
            <p className="text-xs text-slate-500 mt-1">
              Faculty announcements are visible to students only
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            rows="4"
            className="w-full border rounded px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full border border-slate-400 py-2 rounded hover:bg-slate-100 transition"
        >
          Post Announcement
        </button>
      </form>

      {message && (
        <p className="mt-4 text-green-600 text-center text-sm">
          {message}
        </p>
      )}
    </div>
  );
}
