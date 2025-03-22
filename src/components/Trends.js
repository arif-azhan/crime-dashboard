import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { nanoid } from "nanoid";

function Trends() {
    const [data, setData] = useState({});
    const [stateFilter, setStateFilter] = useState("");
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [states, setStates] = useState([]);
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetch("http://127.0.0.1:5050/api/filters")
            .then((res) => res.json())
            .then(({ states, types }) => {
                const cleanedStates = [...new Set(states.filter(Boolean))];
                const cleanedTypes = [...new Set(types.filter(t => t && t !== "All"))];
    
                setStates(cleanedStates); // No "All States" inserted
                setTypes(cleanedTypes);
            })
            
            .catch(err => console.error("Failed to fetch filters:", err));
    }, []);

    useEffect(() => {
        async function fetchData() {
            setLoading(true); // 👈 Start loading
            const allData = {};
    
            for (let type of selectedTypes) {
                let url = `http://127.0.0.1:5050/crime-trends?type=${encodeURIComponent(type)}`;
                if (stateFilter) url += `&state=${encodeURIComponent(stateFilter)}`;
    
                const res = await fetch(url);
                const rawData = await res.json();
    
                rawData.forEach(entry => {
                    const date = new Date(entry.date).toISOString().split("T")[0];
                    if (!allData[date]) allData[date] = { date };
                    allData[date][type] = entry.crimes;
                });
            }
    
            const merged = Object.values(allData).sort((a, b) => new Date(a.date) - new Date(b.date));
            setData(merged);
            setLoading(false); // 👈 Done loading
        }
    
        if (selectedTypes.length > 0) {
            fetchData();
        } else {
            setData([]);
            setLoading(false); // 👈 Stop loading even when no types are selected
        }
    }, [stateFilter, selectedTypes]);
    

    const handleTypeToggle = (type) => {
        setSelectedTypes(prev =>
            prev.includes(type)
                ? prev.filter(t => t !== type)
                : [...prev, type]
        );
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Crime Trends Over Time</h2>
      
          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            {/* State Dropdown */}
            <select
              className="p-2 border border-gray-300 rounded-md text-sm"
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
            >
              <option value="">All States</option>
              {states.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
      
            {/* Crime Type Checkboxes */}
            <div className="flex flex-wrap gap-3 items-center text-sm">
              <span className="font-medium mr-2">Select Crime Types:</span>
              {types.map((type) => (
                <label key={type} className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    value={type}
                    checked={selectedTypes.includes(type)}
                    onChange={() => handleTypeToggle(type)}
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>
      
          {/* Chart */}
          <div className="bg-white border rounded-xl shadow p-4">
            {loading ? (
              <div className="text-center text-gray-500 py-20">Loading chart...</div>
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(tick) => new Date(tick).getFullYear()}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  {selectedTypes.map((type) => (
                    <Line
                      key={type}
                      type="monotone"
                      dataKey={type}
                      name={type}
                      stroke={"#" + Math.floor(Math.random() * 16777215).toString(16)}
                      dot={false}
                      strokeWidth={2}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      );
      
}

export default Trends;