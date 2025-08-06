import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();

    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    🏠 Home
                </Link>
                <h1>📱 My Contacts</h1>
                <div className="ml-auto">
                    {/* <Link to="/submit">
                        <button className="btn btn-primary">
                            ➕ Add New Contact
                        </button>
                    </Link> */}
                </div>
            </div>
        </nav>
    );
};