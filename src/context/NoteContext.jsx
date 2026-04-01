import { createContext, useEffect, useState } from "react";
import BACKEND_URL from "../api/url";

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Get all notes
  const getNotes = async () => {
    setLoading(true);
    try {
      const response = await BACKEND_URL.get("/get-notes");
      setNotes(response.data || []);
    } catch (error) {
      console.log("GET ERROR:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Create note (FIXED ✅)
  const createNote = async (note) => {
    try {
      const res = await BACKEND_URL.post("/create-note", note);

      console.log("CREATED:", res.data);

      // 🔥 backend returns direct object
      setNotes((prev) => [res.data, ...prev]);

      return true;
    } catch (error) {
      console.log("CREATE ERROR:", error.response?.data || error.message);
      return false;
    }
  };

  // 🔹 Update note (FIXED ✅)
  const updateNote = async (id, updatedData) => {
    try {
      const res = await BACKEND_URL.put(`/update-note/${id}`, updatedData);

      console.log("UPDATED:", res.data);

      setNotes((prev) =>
        prev.map((note) =>
          note._id === id ? res.data : note
        )
      );

      return true;
    } catch (error) {
      console.log("UPDATE ERROR:", error.response?.data || error.message);
      return false;
    }
  };

  // 🔹 Delete note (FIXED ✅)

const deleteNote = async (id) => {
  try {
    await BACKEND_URL.delete(`/delete-note/${id}`);

    // 🔥 update UI immediately
    setNotes((prev) => prev.filter((note) => note?._id !== id));

    console.log("Deleted:", id);
  } catch (error) {
    console.log("DELETE ERROR:", error.response?.data || error.message);
  }
};
  // 🔹 Auto load notes
  useEffect(() => {
    getNotes();
  }, []);

  return (
    <NoteContext.Provider
      value={{
        notes,
        loading,
        getNotes,
        createNote,
        updateNote,
        deleteNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};