import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { fetchCrimeHeatmap } from "../api";
import Legend from "./Legend";

function getCrimeColor(crimeCount) {
    const crimesInThousands = crimeCount / 1000; // Convert to thousands
    return crimesInThousands > 500 ? "#800026" :
           crimesInThousands > 250 ? "#BD0026" :
           crimesInThousands > 100 ? "#E31A1C" :
           crimesInThousands > 50 ? "#FC4E2A" :
           crimesInThousands > 10 ? "#FD8D3C" :
                                     "#FFEDA0";
}

function Heatmap() {
    const [geoData, setGeoData] = useState(null);

    useEffect(() => {
        fetchCrimeHeatmap().then(setGeoData);
    }, []);

    return (
        <div className="relative">
            <h2 className="text-xl font-bold mb-4">Crime Heatmap of Malaysia</h2>
            {geoData ? (
                <div className="relative">
                    <MapContainer center={[4.2105, 106.9758]} zoom={6} style={{ height: "500px", width: "100%" }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <GeoJSON
                            data={geoData}
                            style={(feature) => ({
                                fillColor: getCrimeColor(feature.properties.crimes),
                                weight: 2,
                                opacity: 1,
                                color: "white",
                                fillOpacity: 0.7
                            })}
                            onEachFeature={(feature, layer) => {
                                const crimesInThousands = (feature.properties.crimes / 1000).toFixed(1);
                                layer.bindPopup(
                                    `<b>${feature.properties.name}</b><br>Crimes (thousands): ${crimesInThousands}`
                                );
                            }}
                        />
                    </MapContainer>
                    <Legend />
                </div>
            ) : (
                <p>Loading map...</p>
            )}
        </div>
    );
}

export default Heatmap;
