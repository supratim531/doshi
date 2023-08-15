import React from "react";
import DrawerNavigation from "../../component/DrawerNavigation";
import IRCNavbar from "../../component/IRCNavbar";
import { Outlet } from "react-router-dom";


const AppFrame = () => {
    return(
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
            data-sidebar-position="fixed" data-header-position="fixed">

            <DrawerNavigation />

            <div className="body-wrapper">
                
                <IRCNavbar />
                
                <div className="container-fluid">
                    
                    <Outlet />

                </div>
            </div>
        </div>
    )
}

export default AppFrame;