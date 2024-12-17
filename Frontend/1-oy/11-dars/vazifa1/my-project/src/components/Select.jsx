import { Label, Select } from "flowbite-react";

export function Selection() {
    return (
        <div className="max-w-md ">
            <div className="mb-2 block">
                <Label htmlFor="countries" />
            </div>
            <Select id="countries" required>
                <option>O'zbek</option>
                <option>Русский</option>
                <option>English</option>
            </Select>
        </div>
    );
}
