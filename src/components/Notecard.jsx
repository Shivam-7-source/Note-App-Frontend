import React, { useState, useContext } from "react";
import { NoteContext } from "../context/NoteContext";

function Notecard({ note }) {
  const { deleteNote, updateNote } = useContext(NoteContext);

  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  // 🔹 Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  // 🔹 Cancel edit
  const handleCancel = () => {
    setTitle(note.title);
    setContent(note.content);
    setIsEditing(false);
  };

  // 🔹 Update
  const handleUpdate = () => {
    updateNote(note._id, { title, content });
    setIsEditing(false);
  };

  // 🔹 Delete
  const handleDelete = () => {
    deleteNote(note._id);
  };

  return (
    <div
      onClick={() => setIsExpanded(true)}
      className={`
        bg-gray-800 p-4 rounded-xl shadow-lg transition duration-300 cursor-pointer
        hover:scale-105 hover:shadow-2xl hover:bg-gray-700
        ${isExpanded ? "fixed inset-0 z-50 m-auto max-w-2xl h-fit scale-100" : ""}
      `}
    >

      {/* 🔹 CLOSE BUTTON (only when expanded) */}
      {isExpanded && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(false);
          }}
          className="absolute top-3 right-3 bg-red-500 px-2 py-1 rounded"
        >
          ✕
        </button>
      )}

      {/* 🔹 EDIT MODE */}
      {isEditing ? (
        <div className="space-y-3">
          <input
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="flex justify-end gap-2">
            <button
              onClick={handleUpdate}
              className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded"
            >
              Save
            </button>

            <button
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-600 px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* 🔹 VIEW MODE */}
          <h2 className="text-lg font-semibold text-white mb-2">
            {note.title}
          </h2>

          <p className="text-gray-400 text-sm break-all line-clamp-3">
            {note.content}
          </p>

          {/* 🕒 Timestamp */}
          <div className="mt-2 text-xs text-gray-500">
            <p>Created: {formatDate(note.createdAt)}</p>

            {note.updatedAt !== note.createdAt && (
              <p>Updated: {formatDate(note.updatedAt)}</p>
            )}
          </div>

          {/* 🔹 ACTION BUTTONS (ALWAYS VISIBLE) */}
          <div className="flex justify-between items-center mt-4">
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
              className="bg-yellow-500 hover:bg-yellow-600 hover:scale-105 px-3 py-1 rounded text-sm transition"
            >
              Edit
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className="bg-red-500 hover:bg-red-600 hover:scale-105 px-3 py-1 rounded text-sm transition"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Notecard;