import React from 'react';
import NavbarItem from '../NavbarItem';
import { Menu } from '../NavbarItem/model';

const NavbarSection = ({ name, menus, active }: any) => {
    return (
        <>
            <li className="nav-small-cap">
                <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                <span className="hide-menu">{name}</span>
            </li>

            {menus.map((menu: Menu) => (
                <NavbarItem key={menu.link} menu={menu} active={active} />
            ))}
        </>
    )
}

export default NavbarSection;