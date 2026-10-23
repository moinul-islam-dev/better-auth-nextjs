import { auth } from '@/lib/auth';
import NavItem from './NavItem';

type Session = typeof auth.$Infer.Session;

const NavLinks = ({ session }: { session: Session | null }) => {

    return (
        <>
            <NavItem href="/">Home</NavItem>
            { session && <NavItem href="/dashboard">Dashboard</NavItem> }
            { !session && <NavItem href="/auth">Sign In</NavItem> }
        </>
    );
};

export default NavLinks;