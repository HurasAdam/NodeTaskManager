import React from "react";
import {Bar, Legend,YAxis,XAxis,Tooltip,ResponsiveContainer,BarChart,CartesianGrid} from "recharts";
import { chartData } from "../assets/data";

const Chart:React.FC = () => {
  return (
    <ResponsiveContainer 
    width={"100%"}
    height={500}
    >
<BarChart
width={150}
height={40}
data={chartData}
>
<XAxis dataKey="name"/>
<YAxis dataKey="total"/>
<Tooltip/>
<Legend/>
<CartesianGrid strokeDasharray="3 3"/>
<Bar 
fill="#8884d8"
dataKey="total"/>
</BarChart>
    </ResponsiveContainer>
  )
}

export default Chart