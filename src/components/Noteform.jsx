import React, { useContext, useState } from "react";
import { NoteContext } from "../context/NoteContext";
import { useNavigate } from "react-router-dom";

function Noteform() {
  const { createNote } = useContext(NoteContext);
  const navigate = useNavigate();

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  // 🔹 Handle input change
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  // 🔹 Handle submit (FIXED)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!note.title || !note.content) {
      alert("Please fill all fields");
      return;
    }

    try {
      const success = await createNote(note); // 🔥 get result

      if (success) {
        navigate("/"); // ✅ only navigate if success
      } else {
        alert("Failed to save note ❌");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="w-full max-w-xl bg-gray-800 p-6 rounded-2xl shadow-lg">

      {/* Heading */}
      <h1 className="text-2xl font-bold text-white mb-4 text-center">
         Create Note
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Title */}
        <div>
          <label className="text-gray-300 text-sm">Title</label>
          <input
            type="text"
            name="title"
            value={note.title}
            onChange={handleChange}
            placeholder="Enter title..."
            className="w-full p-3 mt-1 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Content */}
        <div>
          <label className="text-gray-300 text-sm">Content</label>
          <textarea
            name="content"
            value={note.content}
            onChange={handleChange}
            placeholder="Write your note..."
            rows="5"
            className="w-full p-3 mt-1 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-y-auto"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold"
          >
            Save Note
          </button>
        </div>

      </form>
    </div>
  );
}

export default Noteform;