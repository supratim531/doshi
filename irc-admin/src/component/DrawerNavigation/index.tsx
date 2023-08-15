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
        if(location.pathname==='/user-data'){
            setActive('/data-fields')
        }
        else if(location.pathname==='/business-data'){
            setActive('/data-fields')
        }
        else{
            setActive(location.pathname);
            document.getElementsByClassName('escape selected')[0]?.classList.remove('selected');
        }
    }, [location]);

    const homeMenu = [
        { name: "Dashboard", link: "/", icon: "ti-layout-dashboard" } as Menu
    ]

    const masterMenu = [
        { name: "Regulators", link: "/regulators", icon: "ti-building-bank" } as Menu,
        { name: "Acts", link: "/acts", icon: "ti-notebook" } as Menu,
        { name: "Sections", link: "/sections", icon: "ti-book" } as Menu,
        { name: "Forms", link: "/forms", icon: "ti-forms" } as Menu,
        { name: "Frequeny", link: "/frequency", icon: "ti-hourglass-high" } as Menu,
        { name: "Financial Years", link: "/financial-years", icon: "ti-calendar-time" } as Menu,
        { name: "Tax Payers", link: "/tax-payers", icon: "ti-receipt-2" } as Menu,
        { name: "Thresholds", link: "/thresholds", icon: "ti-chart-area-line" } as Menu,
        { name: "Records", link: "/records", icon: "ti-archive" } as Menu,
        { name: "Data Fields", link: "/data-fields", icon: "ti-binary-tree" } as Menu
    ]

    const dataMenu = [
        { name: "Users", link: "/users", icon: "ti-users" } as Menu,
        { name: "Business", link: "/buisnesses", icon: "ti-building" } as Menu,
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
                <nav className="sidebar-nav scroll-sidebar" data-simplebar="">

                    <ul id="sidebarnav">

                        <NavbarSection name="Home" active={active} menus={homeMenu} />

                        <NavbarSection name="Master" active={active} menus={masterMenu} />

                        <NavbarSection name="Data" active={active} menus={dataMenu} />

                    </ul>

                </nav>
                {/* <!-- End Sidebar navigation --> */}
            </div >
            {/* <!-- End Sidebar scroll--> */}
        </aside >
    )
}

export default DrawerNavigation;