import React from 'react';
import TopBarNavBar from "./TopBarNavBar";
import BillsOverview from "./BillsOverview";
import ExpensesOverview from "./expenses/ExpensesOverview";

const Dashboard = () => {
    return (
        <div className="container">
            <TopBarNavBar/>
            <BillsOverview/>
            <ExpensesOverview historical={false}/>
        </div>
    );
};

export default Dashboard;