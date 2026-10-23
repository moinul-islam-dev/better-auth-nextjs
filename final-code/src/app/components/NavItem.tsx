'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'


export interface NavItemProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}


const NavItem = ({ href, children, className = "" }: NavItemProps) => {
    
    

    const pathname = usePathname();
    const isActive = 
        pathname === href ||
        ( href !== "/" && pathname.startsWith(`${href}/`) )

        console.log(pathname);


    return (
        <Link
            href={href}
            className={
                `${className} px-4 py-2 rounded-lg text-sm font-medium hover:text-white  hover:bg-indigo-500 transition-colors

                ${isActive ? "bg-indigo-600 text-white" : 
                            "text-gray-600 hover:text-gray-900"}`
            }
        >
            {children}
        </Link>
    )
}

export default NavItem;