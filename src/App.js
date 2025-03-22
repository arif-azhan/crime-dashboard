import './App.css';
import React, { useState } from "react";
import Heatmap from "./components/Heatmap";
import Trends from "./components/Trends";
import MostAffected from "./components/MostAffected";
import Breakdown from "./components/Breakdown";
import CrimeRateChange from "./components/CrimeRateChange";

function App() {
  const [selectedView, setSelectedView] = useState("Heatmap");

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <nav className="flex space-x-4 bg-blue-600 text-white p-3 rounded-lg">
        {["Heatmap", "Trends", "Most Affected", "Breakdown", "Crime Rate Change"].map(view => (
          <button key={view} className="px-4 py-2" onClick={() => setSelectedView(view)}>
            {view}
          </button>
        ))}
      </nav>

      <div className="mt-6 p-4 bg-white rounded-lg shadow">
        {selectedView === "Heatmap" && <Heatmap />}
        {selectedView === "Trends" && <Trends />}
        {selectedView === "Most Affected" && <MostAffected />}
        {selectedView === "Breakdown" && <Breakdown />}
        {selectedView === "Crime Rate Change" && <CrimeRateChange />}
      </div>
    </div>
  );
}

export default App;
