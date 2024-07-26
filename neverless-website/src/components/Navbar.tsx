import Link from 'next/link';
import Image from 'next/image';

const Navbar = ({ onModalOpen }) => {
    return (
        <div className="z-10 flex justify-between sm:space-x-10 lg:space-x-20">
            <ul className="z-10 flex items-center sm:space-y-4 lg:space-y-0 lg:space-x-20 nav-links1 sm:flex-col lg:flex-row"> 
                <NavLink href="/" label="Home"/>
                <NavLink href="/Music" label="Music"/>
                <NavLink href="/#datesA" label="Dates"/>
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

const NavLink = ({ href, label }) => {
    return (
        <li className="nav-item relative">
            <Link href={href} className="no-underline text-xl" style={{fontSize: '30px', color: '#ffa645'}}>
                {label}
            </Link>
        </li>
    );
};

export default Navbar;
