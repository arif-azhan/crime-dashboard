import React, { useEffect, useState } from "react";
import { fetchCrimeTrends } from "../api";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function Trends() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchCrimeTrends().then(setData);
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold">Crime Trends Over Time</h2>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="crimes" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Trends;
