import React, {useEffect, useState} from 'react';
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const getMonthlyTotals = (expenses, year) => {
    let totals = Array.from({length: 12}, (_, i) => ({
        name: MONTH_NAMES[i],
        value: 0
    }));

    expenses.forEach(expense => {
        const date = new Date(expense.date);
        if (date.getFullYear() === year) {
            const month = date.getMonth();
            totals[month].value += expense.price;
        }
    });

    return totals;
};

const ExpensesBarChart = ({expenses}) => {
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const generateData = () => {
        setLoading(true);
        const monthlyTotals = getMonthlyTotals(expenses, selectedYear);
        setData(monthlyTotals);
        setLoading(false);
    };

    useEffect(() => {
        generateData();
    }, [expenses, selectedYear]);

    return (
        <>
            <h2>Expenses costs over time</h2>
            <div className="year-input">
                <label htmlFor="year">Year:</label>
                <input
                    type="number"
                    id="year"
                    value={selectedYear}
                    onChange={e => setSelectedYear(Number(e.target.value))}
                    min={2000}
                    max={currentYear + 10}
                />
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip formatter={(value) => [`${value.toFixed(2)} RON`]}/>
                        <Bar dataKey="value" fill="#8884d8"/>
                    </BarChart>
                </ResponsiveContainer>
            )}
        </>
    );
};

export default ExpensesBarChart;
