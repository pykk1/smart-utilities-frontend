import React from 'react';
import TopBarNavBar from "../TopBarNavBar";
import BillsList from "../BillsList";


const ElectricityView = () => {
    return (
        <div className="container">
            <TopBarNavBar/>
            <BillsList billType={'Electricity'}/>
        </div>
    );
}

export default ElectricityView;

