import React from "react";
import { useNavigate } from "react-router-dom";
import useGetInputValues from "./UseGetInputValues";

const CreateContact = () => {
    const navigate = useNavigate();
    const [newContact, setNewContact] = useGetInputValues({
        name: "",
        phone: "",
    });

    const handleSave = () => {
        const savedContacts =
            JSON.parse(localStorage.getItem("contacts")) || [];
        const updatedContacts = [
            ...savedContacts,
            { ...newContact, id: Date.now() },
        ];
        localStorage.setItem("contacts", JSON.stringify(updatedContacts));
        console.log("Contact saved:", newContact);
        navigate("/");
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    Create Contact
                </h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newContact.name}
                    onChange={setNewContact}
                    className="w-full mb-3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={newContact.phone}
                    onChange={setNewContact}
                    className="w-full mb-3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSave}
                    className="w-full bg-green-500 text-white py-2 rounded-lg shadow hover:bg-green-600 focus:outline-none"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default CreateContact;
