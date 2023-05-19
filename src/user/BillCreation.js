import '../shared-components/style/Bill.css';
import React from 'react';
import BillForm from "./BillForm";
import TopBarNavBar from "./TopBarNavBar";


const BillCreation = () => {
    return (
        <div className="container">
            <TopBarNavBar/>
            <BillForm/>
        </div>
    );
}

export default BillCreation;