import React from 'react';
import TopBarNavBar from "../TopBarNavBar";
import BillsList from "../BillsList";


const WaterView = () => {
    return (
        <div className="container">
            <TopBarNavBar/>
            <BillsList billType={'Water'}/>
        </div>
    );
}

export default WaterView;

