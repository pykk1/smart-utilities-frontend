import React from 'react';
import TopBarNavBar from "../TopBarNavBar";
import BillsList from "../BillsList";


const OtherView = () => {
    return (
        <div className="container">
            <TopBarNavBar/>
                <BillsList billType={'Other'}/>
        </div>
    );
}

export default OtherView;

