import React from 'react';
import TopBarNavBar from "../TopBarNavBar";
import ExpensesOverview from "./ExpensesOverview";


const ExpensesView = () => {
    return (
        <div className="container">
            <TopBarNavBar/>
            <ExpensesOverview historical={true}/>
        </div>
    );
}

export default ExpensesView;

