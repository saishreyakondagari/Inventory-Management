import React from "react";
import { Link, useNavigate } from "react-router-dom";
import urls from '../../constants/routes.json'; 

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate(urls.LOGIN, { replace: true });
    };

    return (
        <nav className="navbar navbar-expand-lg premium-navbar">
            <div className="container-fluid">
                <Link className="navbar-brand brand-logo" to="/">
                    Inventory<span className="highlight">Pro</span>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link nav-item-link" to="/shelters">
                                Shelters
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link nav-item-link" to="/inventory">
                                Inventory
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link nav-item-link" to="/distributions">
                                Distributions
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link nav-item-link" to="/make-distribution">
                                Make Distribution
                            </Link>
                        </li>
                    </ul>
                    <button
                        className="btn btn-logout"
                        style={{ backgroundColor: 'yellow', color: 'black' }}
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;