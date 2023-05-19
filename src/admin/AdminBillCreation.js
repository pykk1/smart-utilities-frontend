import '../shared-components/style/Bill.css';
import React from 'react';
import AdminBillForm from "./AdminBillForm";
import AdminTopBarNavBar from "./AdminTopBarNavBar";
import AdminBillsList from "./AdminBillsList";


const AdminBillCreation = () => {
    return (
        <div className="container">
            <AdminTopBarNavBar/>
                <AdminBillForm/>
            <AdminBillsList/>
        </div>
    );
}

export default AdminBillCreation;