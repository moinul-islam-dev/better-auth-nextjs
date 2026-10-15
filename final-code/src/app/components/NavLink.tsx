'use client'
import { usePathname } from 'next/navigation'
import NavItem from './NavItem';

const NavLinks = () => {

    const pathname = usePathname();

    return (
        <>
            <NavItem href="/">Home</NavItem>
            <NavItem href="/dashboard">Dashboard</NavItem>
            <NavItem href="/auth">Sign In</NavItem>
        </>
    );
};

export default NavLinks;