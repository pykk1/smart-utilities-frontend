import AdminTopBarNavBar from "./AdminTopBarNavBar";
import CustomersList from "./CustomersList";
import React from "react";

const Customers = () => {
    return (
        <div className="container">
            <AdminTopBarNavBar/>
                <CustomersList/>
        </div>
    );
};


export default Customers;