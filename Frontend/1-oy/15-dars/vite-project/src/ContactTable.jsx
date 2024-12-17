import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "./UseDebounce";

const ContactTable = () => {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState(() => {
        const savedContacts = localStorage.getItem("contacts");
        return savedContacts ? JSON.parse(savedContacts) : [];
    });
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 300);
    const [editingContact, setEditingContact] = useState(null);

    useEffect(() => {
        localStorage.setItem("contacts", JSON.stringify(contacts));
    }, [contacts]);

    const filteredContacts = useMemo(() => {
        return contacts.filter((contact) =>
            contact.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
    }, [contacts, debouncedSearch]);

    const handleDelete = useCallback((id) => {
        setContacts((prev) => prev.filter((contact) => contact.id !== id));
    }, []);

    const handleEditSave = useCallback(() => {
        if (editingContact) {
            setContacts((prev) =>
                prev.map((contact) =>
                    contact.id === editingContact.id
                        ? { ...contact, ...editingContact }
                        : contact
                )
            );
            setEditingContact(null);
        }
    }, [editingContact]);

    const handleEditChange = useCallback((e) => {
        const { name, value } = e.target;
        setEditingContact((prev) => ({ ...prev, [name]: value }));
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <header className="mb-4">
                <input
                    type="text"
                    placeholder="Search Contacts"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </header>
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-blue-500 text-white">
                    <tr>
                        <th className="py-3 px-4 text-left">Name</th>
                        <th className="py-3 px-4 text-left">Phone</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredContacts.map((contact) => (
                        <tr
                            key={contact.id}
                            className="hover:bg-gray-100 border-b border-gray-200"
                        >
                            <td className="py-3 px-4">
                                {editingContact &&
                                editingContact.id === contact.id ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={editingContact.name}
                                        onChange={handleEditChange}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                ) : (
                                    contact.name
                                )}
                            </td>
                            <td className="py-3 px-4">
                                {editingContact &&
                                editingContact.id === contact.id ? (
                                    <input
                                        type="text"
                                        name="phone"
                                        value={editingContact.phone}
                                        onChange={handleEditChange}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                ) : (
                                    contact.phone
                                )}
                            </td>
                            <td className="py-3 px-4">
                                {editingContact &&
                                editingContact.id === contact.id ? (
                                    <button
                                        onClick={handleEditSave}
                                        className="bg-green-500 text-white px-3 py-1 rounded-lg shadow hover:bg-green-600 focus:outline-none"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={() =>
                                                setEditingContact(contact)
                                            }
                                            className="bg-yellow-500 text-white px-3 py-1 rounded-lg shadow hover:bg-yellow-600 focus:outline-none"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(contact.id)
                                            }
                                            className="ml-2 bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:bg-red-600 focus:outline-none"
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button
                onClick={() => navigate("/create-contact")}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 focus:outline-none"
            >
                Add Contact
            </button>
        </div>
    );
};

export default ContactTable;
