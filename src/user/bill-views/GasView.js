import React from 'react';
import TopBarNavBar from "../TopBarNavBar";
import BillsList from "../BillsList";


const GasView = () => {
    return (
        <div className="container">
            <TopBarNavBar/>
                <BillsList billType={'Gas'}/>
        </div>
    );
}

export default GasView;

