import React, {useEffect} from "react";

const Logout = () => {
    useEffect(() => {
        sessionStorage.removeItem("token");
        window.location.href = "/login";
    }, []);
};

export default Logout;
