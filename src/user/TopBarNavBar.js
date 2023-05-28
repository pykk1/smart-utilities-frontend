import React, {useState} from 'react';
import jwt_decode from "jwt-decode";
import '../shared-components/style/Navbar.css';

const TopBarNavBar = () => {
    const token = sessionStorage.getItem('token');
    const username = jwt_decode(token).username;
    const [openMenu, setOpenMenu] = useState('');

    const handleItemClick = (path, event) => {
        event.stopPropagation();
        window.location.href = path;
    };

    const handleMenuClick = (menu, event) => {
        event.stopPropagation();
        setOpenMenu(prevMenu => {
            return prevMenu.includes(menu) ? prevMenu.filter(item => item !== menu) : [...prevMenu, menu];
        });
    };

    return (
        <>
            <div className="topbar">
                <div className="topbar-text">Logged in as: {username}</div>
            </div>
            <nav>
                <ul className="mainmenu">
                    <li onClick={(event) => handleItemClick("/", event)}><a>Dashboard</a></li>
                    <li className={openMenu.includes('bills') ? 'open' : ''} onClick={(event) => handleMenuClick('bills', event)}>
                        <a>Bills <div className={`arrow ${openMenu.includes('bills') ? 'up' : 'down'}`}/></a>
                        <ul className="submenu">
                            <li onClick={(event) => handleItemClick("/bill", event)}><a>Create New</a></li>
                            <li onClick={(event) => handleItemClick("/water", event)}><a>Water</a></li>
                            <li onClick={(event) => handleItemClick("/electricity", event)}><a>Electricity</a></li>
                            <li onClick={(event) => handleItemClick("/gas", event)}><a>Gas</a></li>
                            <li onClick={(event) => handleItemClick("/sanitation", event)}><a>Sanitation</a></li>
                            <li onClick={(event) => handleItemClick("/rent", event)}><a>Rent</a></li>
                            <li onClick={(event) => handleItemClick("/internet", event)}><a>Internet</a></li>
                            <li onClick={(event) => handleItemClick("/phone", event)}><a>Phone</a></li>
                            <li onClick={(event) => handleItemClick("/other", event)}><a>Other</a></li>
                        </ul>
                    </li>
                    <li className={openMenu.includes('expenses') ? 'open' : ''} onClick={(event) => handleMenuClick('expenses', event)}>
                        <a>Expenses <div className={`arrow ${openMenu.includes('expenses') ? 'up' : 'down'}`}/></a>
                        <ul className="submenu">
                            <li onClick={(event) => handleItemClick("/expense", event)}><a>Create New</a></li>
                            <li onClick={(event) => handleItemClick("/expenses", event)}><a>History</a></li>
                        </ul>
                    </li>
                </ul>
                <li className="logout" onClick={(event) => handleItemClick("/logout", event)}><a>Logout</a></li>
            </nav>
        </>
    );
};

export default TopBarNavBar;
