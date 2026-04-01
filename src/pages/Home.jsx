import React, { useContext, useState } from "react";
import { NoteContext } from "../context/NoteContext";
import Notecard from "../components/Notecard";
import { Link } from "react-router-dom";

function Home() {
  const { notes, loading } = useContext(NoteContext);

  const [search, setSearch] = useState("");

  // 🔹 Filter notes (title + content)
  const filteredNotes = notes.filter((note) =>
    note?.title?.toLowerCase().includes(search.toLowerCase()) ||
    note?.content?.toLowerCase().includes(search.toLowerCase())
  );

  // 🔹 Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-400 animate-pulse">
          Loading please wait...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">

      {/* 🔹 Heading */}
      <h1 className="text-2xl font-bold mb-4 text-white">
        My Notes
      </h1>

      {/* 🔹 Search Bar */}
      <input
        type="text"
        placeholder="🔍 Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 mb-6 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* 🔹 No notes at all */}
      {notes.length === 0 ? (
        <div className="flex flex-col justify-center items-center min-h-[60vh]">
          <p className="text-gray-400 text-lg mb-4">No notes found</p>

          <Link
            to="/create"
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition"
          >
            Create First Note
          </Link>
        </div>
      ) : filteredNotes.length === 0 ? (
        // 🔹 No search results
        <div className="flex justify-center items-center min-h-[60vh]">
          <p className="text-gray-400 text-lg">
            No matching notes found 🔍
          </p>
        </div>
      ) : (
        // 🔹 Show filtered notes
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredNotes.map((note) =>
            note ? <Notecard key={note._id} note={note} /> : null
          )}
        </div>
      )}
    </div>
  );
}

export default Home;