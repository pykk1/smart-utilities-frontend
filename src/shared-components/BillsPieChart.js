import {Cell, Legend, Pie, PieChart, Tooltip} from 'recharts';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A6CEE3', '#FF00FF', '#FF6F00', '#00FF00', '#FF0000', '#FFFF00'];

const renderLabel = ({value}) => `${value.toFixed(2)} RON`;

const BillsPieChart = ({bills}) => {
    const dataMap = bills.reduce((map, bill) => {
        const {billType, price} = bill;
        if (map.has(billType)) {
            map.set(billType, map.get(billType) + price);
        } else {
            map.set(billType, price);
        }
        return map;
    }, new Map());

    const data = Array.from(dataMap, ([name, value]) => ({name, value}));
    const roundedPrices = data.reduce((sum, {value}) => sum + Math.round(value * 100) / 100, 0);

    return (
        <>
            <h2>Bills current costs: {roundedPrices.toFixed(2)} RON</h2>
            <div className="pie-chart-container">
            <PieChart width={500} height={350}>
                <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={data}
                    cx={200}
                    cy={200}
                    outerRadius={80}
                    fill="#8884d8"
                    label={renderLabel}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                    ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value.toFixed(2)} RON`]}/>
                <Legend/>
            </PieChart>
            </div>
        </>
    );
};

export default BillsPieChart;
