import { useState } from "react";

const useGetInputValues = (initialState) => {
    const [values, setValues] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    return [values, handleChange];
};

export default useGetInputValues;
