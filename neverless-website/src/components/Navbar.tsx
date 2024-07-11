import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                {/* Left Side Links */}
                <div className="flex items-center space-x-8">
                    <Link href="/">
                        <a className="text-white font-bold text-lg"></a>
                    </Link>
                </div>
            </div>
        </nav>
    )
};