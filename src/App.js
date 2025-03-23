import './App.css';
import React, { useState } from "react";
import Heatmap from "./components/Heatmap";
import Trends from "./components/Trends";
import MostAffected from "./components/MostAffected";
import CrimeRateChange from "./components/CrimeRateChange";
import CrimeDistribution from "./components/CrimeDistribution";

function App() {
  const [selectedView, setSelectedView] = useState("Heatmap");

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <nav className="flex justify-center space-x-6 bg-blue-600 text-white p-3 rounded-lg">
        {["Heatmap", "Trends", "Most Affected", "Crime Distribution", "Crime Rate Change"].map(view => (
          <button key={view} className={`px-4 py-3 text-lg font-bold ${selectedView === view ? "active" : ""}`} onClick={() => setSelectedView(view)}>
          {view}
        </button>
      ))}
      </nav>

      <div className="mt-6 p-6 bg-white rounded-lg shadow">
        {selectedView === "Heatmap" && <Heatmap />}
        {selectedView === "Trends" && <Trends />}
        {selectedView === "Most Affected" && <MostAffected />}
        {selectedView === "Crime Distribution" && <CrimeDistribution />}
        {selectedView === "Crime Rate Change" && <CrimeRateChange />}
        
      </div>
    </div>
  );
}

export default App;
