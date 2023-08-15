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
                        <a className="nav-link sidebartoggler nav-icon-hover" id="headerCollapse">
                            <i className="ti ti-menu-2"></i>
                        </a>
                    </li>

                </ul>
                <div className="navbar-collapse justify-content-end px-0" id="navbarNav">
                    <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
                        <li className="nav-item">
                            <a className="nav-link nav-icon-hover">
                                <i className="ti ti-bell-ringing"></i>
                                <div className="notification bg-primary rounded-circle"></div>
                            </a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link nav-icon-hover" id="drop2" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <img src="../assets/images/profile/user-1.jpg" alt="" width="35" height="35" className="rounded-circle" />
                            </a>
                            <div className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop2">
                                <div className="message-body d-flex flex-column">
                                    <button className="d-flex align-items-center gap-2 dropdown-item">
                                        <i className="ti ti-user fs-6"></i>
                                        <Link style={{listStyle:"none",textDecoration:"none",color:"black"}} to="/my-profile" className="mb-0 fs-3">My Profile</Link>
                                    </button>
                                    <a className="d-flex align-items-center gap-2 dropdown-item">
                                        <i className="ti ti-mail fs-6"></i>
                                        <p className="mb-0 fs-3">My Account</p>
                                    </a>
                                    <a className="d-flex align-items-center gap-2 dropdown-item">
                                        <i className="ti ti-list-check fs-6"></i>
                                        <p className="mb-0 fs-3">My Task</p>
                                    </a>
                                    <button onClick={() => setLogout(true)} className="btn btn-outline-primary mx-3 mt-2 d-block" style={{flex: '1',}}>Logout</button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>

            {logout === true?(<LogoutComponent onCancel={onLogoutCancel} />):null}

        </header>
    )
}

export default IRCNavbar;