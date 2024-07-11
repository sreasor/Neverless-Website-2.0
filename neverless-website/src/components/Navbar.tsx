import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
    return (
        <nav>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Left Side Links */}
                <div className="relative z-10 flex items-center space-x-8">
                    <Link href="/">
                        <img src="logo.png" width="239.1125" height="125" color="transparent"></img>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

const NavLink = ({ href, label }) => {
    return (
        <Link href={href}>
            <a className="text-white hover:text-gray-300">{label}</a>
        </Link>
    );
};

export default Navbar;
