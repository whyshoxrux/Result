import React from "react";
import { Link } from "react-router-dom";

const products = [
    {
        id: 1,
        name: "Laptop",
        description: "High-performance laptop for professionals.",
    },
    {
        id: 2,
        name: "Smartphone",
        description: "Latest generation smartphone with a sleek design.",
    },
    {
        id: 3,
        name: "Headphones",
        description: "Wireless noise-cancelling headphones.",
    },
    {
        id: 4,
        name: "Smartwatch",
        description: "Feature-packed smartwatch for fitness tracking.",
    },
    {
        id: 5,
        name: "Gaming Console",
        description: "Next-gen gaming console for immersive gaming.",
    },
    {
        id: 6,
        name: "Tablet",
        description: "Lightweight tablet with a crystal-clear display.",
    },
    {
        id: 7,
        name: "Bluetooth Speaker",
        description: "Portable Bluetooth speaker with excellent sound quality.",
    },
    {
        id: 8,
        name: "Keyboard",
        description: "Mechanical keyboard for a superior typing experience.",
    },
    {
        id: 9,
        name: "Mouse",
        description: "Ergonomic wireless mouse with precision tracking.",
    },
    {
        id: 10,
        name: "Monitor",
        description: "4K Ultra HD monitor with vibrant colors.",
    },
    {
        id: 11,
        name: "External Hard Drive",
        description: "High-capacity external hard drive for data storage.",
    },
    {
        id: 12,
        name: "Camera",
        description: "DSLR camera for professional photography.",
    },
    {
        id: 13,
        name: "Printer",
        description: "All-in-one printer for home and office use.",
    },
    {
        id: 14,
        name: "Drone",
        description: "Compact drone with HD camera for aerial shots.",
    },
    {
        id: 15,
        name: "Fitness Tracker",
        description: "Wearable fitness tracker to monitor your health.",
    },
];


export default function Products() {
    return (
        <div className="container mx-auto py-10 bg-white shadow-md rounded-md">
            <h1 className="text-4xl font-bold mb-6 text-center">
                Our Products
            </h1>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <li
                        key={product.id}
                    >
                        <Link
                            to={`/products/${product.id}`} className="none-underline"
                        >
                            {product.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
