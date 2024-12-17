import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-blue-600 text-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                    <NavLink to="/" className="hover:text-blue-200">
                        My Website
                    </NavLink>
                </h1>
                <ul className="flex space-x-6">
                    <li>
                        <NavLink
                            to="/"
                            className="hover:text-blue-200"
                            activeClassName="underline"
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/about"
                            className="hover:text-blue-200"
                            activeClassName="underline"
                        >
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/contact"
                            className="hover:text-blue-200"
                            activeClassName="underline"
                        >
                            Contact
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/products"
                            className="hover:text-blue-200"
                            activeClassName="underline"
                        >
                            Products
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
