import React from 'react';
import TopBarNavBar from "./TopBarNavBar";
import BillsDashboard from "./BillsDashboard";

const Dashboard = () => {
    return (
        <div className="container">
            <TopBarNavBar/>
            <BillsDashboard/>
        </div>
    );
};

export default Dashboard;