import Link from 'next/link';
import Image from 'next/image';

interface NavbarProps{
    onModalOpen: () => void;
}

const Navbar = ({ onModalOpen }: NavbarProps) => {
    return (
        <div className="font-home z-10 flex justify-between sm:space-x-10 lg:space-x-20">
            <ul className="z-10 flex items-center sm:space-y-4 lg:space-y-0 lg:space-x-28 nav-links1 sm:flex-col lg:flex-row"> 
                <NavLink href="/" label="Home"/>
                <NavLink href="/#datesA" label="Dates"/>
                <NavLink href="/Music" label="Music"/>
            </ul>
            <div className="">
                <button onClick= {onModalOpen}>
                    <img src="logo.png" width="239.1125" height="125" color="transparent" className="hover:-translate-y-1 hover:scale-110 duration-300"></img>
                </button>
            </div>
            <ul className="z-10 flex items-center sm:space-y-4 lg:space-y-0 lg:space-x-20 nav-links1 sm:flex-col lg:flex-row"> 
                <NavLink href="/Merch" label="Merch"/>
                <NavLink href="/About" label="About"/>
                <NavLink href="/Contact" label="Contact"/>
            </ul>
        </div>
    );
};

interface NavLinkProps{
    href: string;
    label: string;
}

const NavLink = ({ href, label }: NavLinkProps) => {
    return (
        <li className="nav-item relative">
            <Link href={href} className="no-underline text-xl navLink">
                {label}
            </Link>
        </li>
    );
};

export default Navbar;
