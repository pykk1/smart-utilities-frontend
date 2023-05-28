import React from 'react';
import TopBarNavBar from "../TopBarNavBar";
import BillsList from "../BillsList";


const RentView = () => {
    return (
        <div className="container">
            <TopBarNavBar/>
            <BillsList billType={'Rent'}/>
        </div>
    );
}

export default RentView;

