import React from 'react';
import TopBarNavBar from "../TopBarNavBar";
import BillsList from "../BillsList";


const PhoneView = () => {
    return (
        <div className="container">
            <TopBarNavBar/>
            <BillsList billType={'Phone'}/>
        </div>
    );
}

export default PhoneView;

