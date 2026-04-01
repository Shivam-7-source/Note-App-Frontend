import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import CreateNote from "./pages/CreateNote";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateNote />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;