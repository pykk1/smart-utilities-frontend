import React from 'react';
import TopBarNavBar from "../TopBarNavBar";
import BillsList from "../BillsList";


const InternetView = () => {
    return (
        <div className="container">
            <TopBarNavBar/>
            <BillsList billType={'Internet'}/>
        </div>
    );
}

export default InternetView;

