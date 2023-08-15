import { useLocation } from "react-router-dom";
import NavbarItem from "./NavbarItem";
import { Menu } from "./NavbarItem/model";
import NavbarSection from "./NavbarSection";
import React from "react";


const DrawerNavigation = () => {

    const location = useLocation();
    const [active, setActive] = React.useState('/');

    React.useEffect(() => {
        setActive(location.pathname);
    }, [])

    React.useEffect(() => {
        console.log('Loc changed');
        setActive(location.pathname);
        document.getElementsByClassName('escape selected')[0]?.classList.remove('selected');
    }, [location]);


    const menu = [
        { name: "Dashboard", link: "/dashboard", icon: "ti-layout-dashboard" } as Menu,
        { name: "Business", link: "/business", icon: "ti-building-bank" } as Menu,
        { name: "All Compliances", link: "/compliance", icon: "ti-notebook" } as Menu,
        { name: "My Compliances", link: "/my-compliance", icon: "ti-book" } as Menu,
        { name: "Compliance Calander", link: "/calendar-compliance", icon: "ti-forms" } as Menu,
    ]

    return (
        <aside className="left-sidebar" >
            {/* <!-- Sidebar scroll--> */}
            <div>
                <div className="brand-logo d-flex align-items-center justify-content-center">
                    <a href="./index.html" className="text-nowrap logo-img">
                        {/*<img src="../assets/images/logos/new_logo.jpg" width="180" alt="" />*/}
                        <img src="../assets/images/logos/new_logo.jpg" width="50" alt="" />
                    </a>
                    <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
                        <i className="ti ti-x fs-8"></i>
                    </div>
                </div>
                {/* <!-- Sidebar navigation--> */}
                <nav className="sidebar-nav scroll-sidebar" data-simplebar="" style={{backgroundColor:""}}>

                    <ul id="sidebarnav" style={{paddingLeft:"0px"}}>

                        <NavbarSection name="" active={active} menus={menu} />

                    </ul>

                </nav>
                {/* <!-- End Sidebar navigation --> */}
            </div >
            {/* <!-- End Sidebar scroll--> */}
        </aside >
    )
}

export default DrawerNavigation;