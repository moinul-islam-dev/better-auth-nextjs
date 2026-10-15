import NavItem from './NavItem';

const NavLinks = () => {

    return (
        <>
            <NavItem href="/">Home</NavItem>
            <NavItem href="/dashboard">Dashboard</NavItem>
            <NavItem href="/auth">Sign In</NavItem>
        </>
    );
};

export default NavLinks;