import '../../shared-components/style/Bill.css';
import React from 'react';
import TopBarNavBar from "../TopBarNavBar";
import ExpenseForm from "./ExpenseForm";


const ExpenseCreation = () => {
    return (
        <div className="container">
            <TopBarNavBar/>
            <ExpenseForm/>
        </div>
    );
}

export default ExpenseCreation;