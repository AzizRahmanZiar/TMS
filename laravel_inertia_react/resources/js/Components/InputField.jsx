/* eslint-disable react/prop-types */
const InputField = ({ id, label, type, value, onChange, required }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor={id}>
            {label}
        </label>
        <input
            type={type}
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            required={required}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
    </div>
);

export default InputField;
