import AdminTopBarNavBar from "./AdminTopBarNavBar";
import AdminExpensesList from "./AdminExpensesList";
import React from "react";

const AdminExpenses = () => {
    return (
        <div className="container">
            <AdminTopBarNavBar/>
            <AdminExpensesList/>
        </div>
    );
}
export default AdminExpenses;