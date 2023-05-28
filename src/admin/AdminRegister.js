import AdminTopBarNavBar from "./AdminTopBarNavBar";
import React from "react";
import Register from "../auth/Register";

const AdminRegister = () => {
    return (
        <div className="container">
            <AdminTopBarNavBar/>
            <Register/>
        </div>
    );
}
export default AdminRegister;