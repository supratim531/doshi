import React from "react";
import { Menu } from "./model";
import {Link} from 'react-router-dom';

type NavbarItemProp = {
    menu: Menu;
    active: string;
}

const NavbarItem = ({ menu, active }: NavbarItemProp) => {
    return (
        <li style={{backgroundColor:""}} className="sidebar-item escape">
            <Link style={{textDecoration:"none"}} className={menu.link === active?"sidebar-link active": "sidebar-link"} to={menu.link} aria-expanded="false">
                <span>
                    <i className={menu.icon ? "ti "+ menu.icon: "ti ti-building-bank"}></i>
                </span>
                <span className="hide-menu">{menu.name}</span>
            </Link>
        </li>
    );
}

export default NavbarItem;