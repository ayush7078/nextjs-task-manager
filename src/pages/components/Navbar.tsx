// components/Navbar.tsx
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { FaUserCircle } from 'react-icons/fa';
import { useRouter } from 'next/router';

const Navbar = ({ onLogout }: { onLogout: () => void }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter();
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const handleToggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        onLogout();
        router.push('/'); // Redirect to the home page after logout
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <nav className="flex justify-between items-center p-4 bg-blue-600 text-white shadow-lg">
            <div className="flex space-x-4">
                <Link href="/" className="hover:text-blue-200">
                    Home
                </Link>
            </div>

            <div className="relative" ref={dropdownRef}>
                <button onClick={handleToggleDropdown} className="focus:outline-none">
                    <FaUserCircle className="text-2xl" />
                </button>

                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg z-10 transition-opacity duration-300 ease-in-out">
                        <div className="py-2">
                            <Link href="/profile" className="block px-4 py-2 hover:bg-blue-100">
                                Edit Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 hover:bg-blue-100"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
