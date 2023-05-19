import React from 'react';
import TopBarNavBar from "../TopBarNavBar";
import BillsList from "../BillsList";


const SanitationView = () => {
    return (
        <div className="container">
            <TopBarNavBar/>
                <BillsList billType={'Sanitation'}/>
        </div>
    );
}

export default SanitationView;

