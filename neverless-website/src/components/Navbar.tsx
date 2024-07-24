import Link from 'next/link';
import Image from 'next/image';

const Navbar = ({ onModalOpen }) => {
    return (
        <div className="z-10 flex justify-between space-x-20 mx-20">
            <ul className="z-10 flex items-center justify-start space-x-20 nav-links1"> 
                <NavLink href="/" label="Home"/>
                <NavLink href="/Music" label="Music"/>
                <NavLink href="/#datesA" label="Dates"/>
            </ul>
            <div className="">
                <button onClick= {onModalOpen}>
                    <img src="logo.png" width="239.1125" height="125" color="transparent"></img>
                </button>
            </div>
            <ul className="z-10 flex items-center justify-start space-x-12 nav-links1"> 
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
