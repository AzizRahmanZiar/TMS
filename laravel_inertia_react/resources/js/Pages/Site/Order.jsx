import React, { useState } from "react";
import SiteLayout from "../../Layouts/SiteLayout";
import {
    FaRuler,
    FaShoppingBag,
    FaTshirt,
    FaClipboardCheck,
} from "react-icons/fa";

const Order = () => {
    // State for form
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        clothingType: "",
        fabric: "",
        color: "",
        size: "",
        height: "",
        chest: "",
        waist: "",
        hips: "",
        shoulders: "",
        sleeves: "",
        inseam: "",
        deliveryDate: "",
        specialInstructions: "",
        tailor: "",
        shop: "",
    });

    // Sample data for tailors and shops
    const tailors = [
        { id: 1, name: "احمد رحیمي" },
        { id: 2, name: "محمد کریمي" },
        { id: 3, name: "فاطمه احمدي" },
        { id: 4, name: "یوسف حکیمي" },
        { id: 5, name: "زینب نوري" },
    ];

    const shops = [
        { id: 1, name: "د احمد خیاطي" },
        { id: 2, name: "د کریمي خیاطي" },
        { id: 3, name: "د واده جامو مرکز" },
        { id: 4, name: "عصري فیشن" },
        { id: 5, name: "د ماشومانو جامې" },
    ];

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the data to your backend
        console.log("Form submitted:", formData);
        alert("ستاسو فرمایش په بریالیتوب سره ثبت شو!");
        // Reset form or redirect
    };

    return (
        <SiteLayout title="فرمایش - خیاط ماسټر">
            {/* Hero Section */}
            <section className="bg-indigo-600 text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        فرمایش ورکړئ
                    </h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto">
                        د خپلې خوښې جامې فرمایش ورکړئ. موږ به یې ستاسو د اندازو
                        سره سم جوړې کړو.
                    </p>
                </div>
            </section>

            {/* Order Process */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center mb-12">
                        د فرمایش پروسه
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaRuler size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">
                                ۱. اندازې
                            </h3>
                            <p className="text-gray-700">
                                خپلې اندازې په دقیق ډول ولیکئ یا د اندازه کولو
                                لپاره زموږ دوکان ته راشئ.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaTshirt size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">
                                ۲. ډیزاین
                            </h3>
                            <p className="text-gray-700">
                                د خپلې خوښې ډیزاین، ټوکر او رنګ غوره کړئ.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaShoppingBag size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">
                                ۳. فرمایش
                            </h3>
                            <p className="text-gray-700">
                                خپل فرمایش ثبت کړئ او د تحویلۍ نیټه وټاکئ.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaClipboardCheck size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">
                                ۴. تحویلي
                            </h3>
                            <p className="text-gray-700">
                                خپلې جامې په ټاکل شوې نیټه ترلاسه کړئ یا د رسولو
                                خدمت غوره کړئ.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Order Form */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-6 text-center">
                            د فرمایش فورمه
                        </h2>

                        <form onSubmit={handleSubmit}>
                            {/* Personal Information */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4 pb-2 border-b">
                                    شخصي معلومات
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label
                                            className="block text-gray-700 mb-2"
                                            htmlFor="name"
                                        >
                                            بشپړ نوم *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label
                                            className="block text-gray-700 mb-2"
                                            htmlFor="phone"
                                        >
                                            د تلیفون شمیره *
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label
                                            className="block text-gray-700 mb-2"
                                            htmlFor="email"
                                        >
                                            بریښنالیک
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            className="block text-gray-700 mb-2"
                                            htmlFor="address"
                                        >
                                            آدرس *
                                        </label>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Clothing Details */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4 pb-2 border-b">
                                    د جامو جزئیات
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label
                                            className="block text-gray-700 mb-2"
                                            htmlFor="clothingType"
                                        >
                                            د جامو ډول *
                                        </label>
                                        <select
                                            id="clothingType"
                                            name="clothingType"
                                            value={formData.clothingType}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-md"
                                            required
                                        >
                                            <option value="">
                                                غوره کړئ...
                                            </option>
                                            <option value="دریشي">دریشي</option>
                                            <option value="کمیس">کمیس</option>
                                            <option value="پرتوګ">پرتوګ</option>
                                            <option value="د واده جامې">
                                                د واده جامې
                                            </option>
                                            <option value="کورتۍ">کورتۍ</option>
                                            <option value="نور">نور</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label
                                            className="block text-gray-700 mb-2"
                                            htmlFor="fabric"
                                        >
                                            ټوکر *
                                        </label>
                                        <select
                                            id="fabric"
                                            name="fabric"
                                            value={formData.fabric}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-md"
                                            required
                                        >
                                            <option value="">
                                                غوره کړئ...
                                            </option>
                                            <option value="پنبه">پنبه</option>
                                            <option value="وړۍ">وړۍ</option>
                                            <option value="ریشم">ریشم</option>
                                            <option value="لینن">لینن</option>
                                            <option value="پولیسټر">
                                                پولیسټر
                                            </option>
                                            <option value="نور">نور</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label
                                            className="block text-gray-700 mb-2"
                                            htmlFor="color"
                                        >
                                            رنګ *
                                        </label>
                                        <input
                                            type="text"
                                            id="color"
                                            name="color"
                                            value={formData.color}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label
                                            className="block text-gray-700 mb-2"
                                            htmlFor="size"
                                        >
                                            سایز
                                        </label>
                                        <select
                                            id="size"
                                            name="size"
                                            value={formData.size}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-md"
                                        >
                                            <option value="">
                                                غوره کړئ...
                                            </option>
                                            <option value="S">S (کوچنی)</option>
                                            <option value="M">M (منځنی)</option>
                                            <option value="L">L (لوی)</option>
                                            <option value="XL">
                                                XL (ډیر لوی)
                                            </option>
                                            <option value="XXL">
                                                XXL (ډیر ډیر لوی)
                                            </option>
                                            <option value="custom">
                                                ځانګړی
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Measurements */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4 pb-2 border-b">
                                    اندازې (په سانتي متر)
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label
                                            className="block text-gray-700 mb-2"
                                            htmlFor="height"
                                        >
                                            قد
                                        </label>
                                        <input
                                            type="number"
                                            id="height"
                                            name="height"
                                            value={formData.height}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            className="block text-gray-700 mb-2"
                                            htmlFor="chest"
                                        >
                                            سینه
                                        </label>
                                        <input
                                            type="number"
                                            id="chest"
                                            name="chest"
                                            value={formData.chest}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            className="block text-gray-700 mb-2"
                                            htmlFor="waist"
                                        >
                                            ملا
                                        </label>
                                        <input
                                            type="number"
                                            id="waist"
                                            name="waist"
                                            value={formData.waist}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            className="block text-gray-700 mb-2"
                                            htmlFor="hips"
                                        >
                                            ورنونه
                                        </label>
                                        <input
                                            type="number"
                                            id="hips"
                                            name="hips"
                                            value={formData.hips}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            className="block text-gray-700 mb-2"
                                            htmlFor="shoulders"
                                        >
                                            اوږې
                                        </label>
                                        <input
                                            type="number"
                                            id="shoulders"
                                            name="shoulders"
                                            value={formData.shoulders}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            className="block text-gray-700 mb-2"
                                            htmlFor="sleeves"
                                        >
                                            لستوڼي
                                        </label>
                                        <input
                                            type="number"
                                            id="sleeves"
                                            name="sleeves"
                                            value={formData.sleeves}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            className="block text-gray-700 mb-2"
                                            htmlFor="inseam"
                                        >
                                            د پرتوګ اوږدوالی
                                        </label>
                                        <input
                                            type="number"
                                            id="inseam"
                                            name="inseam"
                                            value={formData.inseam}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Delivery and Additional Information */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4 pb-2 border-b">
                                    د تحویلۍ او اضافي معلومات
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label
                                            className="block text-gray-700 mb-2"
                                            htmlFor="deliveryDate"
                                        >
                                            د تحویلۍ نیټه *
                                        </label>
                                        <input
                                            type="date"
                                            id="deliveryDate"
                                            name="deliveryDate"
                                            value={formData.deliveryDate}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label
                                            className="block text-gray-700 mb-2"
                                            htmlFor="tailor"
                                        >
                                            خیاط
                                        </label>
                                        <select
                                            id="tailor"
                                            name="tailor"
                                            value={formData.tailor}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-md"
                                        >
                                            <option value="">
                                                غوره کړئ...
                                            </option>
                                            {tailors.map((tailor) => (
                                                <option
                                                    key={tailor.id}
                                                    value={tailor.id}
                                                >
                                                    {tailor.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label
                                            className="block text-gray-700 mb-2"
                                            htmlFor="shop"
                                        >
                                            دوکان
                                        </label>
                                        <select
                                            id="shop"
                                            name="shop"
                                            value={formData.shop}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-md"
                                        >
                                            <option value="">
                                                غوره کړئ...
                                            </option>
                                            {shops.map((shop) => (
                                                <option
                                                    key={shop.id}
                                                    value={shop.id}
                                                >
                                                    {shop.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label
                                            className="block text-gray-700 mb-2"
                                            htmlFor="specialInstructions"
                                        >
                                            ځانګړې لارښوونې
                                        </label>
                                        <textarea
                                            id="specialInstructions"
                                            name="specialInstructions"
                                            value={formData.specialInstructions}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-md"
                                            rows="4"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="bg-indigo-600 text-white py-3 px-8 rounded-md font-medium hover:bg-indigo-700 transition"
                                >
                                    فرمایش ثبت کړئ
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center mb-8">
                        عمومي پوښتنې
                    </h2>
                    <div className="max-w-3xl mx-auto">
                        <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold mb-2">
                                د فرمایش ورکولو وروسته څومره وخت نیسي؟
                            </h3>
                            <p className="text-gray-700">
                                د جامو د ډول او پیچلتیا په اساس، معمولاً د ۷-۱۴
                                ورځو پورې وخت نیسي. د واده جامې ممکن تر ۳۰ ورځو
                                پورې وخت ونیسي.
                            </p>
                        </div>

                        <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold mb-2">
                                آیا زه کولی شم خپل ډیزاین وړاندې کړم؟
                            </h3>
                            <p className="text-gray-700">
                                هو، تاسو کولی شئ خپل ډیزاین وړاندې کړئ. تاسو
                                کولی شئ د ډیزاین انځور یا سکیچ راولیږئ او زموږ
                                خیاطان به یې ستاسو د غوښتنې سره سم جوړ کړي.
                            </p>
                        </div>

                        <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold mb-2">
                                آیا تاسو د رسولو خدمت لرئ؟
                            </h3>
                            <p className="text-gray-700">
                                هو، موږ د ښار په دننه کې وړیا رسول لرو. د ښار
                                څخه بهر رسول د واټن په اساس اضافي لګښت لري.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold mb-2">
                                که چیرې جامې زما په اندازه برابرې نه وي څه به
                                وشي؟
                            </h3>
                            <p className="text-gray-700">
                                موږ د کیفیت تضمین وړاندې کوو. که چیرې جامې ستاسو
                                په اندازه برابرې نه وي، موږ به یې وړیا بدل کړو.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </SiteLayout>
    );
};

export default Order;
