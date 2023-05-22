import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from "./auth/Login";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Dashboard from "./user/Dashboard";
import Customers from "./admin/Customers";
import Register from "./auth/Register";
import AdminDashboard from "./admin/AdminDashboard";
import AdminBillsCreation from "./admin/AdminBillCreation";
import BillCreation from "./user/BillCreation";
import WaterView from "./user/bill-views/WaterView";
import ElectricityView from "./user/bill-views/ElectricityView";
import GasView from "./user/bill-views/GasView";
import PrivateRoute from "./auth/PrivateRoute";
import Logout from "./auth/Logout";
import SanitationView from "./user/bill-views/SanitationView";
import InternetView from "./user/bill-views/InternetView";
import RentView from "./user/bill-views/RentView";
import PhoneView from "./user/bill-views/PhoneView";
import OtherView from "./user/bill-views/OtherView";
import ExpenseCreation from "./user/expenses/ExpenseCreation";
import ExpensesView from "./user/expenses/ExpensesView";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>

                <Route path="/logout" element={<PrivateRoute isAdminRoute={false}><Logout /></PrivateRoute>} />

                <Route path="/admin" element={<PrivateRoute isAdminRoute={true}><AdminDashboard/></PrivateRoute>}/>
                <Route path="/admin/customer" element={<PrivateRoute isAdminRoute={true}><Customers/></PrivateRoute>}/>
                <Route path="/admin/bill"
                       element={<PrivateRoute isAdminRoute={true}><AdminBillsCreation/></PrivateRoute>}/>


                <Route path="/" element={<PrivateRoute isAdminRoute={false}><Dashboard/></PrivateRoute>}/>
                <Route path="/bill" element={<PrivateRoute isAdminRoute={false}><BillCreation/></PrivateRoute>}/>
                <Route path="/water" element={<PrivateRoute isAdminRoute={false}><WaterView/></PrivateRoute>}/>
                <Route path="/electricity"
                       element={<PrivateRoute isAdminRoute={false}><ElectricityView/></PrivateRoute>}/>
                <Route path="/gas" element={<PrivateRoute isAdminRoute={false}><GasView/></PrivateRoute>}/>
                <Route path="/sanitation" element={<PrivateRoute isAdminRoute={false}><SanitationView/></PrivateRoute>}/>
                <Route path="/rent" element={<PrivateRoute isAdminRoute={false}><RentView/></PrivateRoute>}/>
                <Route path="/internet" element={<PrivateRoute isAdminRoute={false}><InternetView/></PrivateRoute>}/>
                <Route path="/phone" element={<PrivateRoute isAdminRoute={false}><PhoneView/></PrivateRoute>}/>
                <Route path="/other" element={<PrivateRoute isAdminRoute={false}><OtherView/></PrivateRoute>}/>


                <Route path="/expense" element={<PrivateRoute isAdminRoute={false}><ExpenseCreation/></PrivateRoute>}/>
                <Route path="/expenses" element={<PrivateRoute isAdminRoute={false}><ExpensesView/></PrivateRoute>}/>
            </Routes>
        </Router>
    </React.StrictMode>,
);

reportWebVitals();
