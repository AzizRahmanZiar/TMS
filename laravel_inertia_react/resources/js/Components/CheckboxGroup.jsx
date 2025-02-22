/* eslint-disable react/prop-types */
const CheckboxGroup = ({ options, formData, onChange }) => (
    <div className="flex flex-wrap">
        {options.map(({ name, label }) => (
            <div key={name} className="flex items-center mb-2 mr-4">
                <input
                    type="checkbox"
                    id={name}
                    name={name}
                    checked={formData[name]}
                    onChange={onChange}
                    className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                    className="ml-2 text-sm font-medium text-gray-700"
                    htmlFor={name}
                >
                    {label}
                </label>
            </div>
        ))}
    </div>
);

export default CheckboxGroup;
