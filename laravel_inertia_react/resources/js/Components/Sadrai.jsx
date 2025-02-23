import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import React, { useState } from "react";

const Table = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        nom: "",
        mobile: "",
        rawrul_tareekh: "",
        tasleem_tareekh: "",
        yachan_qak: "",
        pathlon: "",
        ghara: "",
        zagar: "",
        listoni: "",
        c_mobile: "",
        shamira: "",
    });

    const handleAddClick = () => {
        setIsEditing(false);
        setModalOpen(true);
        resetForm();
    };

    const closeModal = () => {
        setModalOpen(false);
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            nom: "",
            mobile: "",
            rawrul_tareekh: "",
            tasleem_tareekh: "",
            yachan_qak: "",
            pathlon: "",
            ghara: "",
            zagar: "",
            listoni: "",
            c_mobile: "",
            shamira: "",
        });
    };

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        closeModal();
    };

    const handleUpdate = (index) => {
        const rowData = {
            nom: "عزیزالرحمن",
            mobile: "۰۷۰۲۴۹۲۶۸۲",
            rawrul_tareekh: "۱۴۰۳/۰۲/۲۱",
            tasleem_tareekh: "۱۴۰۳/۰۲/۲۱",
            zagar: "۱۰",
            pathlon: "۱۲",
            ghara: "۲۳",

            listoni: "۳۵",
            c_mobile: "۰۷۰۲۴۹۲۶۸۲",
            shamira: "۲",
        };

        setFormData(rowData);
        setIsEditing(true);
        setModalOpen(true);
    };

    const handleDelete = (index) => {
        // Logic to delete the row
        console.log("Delete row:", index);
    };

    return (
        <div className="overflow-x-auto">
            <h1 className="font-bold text-2xl mr-5">د صدری د مشتریانو لیست</h1>

            <div className="flex w-full gap-10 justify-end mb-4">
                <div className="flex items-end gap-10">
                    <input
                        type="text"
                        placeholder="لـــــــــټون ..."
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

                <img src="/imgs/sadrai.jpg" alt="" className="h-40 w-40" />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-1 text-right text-gray-600">
                                نوم
                            </th>
                            <th className="py-2 px-1 text-right text-gray-600">
                                مبایل
                            </th>
                            <th className="py-2 px-2 text-right text-gray-600">
                                یخن قاک
                            </th>
                            <th className="py-2 px-1 text-right text-gray-600">
                                پتلون
                            </th>
                            <th className="py-2 px-2 text-right text-gray-600">
                                غاړه
                            </th>
                            <th className="py-2 px-1 text-right text-gray-600">
                                ځګر
                            </th>
                            <th className="py-2 px-2 text-right text-gray-600">
                                لسټوڼي
                            </th>
                            <th className="py-2 px-1 text-right text-gray-600">
                                د راوړلو تاریخ
                            </th>
                            <th className="py-2 px-1 text-right text-gray-600">
                                د تسلیمولو تاریخ
                            </th>
                            <th className="py-2 px-1 text-right text-gray-600">
                                مبایل
                            </th>
                            <th className="py-2 px-1 text-right text-gray-600">
                                شمیر
                            </th>
                            <th className="py-2 px-1 text-right text-gray-600">
                                عملیې
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array(3)
                            .fill()
                            .map((_, index) => (
                                <tr
                                    key={index}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="py-2 px-1">عزیزالرحمن</td>
                                    <td className="py-2 px-1">۰۷۰۲۴۹۲۶۸۲</td>
                                    <td className="py-2 px-1">۱۲</td>
                                    <td className="py-2 px-1">۲۳</td>
                                    <td className="py-2 px-1">۱۰</td>
                                    <td className="py-2 px-1">۱۲</td>
                                    <td className="py-2 px-1">۸۹</td>

                                    <td className="py-2 px-1">۱۴۰۳/۰۲/۲۱</td>
                                    <td className="py-2 px-1">۱۴۰۳/۰۲/۲۱</td>
                                    <td className="py-2 px-1">۰۷۰۲۴۹۲۸۱۷</td>
                                    <td className="py-2 px-2">۳</td>
                                    <td className="flex gap-2">
                                        <button
                                            onClick={() => handleUpdate(index)}
                                            className="text-blue-600"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(index)}
                                            className="text-red-600"
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
                            {isEditing ? "ریکارډ تازه کول" : "ریکارډ اضافه کول"}
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
                                id: "iakhan qak",
                                label: "یخن قاک",
                                type: "text",
                                required: true,
                            },
                            {
                                id: "pathlon",
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
                                id: "zigar",
                                label: "ځګر",
                                type: "text",
                                required: true,
                            },
                            {
                                id: "zagar",
                                label: "لستوڼي",
                                type: "text",
                                required: true,
                            },
                            {
                                id: "rawrul_tareekh",
                                label: "د تاریخ",
                                type: "date",
                                required: true,
                            },
                            {
                                id: "tasleem_tareekh",
                                label: "د تاریخ",
                                type: "date",
                                required: true,
                            },
                            {
                                id: "c_mobile",
                                label: "مبایل",
                                type: "text",
                                required: true,
                            },
                            {
                                id: "shamir",
                                label: "شمیر",
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
    );
};

export default Table;
