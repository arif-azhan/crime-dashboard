import React, { useEffect, useState } from "react";
import { fetchCrimeRateChange } from "../api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function CrimeRateChange() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchCrimeRateChange().then(setData);
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold">Crime Rate % Change (YoY)</h2>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="percent_change" fill={data.some(d => d.percent_change < 0) ? "#FF6347" : "#0088FE"} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default CrimeRateChange;
