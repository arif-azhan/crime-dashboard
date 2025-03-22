import React from "react";

function Legend() {
    const colorScale = [
        { label: "500K+ crimes", color: "#800026" },
        { label: "250K - 500K", color: "#BD0026" },
        { label: "100K - 250K", color: "#E31A1C" },
        { label: "50K - 100K", color: "#FC4E2A" },
        { label: "10K - 50K", color: "#FD8D3C" },
        { label: "<10K crimes", color: "#FFEDA0" }
    ];

    return (
        <div className="absolute bottom-8 right-8 bg-white p-4 rounded-lg shadow-lg z-10">
            <h3 className="font-bold text-sm mb-2">Crime Density</h3>
            {colorScale.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 mb-1">
                    <div 
                        className="w-5 h-5 rounded border border-gray-400"
                        style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs">{item.label}</span>
                </div>
            ))}
        </div>
    );
}

export default Legend;
