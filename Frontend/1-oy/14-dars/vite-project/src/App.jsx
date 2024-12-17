import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";

const Home = lazy(() => import("./components/home"));
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const Product = lazy(() => import("./components/Product"));
const Products = lazy(() => import("./components/Products"));

export default function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <Suspense
                    fallback={
                        <div className="flex items-center justify-center min-h-screen">
                            <div className="text-lg font-medium text-gray-600">
                                Loading...
                            </div>
                        </div>
                    }
                >
                    <div className="container mx-auto px-4 py-8">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/products/:id" element={<Product />} />
                        </Routes>
                    </div>
                </Suspense>
            </div>
        </Router>
    );
}
