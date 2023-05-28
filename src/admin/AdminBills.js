import AdminTopBarNavBar from "./AdminTopBarNavBar";
import AdminBillsList from "./AdminBillsList";
import React from "react";

const AdminBills = () => {
    return (
        <div className="container">
            <AdminTopBarNavBar/>
            <AdminBillsList/>
        </div>
    );
}
export default AdminBills;