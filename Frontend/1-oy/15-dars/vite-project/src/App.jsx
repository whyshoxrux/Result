import React, { useState, useMemo, useCallback } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
} from "react-router-dom";
import ContactTable from "./ContactTable";
import CreateContact from "./CreateContact";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ContactTable />} />
                <Route path="/create-contact" element={<CreateContact />} />
            </Routes>
        </Router>
    );
};
export default App;
