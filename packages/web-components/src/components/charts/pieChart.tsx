import React from 'react';
import {
    PieChart as RechartsPieChart,
    Pie,
    Cell,
    PieProps,
    Tooltip,
    Legend
} from 'recharts';
import { Typography } from '@material-ui/core';
import { CountPerGroup } from '@feuertiger/schema-graphql';

import { theme } from '../../index';

export interface PieChartProps extends Partial<PieProps> {
    data: CountPerGroup[];
}

export const PieChart = (props: PieChartProps) => {
    const { data } = props;
    const sum =
        data?.reduce((acc, { value }) => acc + value, 0).toString() || '';
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    return (
        <RechartsPieChart width={730} height={250}>
            <Pie
                {...props}
                data={data}
                animationDuration={500}
                paddingAngle={5}
                startAngle={180}
                endAngle={0}
                dataKey="value"
                nameKey="name"
                stroke={null}
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={50}
                fill={theme.palette.primary.light}
            >
                {data?.map((entry, index) => (
                    <Cell fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend
                align="center"
                verticalAlign="middle"
                content={<Typography variant="h3">{sum}</Typography>}
            />
        </RechartsPieChart>
    );
};
