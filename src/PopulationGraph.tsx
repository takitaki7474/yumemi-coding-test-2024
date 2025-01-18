import React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

type PrefKeys = `pref${number}`;

interface GraphPoints {
  x: string;
  [key: PrefKeys]: number;
}

interface PopulationGraphProps {
    prefCodes: number[];
    label: string;
}

export const PopulationGraph: React.FC<PopulationGraphProps> = ({
    prefCodes,
    label,
  }) => {
    console.log(prefCodes);
    console.log(label);
    const testData: GraphPoints[] = [{x: 'A', pref1: 400, pref2: 100}, {x: 'B', pref1: 500, pref2: 200}, {x: 'C', pref1: 300, pref2: 400}];
    return (
        <div>
            <LineChart width={600} height={300} data={testData}>
                <Line type="monotone" dataKey="pref1" stroke="#8884d8" />
                <Line type="monotone" dataKey="pref2" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="x" />
                <YAxis />
            </LineChart>
        </div>
    );
}