import { useEffect, useState } from "react";

export default function Home() {
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState("");

  const role = sessionStorage.getItem("role");

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch("http://localhost:3000/announcements", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch announcements");
        }

        const data = await res.json();
        setAnnouncements(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load announcements");
      }
    };

    fetchAnnouncements();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this announcement?")) {
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3000/announcements/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Delete failed");
        return;
      }

      setAnnouncements((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Campus Announcements
      </h1>

      {error && (
        <p className="text-red-500 text-center mb-4">
          {error}
        </p>
      )}

      {announcements.length === 0 && !error && (
        <p className="text-center text-gray-500">
          No announcements available.
        </p>
      )}

      <div className="space-y-4">
        {announcements.map((item) => (
          <div
            key={item._id}
            className="border p-4 rounded bg-white"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">
                {item.title}
              </h2>
              <span className="text-xs text-gray-500">
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>

            <p className="mt-2 text-gray-700">
              {item.description}
            </p>

            <div className="mt-3 flex gap-4 text-sm text-gray-500">
              <span>Category: {item.category}</span>
              <span>Priority: {item.priority}</span>
              <span>For: {item.targetAudience}</span>
            </div>

            {role === "admin" && (
              <button
                onClick={() => handleDelete(item._id)}
                className="mt-3 text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
