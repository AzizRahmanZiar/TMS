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
        qadd: "",
        shana: "",
        ghara: "",
        zegar: "",
        lstoony: "",
        partog: "",
        pai_tsa: "",
        lastoni: false,
        lastoni_goti: false,
        bin: false,
        bin_kat: false,
        makh_jib: false,
        tarikhzi: false,
        kalari: false,
        shabazi: false,
        arabi: false,
        lemen: false,
        lastoni_2: false,
        rawrul_tareekh: "",
        tasleem_tareekh: "",
        shamir: "",
        mushtari_mobile: "",
    });

    const [tableData, setTableData] = useState([
        {
            nom: "احمد",
            mobile: "۰۷۰۱۲۳۴۵۶۷",
            qadd: "۱۲",
            shana: "۵۶",
            ghara: "۱۱",
            zegar: "۸",
            lstoony: "۲۳",
            partog: "۲۰",
            pai_tsa: "۱۰",
            lastoni: false,
            lastoni_goti: false,
            bin: true,
            bin_kat: false,
            makh_jib: true,
            tarikhzi: false,
            kalari: true,
            shabazi: false,
            arabi: true,
            lemen: false,
            lastoni_2: true,
            rawrul_tareekh: "۱۴۰۴-۰۳-۲۰",
            tasleem_tareekh: "۱۴۰۶-۱۱-۲۰",
            shamir: "۹",
            mushtari_mobile: "۰۷۰۹۲۸۴۵۶۷",
        },
        {
            nom: "احسان",
            mobile: "۰۷۰۲۲۹۴۸۶۷",
            qadd: "۲۴",
            shana: "۷۸",
            ghara: "۸۷",
            zegar: "۱۱",
            lstoony: "۹۰",
            partog: "۲۲",
            pai_tsa: "۷۶",
            lastoni: true,
            lastoni_goti: true,
            bin: false,
            bin_kat: true,
            makh_jib: false,
            tarikhzi: true,
            kalari: false,
            shabazi: true,
            arabi: false,
            lemen: true,
            lastoni_2: false,
            rawrul_tareekh: "۱۴۰۲-۱۱-۱۲",
            tasleem_tareekh: "۱۴۰۳-۱۰-۰۲",
            shamir: "۲",
            mushtari_mobile: "۰۷۰۲۲۹۴۸۶۷",
        },
    ]);

    const handleAddClick = () => {
        setIsEditing(false);
        setModalOpen(true);
        resetFormData();
    };

    const resetFormData = () => {
        setFormData({
            nom: "",
            mobile: "",
            qadd: "",
            shana: "",
            ghara: "",
            zegar: "",
            lstoony: "",
            partog: "",
            pai_tsa: "",
            lastoni: false,
            lastoni_goti: false,
            bin: false,
            bin_kat: false,
            makh_jib: false,
            tarikhzi: false,
            kalari: false,
            shabazi: false,
            arabi: false,
            lemen: false,
            lastoni_2: false,
            rawrul_tareekh: "",
            tasleem_tareekh: "",
            shamir: "",
            mushtari_mobile: "",
        });
    };

    const closeModal = () => {
        setModalOpen(false);
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
        if (isEditing) {
            setTableData((prevData) =>
                prevData.map((data, index) =>
                    index === formData.index ? formData : data
                )
            );
        } else {
            setTableData((prevData) => [...prevData, formData]);
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
        <div className="overflow-x-auto">
            <h1 className="font-bold text-2xl mr-5">د جامو د مشتریانو لیست</h1>

            <div className="flex w-full gap-10 justify-end mb-4">
                <div className="flex items-end gap-10">
                    <input
                        type="text"
                        placeholder=" لټــــــــــــول ..."
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
                <img src="/imgs/cloths-3.jpg" alt="" className="h-40 w-40" />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-1 text-right text-gray-600 border-b border-gray-300">
                                نوم
                            </th>
                            <th className="py-2 px-1 text-right text-gray-600 border-b border-gray-300">
                                مبایل
                            </th>
                            <th className="py-2 px-1 text-right text-gray-600 border-b border-gray-300">
                                قد
                            </th>
                            <th className="py-2 px-1 text-right text-gray-600 border-b border-gray-300">
                                شانه
                            </th>
                            <th className="py-2 px-1 text-right text-gray-600 border-b border-gray-300">
                                غاړه
                            </th>
                            <th className="py-2 px-1 text-right text-gray-600 border-b border-gray-300">
                                ځګر
                            </th>
                            <th className="py-2 px-1 text-right text-gray-600 border-b border-gray-300">
                                اندازه لسټوڼي
                            </th>
                            <th className="py-2 px-1 text-right text-gray-600 border-b border-gray-300">
                                پرتوګ
                            </th>
                            <th className="py-2 px-1 text-right text-gray-600 border-b border-gray-300">
                                پایڅه
                            </th>
                            <th className="py-2 px-1 text-right text-gray-600 border-b border-gray-300">
                                لستوڼي غوټۍ
                            </th>
                            <th className="py-2 px-1 text-right text-gray-600 border-b border-gray-300">
                                بین
                            </th>
                            <th className="py-2 px-1 text-right text-gray-600 border-b border-gray-300">
                                بین کاټ
                            </th>
                            <th className="py-2 px-1 text-right text-gray-600 border-b border-gray-300">
                                د مخ جیب
                            </th>
                            <th className="py-2 px-1 text-right text-gray-600 border-b border-gray-300">
                                ترخزي
                            </th>
                            <th className="py-2 px-1 text-right text-gray-600 border-b border-gray-300">
                                کالري
                            </th>
                            <th className="py-2 px-1 text-right text-gray-600 border-b border-gray-300">
                                شابازي
                            </th>
                            <th className="py-2 px-1 text-right text-gray-600 border-b border-gray-300">
                                عربي
                            </th>
                            <th className="py-2 px-1 text-right text-gray-600 border-b border-gray-300">
                                لمن
                            </th>
                            <th className="py-2 px-1 text-right text-gray-600 border-b border-gray-300">
                                لستوڼي
                            </th>
                            <th className="py-2 px-1 text-right text-gray-600 border-b border-gray-300">
                                د راوړلو تاریخ
                            </th>
                            <th className="py-2 px-1 text-right text-gray-600 border-b border-gray-300">
                                د تسلیمولو تاریخ
                            </th>
                            <th className="py-2 px-1 text-right text-gray-600 border-b border-gray-300">
                                شمیر
                            </th>
                            <th className="py-2 px-1 text-right text-gray-600 border-b border-gray-300">
                                مشتري مبایل
                            </th>

                            <th className="py-2 px-1 text-right text-gray-600 border-b border-gray-300">
                                عملیې
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((row, index) => (
                            <tr
                                key={index}
                                className="border-b border-gray-300"
                            >
                                <td className="py-2 px-1 text-right">
                                    {row.nom}
                                </td>
                                <td className="py-2 px-1 text-right">
                                    {row.mobile}
                                </td>
                                <td className="py-2 px-1 text-right">
                                    {row.qadd}
                                </td>
                                <td className="py-2 px-1 text-right">
                                    {row.shana}
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
                                    {row.partog}
                                </td>
                                <td className="py-2 px-1 text-right">
                                    {row.pai_tsa}
                                </td>
                                <td className="py-2 px-1 text-right">
                                    <input
                                        type="checkbox"
                                        checked={row.lastoni_goti}
                                        onChange={() =>
                                            toggleCheckbox(
                                                index,
                                                "lastoni_goti"
                                            )
                                        }
                                    />
                                </td>
                                <td className="py-2 px-1 text-right">
                                    <input
                                        type="checkbox"
                                        checked={row.bin}
                                        onChange={() =>
                                            toggleCheckbox(index, "bin")
                                        }
                                    />
                                </td>
                                <td className="py-2 px-1 text-right">
                                    <input
                                        type="checkbox"
                                        checked={row.bin_kat}
                                        onChange={() =>
                                            toggleCheckbox(index, "bin_kat")
                                        }
                                    />
                                </td>
                                <td className="py-2 px-1 text-right">
                                    <input
                                        type="checkbox"
                                        checked={row.makh_jib}
                                        onChange={() =>
                                            toggleCheckbox(index, "makh_jib")
                                        }
                                    />
                                </td>
                                <td className="py-2 px-1 text-right">
                                    <input
                                        type="checkbox"
                                        checked={row.tarikhzi}
                                        onChange={() =>
                                            toggleCheckbox(index, "tarikhzi")
                                        }
                                    />
                                </td>
                                <td className="py-2 px-1 text-right">
                                    <input
                                        type="checkbox"
                                        checked={row.kalari}
                                        onChange={() =>
                                            toggleCheckbox(index, "kalari")
                                        }
                                    />
                                </td>
                                <td className="py-2 px-1 text-right">
                                    <input
                                        type="checkbox"
                                        checked={row.shabazi}
                                        onChange={() =>
                                            toggleCheckbox(index, "shabazi")
                                        }
                                    />
                                </td>
                                <td className="py-2 px-1 text-right">
                                    <input
                                        type="checkbox"
                                        checked={row.arabi}
                                        onChange={() =>
                                            toggleCheckbox(index, "arabi")
                                        }
                                    />
                                </td>
                                <td className="py-2 px-1 text-right">
                                    <input
                                        type="checkbox"
                                        checked={row.lemen}
                                        onChange={() =>
                                            toggleCheckbox(index, "lemen")
                                        }
                                    />
                                </td>
                                <td className="py-2 px-1 text-right">
                                    <input
                                        type="checkbox"
                                        checked={row.lastoni_2}
                                        onChange={() =>
                                            toggleCheckbox(index, "lastoni_2")
                                        }
                                    />
                                </td>
                                <td className="py-2 px-1 text-right">
                                    {row.rawrul_tareekh}
                                </td>
                                <td className="py-2 px-1 text-right">
                                    {row.tasleem_tareekh}
                                </td>
                                <td className="py-2 px-1 text-right">
                                    {row.shamir}
                                </td>
                                <td className="py-2 px-1 text-right">
                                    {row.mushtari_mobile}
                                </td>

                                <td className="py-2 flex gap-2 px-1 text-right">
                                    <button
                                        onClick={() => handleUpdate(index)}
                                        className="text-blue-500"
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
                                id: "qadd",
                                label: "قد",
                                type: "text",
                                required: true,
                            },
                            {
                                id: "shana",
                                label: "شانه",
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
                                label: "اندازه لسټوڼي",
                                type: "text",
                                required: true,
                            },
                            {
                                id: "partog",
                                label: "پرتوګ",
                                type: "text",
                                required: true,
                            },
                            {
                                id: "pai_tsa",
                                label: "پایڅه",
                                type: "text",
                                required: true,
                            },
                            {
                                id: "shamir",
                                label: "شمیر",
                                type: "text",
                                required: true,
                            },
                            {
                                id: "mushtari_mobile",
                                label: "مشتري مبایل",
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

                        {[
                            { name: "lastoni", label: "لستوڼي" },
                            { name: "lastoni_goti", label: "غوټۍ" },
                            { name: "bin", label: "بین" },
                            { name: "bin_kat", label: "بین کاټ" },
                            { name: "makh_jib", label: "د مخ جیب" },
                            { name: "tarikhzi", label: "ترخزي" },
                            { name: "kalari", label: "کالري" },
                            { name: "shabazi", label: "شابازي" },
                            { name: "arabi", label: "عربي" },
                            { name: "lemen", label: "لمن" },
                            { name: "lastoni_2", label: "لستوڼي" },
                        ].map(({ name, label }) => (
                            <div key={name} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={name}
                                    checked={formData[name]}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                <label htmlFor={name} className="text-gray-700">
                                    {label}
                                </label>
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
