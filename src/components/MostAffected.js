import React, { useEffect, useState } from "react";
import { fetchMostAffectedStates } from "../api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function MostAffected() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchMostAffectedStates().then(setData);
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold">Most Affected States</h2>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                    <XAxis dataKey="state" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="crimes" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default MostAffected;
