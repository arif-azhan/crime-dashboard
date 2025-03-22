import React, { useEffect, useState } from "react";
import { fetchCrimeType } from "../api";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF"];

function Breakdown() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchCrimeType().then(setData);
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold">Crime Breakdown by Type</h2>
            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie 
                        data={data} 
                        dataKey="count" 
                        nameKey="type" 
                        cx="50%" 
                        cy="50%" 
                        outerRadius={120} 
                        fill="#8884d8"
                        label
                    >
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Breakdown;
