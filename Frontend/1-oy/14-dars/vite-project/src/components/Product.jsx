import React from "react";
import { useParams } from "react-router-dom";

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


export default function ProductDetails() {
    const { id } = useParams();
    const product = products.find((p) => p.id === Number(id));

    if (!product) {
        return (
            <div className="text-center py-16">
                <h1 className="text-3xl font-semibold text-gray-800">
                    Product not found!
                </h1>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-lg text-gray-600">{product.description}</p>
        </div>
    );
}
