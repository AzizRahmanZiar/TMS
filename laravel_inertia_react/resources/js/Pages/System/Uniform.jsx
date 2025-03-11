import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import Layout from "@/Layouts/Layout";

const Uniform = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        nom: "",
        mobile: "",
        yakhun_qak: "",
        patlun: "",
        ghara: "",
        zegar: "",
        lstoony: "",
        rawrul_tareekh: "",
        tasleem_tareekh: "",
        tidad: "",
        index: null,
    });

    const [tableData, setTableData] = useState([]);
    const [errors, setErrors] = useState({});

    const handleAddClick = () => {
        setIsEditing(false);
        setModalOpen(true);
        resetFormData();
    };

    const resetFormData = () => {
        setFormData({
            nom: "",
            mobile: "",
            yakhun_qak: "",
            patlun: "",
            ghara: "",
            zegar: "",
            lstoony: "",
            rawrul_tareekh: "",
            tasleem_tareekh: "",
            tidad: "",
            index: null,
        });
        setErrors({});
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const validateInput = (data) => {
        const errors = {};
        const englishOnlyRegex = /^[a-zA-Z]+$/; // Only English letters
        const pashtoOnlyRegex = /^[\u0600-\u06FF]+$/; // Only Pashto letters
        const numberOnlyRegex = /^[0-9]+$/; // Only English numbers

        if (
            !englishOnlyRegex.test(data.nom) &&
            !pashtoOnlyRegex.test(data.nom)
        ) {
            errors.nom = "نوم صحي کړئ.";
        }
        if (
            !(
                (
                    numberOnlyRegex.test(data.mobile) ||
                    /^[۰-۹]+$/.test(data.mobile)
                ) // Only Pashto numbers
            )
        ) {
            errors.mobile = "مبایل نمبر صحي کړئ.";
        }
        if (!numberOnlyRegex.test(data.yakhun_qak)) {
            errors.yakhun_qak = "یخن قاک صحي کړئ.";
        }
        if (!numberOnlyRegex.test(data.patlun)) {
            errors.patlun = "پتلون صحي کړئ.";
        }
        if (!numberOnlyRegex.test(data.ghara)) {
            errors.ghara = "غاړه صحي کړئ.";
        }
        if (!numberOnlyRegex.test(data.zegar)) {
            errors.zegar = "ځګر صحي کړئ.";
        }
        if (!numberOnlyRegex.test(data.lstoony)) {
            errors.lstoony = "لسټوڼي صحي کړئ.";
        }
        if (!numberOnlyRegex.test(data.tidad)) {
            errors.tidad = "تعداد صحي کړئ.";
        }

        const rawrulDate = new Date(data.rawrul_tareekh);
        const tasleemDate = new Date(data.tasleem_tareekh);
        if (tasleemDate <= rawrulDate) {
            errors.tasleem_tareekh =
                "د تسلیمولو تاریخ باید د راوړلو تاریخ څخه وروسته وي.";
        }

        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateInput(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (isEditing) {
            setTableData((prevData) =>
                prevData.map((data, index) =>
                    index === formData.index
                        ? {
                              ...formData,
                              disabled: formData.tasleem_tareekh !== "",
                          }
                        : data
                )
            );
        } else {
            setTableData((prevData) => [
                ...prevData,
                { ...formData, disabled: formData.tasleem_tareekh !== "" },
            ]);
        }
        closeModal();
    };

    const handleUpdate = (index) => {
        setIsEditing(true);
        setModalOpen(true);
        setFormData({ ...tableData[index], index });
    };

    const handleDelete = (index) => {
        setTableData((prevData) => prevData.filter((_, i) => i !== index));
    };

    const filteredData = tableData.filter((row) =>
        row.mobile.includes(searchTerm)
    );

    return (
        <AuthenticatedLayout>
            <div className="">
                <h1 className="font-bold text-2xl mr-5">
                    د درشی د مشتریانو لیست
                </h1>

                <div className="flex w-full gap-10 justify-end mb-4">
                    <div className="flex items-end gap-10">
                        <input
                            type="text"
                            placeholder="  لټـــــــــول ..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border w-[30rem] p-2 rounded"
                        />
                        <button
                            onClick={handleAddClick}
                            className="bg-blue-500 ml-10 text-white p-2 rounded"
                        >
                            ریکارډ اضافه کول
                        </button>
                    </div>
                    <img src="/imgs/uniform.jpg" alt="" className="h-40 w-40" />
                </div>

                <div className="">
                    <table className="w-full border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                {[
                                    "نوم",
                                    "مبایل",
                                    "یخن قاک",
                                    "پتلون",
                                    "غاړه",
                                    "ځګر",
                                    "لسټوڼي",
                                    "د راوړلو تاریخ",
                                    "د تسلیمولو تاریخ",
                                    "تعداد",
                                    "عملیې",
                                ].map((header) => (
                                    <th
                                        key={header}
                                        className="py-2 px-1 text-right text-gray-600 border-b border-gray-300"
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((row, index) => (
                                <tr
                                    key={index}
                                    className={`border-b border-gray-300 ${
                                        row.disabled ? "bg-gray-200" : ""
                                    }`}
                                >
                                    <td className="py-2 px-1 text-right">
                                        {row.nom}
                                    </td>
                                    <td className="py-2 px-1 text-right">
                                        {row.mobile}
                                    </td>
                                    <td className="py-2 px-1 text-right">
                                        {row.yakhun_qak}
                                    </td>
                                    <td className="py-2 px-1 text-right">
                                        {row.patlun}
                                    </td>
                                    <td className="py-2 px-1 text-right">
                                        {row.ghara}
                                    </td>
                                    <td className="py-2 px-1 text-right">
                                        {row.zegar}
                                    </td>
                                    <td className="py-2 px-1 text-right">
                                        {row.lstoony}
                                    </td>
                                    <td className="py-2 px-1 text-right">
                                        {row.rawrul_tareekh}
                                    </td>
                                    <td className="py-2 px-1 text-right">
                                        {row.tasleem_tareekh}
                                    </td>
                                    <td className="py-2 px-1 text-right">
                                        {row.tidad}
                                    </td>
                                    <td className="py-2 flex gap-2 px-1 text-right">
                                        <button
                                            onClick={() => handleUpdate(index)}
                                            className="text-blue-500"
                                            disabled={row.disabled}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(index)}
                                            className="text-red-500 ml-2"
                                        >
                                            <MdDelete />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-gray-100 rounded-lg shadow-md p-6"
                        >
                            <h2 className="col-span-1 sm:col-span-2 md:col-span-3 mb-4 text-center font-bold">
                                {isEditing
                                    ? "ریکارډ تازه کول"
                                    : "ریکارډ اضافه کول"}
                            </h2>
                            {[
                                {
                                    id: "nom",
                                    label: "نوم",
                                    type: "text",
                                    required: true,
                                },
                                {
                                    id: "mobile",
                                    label: "مبایل",
                                    type: "text",
                                    required: true,
                                },
                                {
                                    id: "yakhun_qak",
                                    label: "یخن قاک",
                                    type: "text",
                                    required: true,
                                },
                                {
                                    id: "patlun",
                                    label: "پتلون",
                                    type: "text",
                                    required: true,
                                },
                                {
                                    id: "ghara",
                                    label: "غاړه",
                                    type: "text",
                                    required: true,
                                },
                                {
                                    id: "zegar",
                                    label: "ځګر",
                                    type: "text",
                                    required: true,
                                },
                                {
                                    id: "lstoony",
                                    label: "لسټوڼي",
                                    type: "text",
                                    required: true,
                                },
                                {
                                    id: "rawrul_tareekh",
                                    label: "د راوړلو تاریخ",
                                    type: "date",
                                    required: true,
                                },
                                {
                                    id: "tasleem_tareekh",
                                    label: "د تسلیمولو تاریخ",
                                    type: "date",
                                    required: false,
                                },
                                {
                                    id: "tidad",
                                    label: "تعداد",
                                    type: "text",
                                    required: true,
                                },
                            ].map(({ id, label, type, required }) => (
                                <div key={id} className="flex flex-col">
                                    <label
                                        htmlFor={id}
                                        className="mb-1 text-gray-700"
                                    >
                                        {label}
                                    </label>
                                    <input
                                        id={id}
                                        type={type}
                                        value={formData[id]}
                                        onChange={handleChange}
                                        required={required}
                                        className="border p-2 rounded"
                                    />
                                    {errors[id] && (
                                        <span className="text-red-500">
                                            {errors[id]}
                                        </span>
                                    )}
                                </div>
                            ))}

                            <div className="flex gap-5">
                                <button
                                    type="submit"
                                    className="mt-4 py-2 px-10 bg-blue-600 text-white rounded-lg col-span-1 sm:col-span-2 md:col-span-3"
                                >
                                    ثبت
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="mt-4 py-2 px-10 bg-red-500 text-white rounded-lg col-span-1 sm:col-span-2 md:col-span-3"
                                >
                                    لغو
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default Uniform;
