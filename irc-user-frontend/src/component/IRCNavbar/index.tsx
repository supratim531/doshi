import React from "react";
import LogoutComponent from '../../page/auth/LogoutComponent';
import { Link } from "react-router-dom";

const IRCNavbar = () => {
    const [logout, setLogout] = React.useState(false);

    const onLogoutCancel = () => {
        setLogout(false);
    }

    return (
        <header className="app-header">
            <nav className="navbar navbar-expand-lg navbar-light">
                <ul className="navbar-nav">
                    <li className="nav-item d-block d-xl-none">
                        <a className="nav-link sidebartoggler nav-icon-hover" id="headerCollapse" href="#">
                            <i className="ti ti-menu-2"></i>
                        </a>
                    </li>

                </ul>
                <div className="navbar-collapse justify-content-end px-0" id="navbarNav">
                    <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
                        <li className="nav-item">
                            <a className="nav-link nav-icon-hover" onClick={() => alert("Under Developement!")}>
                                <i className="ti ti-bell-ringing" ></i>
                                <div className="notification bg-primary rounded-circle"></div>
                            </a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link nav-icon-hover" href="#" id="drop2" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <img src="../assets/images/profile/user-1.jpg" alt="" width="35" height="35" className="rounded-circle" />
                            </a>
                            <div className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop2">
                                <div className="message-body d-flex flex-column">
                                    <button className="dropdown-item" style={{ display: "flex", alignItems: "center" }}>
                                        <i className="ti ti-user fs-5" style={{ color: "slategray" }}></i>
                                        <Link to="/my-profile" className="mb-2" style={{ textDecoration: "none", fontSize: "14px", marginTop: "6px", paddingLeft: "10px" }}>My Profile</Link>
                                    </button>
                                    <button onClick={() => setLogout(true)} className="btn btn-outline-primary mx-3 mt-2 d-block" style={{ flex: '1', }}>Logout</button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>

            {logout === true ? (<LogoutComponent onCancel={onLogoutCancel} />) : null}

        </header>
    );
}

export default IRCNavbar;
