import React, { useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { fetchCrimeHeatmap } from "../api";
import Legend from "./Legend";

function getCrimeColor(crimeCount) {
    return crimeCount > 500 ? "#800026" :
           crimeCount > 250 ? "#BD0026" :
           crimeCount > 100 ? "#E31A1C" :
           crimeCount > 50 ? "#FC4E2A" :
           crimeCount > 10 ? "#FD8D3C" :
                            "#FFEDA0";
}

function Heatmap() {
    const [geoData, setGeoData] = useState(null);
    const [year, setYear] = useState(""); 
    const [crimeType, setCrimeType] = useState(""); 
    const [geoKey, setGeoKey] = useState(0);

    const handleFetchData = async () => {
        let queryParams = new URLSearchParams();
        if (year) queryParams.append("year", year);
        if (crimeType) queryParams.append("type", crimeType);
    
        console.log("Fetching data with query:", queryParams.toString()); // DEBUG LOG
    
        const newData = await fetchCrimeHeatmap(queryParams.toString());
        console.log("Received data:", newData); // DEBUG LOG
        if (newData) {
            setGeoData(newData);
            setGeoKey((prevKey) => prevKey + 1); // Change key to force re-render
        }
    };

    return (
        <div className="relative">
            <h2 className="text-xl font-bold mb-4">Crime Heatmap of Malaysia</h2>

            {/* Filter Controls */}
            <div className="flex space-x-4 mb-4">
                {/* Year Dropdown */}
                <select 
                    className="p-2 border rounded-md"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                >
                    <option value="2016">2016</option>
                    <option value="2017">2017</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                </select>

                {/* Crime Type Dropdown */}
                <select 
                    className="p-2 border rounded-md"
                    value={crimeType}
                    onChange={(e) => setCrimeType(e.target.value)}
                >
                    <option value="All">All Types</option>
                    <option value="Causing Injury">Causing Injury</option>
                    <option value="Murder">Murder</option>
                    <option value="Rape">Rape</option>
                    <option value="Robbery Gang Armed">Robbery Gang Armed</option>
                    <option value="Robbery Gang Unarmed">Robbery Gang Unarmed</option>
                    <option value="Robbery Solo Armed">Robbery Solo Armed</option>
                    <option value="Robbery Solo Unarmed">Robbery Solo Unarmed</option>
                    <option value="Break In">Break In</option>
                    <option value="Theft Other">Theft Other</option>
                    <option value="Theft Vehicle Lorry">Theft Vehicle Lorry</option>
                    <option value="Theft Vehicle Motorcar">Theft Vehicle Motorcar</option>
                    <option value="Theft Vehicle Motorcycle">Theft Vehicle Motorcycle</option>
                </select>

                {/* Apply Button */}
                <button 
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                    onClick={handleFetchData}
                >
                    Apply
                </button>
            </div>

            {geoData ? (
                <div className="relative">
                    <MapContainer center={[4.2105, 106.9758]} zoom={6} style={{ height: "500px", width: "100%" }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <GeoJSON
                            key={geoKey}
                            data={geoData}
                            style={(feature) => ({
                                fillColor: getCrimeColor(feature.properties.crimes),
                                weight: 2,
                                opacity: 1,
                                color: "white",
                                fillOpacity: 0.7
                            })}
                            onEachFeature={(feature, layer) => {
                                const crimes = (feature.properties.crimes);
                                layer.bindPopup(
                                    `<b>${feature.properties.name}</b><br>Crimes: ${crimes}`
                                );
                            }}
                        />
                    </MapContainer>
                    <Legend />
                </div>
            ) : (
                <p>Select your preferences</p>
            )}
        </div>
    );
}

export default Heatmap;
