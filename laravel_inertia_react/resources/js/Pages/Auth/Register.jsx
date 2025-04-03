import React from "react";
import { useForm } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

export default function Register({ roles = {} }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "",
        profile_image: null,
        experience: "",
        career: "",
        previous_work: "",
        certifications: "",
        skills: "",
        work_availability: "",
        addShop: false,
        tailoring_name: "",
        tailoring_address: "",
        tailor_count: "",
        published_year: "",
        contact_number: "",
        shop_email: "",
        working_hours: "",
        services: "",
        payment_methods: [],
        shop_images: [],
        social_links: {
            facebook: "",
            instagram: "",
            telegram: "",
        },
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("register.store"), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                    />
                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="role" value="Role" />
                    <select
                        id="role"
                        name="role"
                        value={data.role}
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        onChange={(e) => setData("role", e.target.value)}
                    >
                        <option value="">Select a role</option>
                        {Object.entries(roles).map(([value, label]) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.role} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="profile_image" value="Profile Image" />
                    <input
                        type="file"
                        id="profile_image"
                        name="profile_image"
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData("profile_image", e.target.files[0])
                        }
                    />
                    <InputError
                        message={errors.profile_image}
                        className="mt-2"
                    />
                </div>

                {data.role === "tailor" && (
                    <>
                        <div>
                            <InputLabel
                                htmlFor="experience"
                                value="Experience"
                            />
                            <TextInput
                                id="experience"
                                type="number"
                                name="experience"
                                value={data.experience}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("experience", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.experience}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="career" value="Career" />
                            <TextInput
                                id="career"
                                name="career"
                                value={data.career}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("career", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.career}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="previous_work"
                                value="Previous Work"
                            />
                            <TextInput
                                id="previous_work"
                                name="previous_work"
                                value={data.previous_work}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("previous_work", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.previous_work}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="certifications"
                                value="Certifications"
                            />
                            <TextInput
                                id="certifications"
                                name="certifications"
                                value={data.certifications}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("certifications", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.certifications}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="skills" value="Skills" />
                            <TextInput
                                id="skills"
                                name="skills"
                                value={data.skills}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("skills", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.skills}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="work_availability"
                                value="Work Availability"
                            />
                            <select
                                id="work_availability"
                                name="work_availability"
                                value={data.work_availability}
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                onChange={(e) =>
                                    setData("work_availability", e.target.value)
                                }
                            >
                                <option value="">Select availability</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                            </select>
                            <InputError
                                message={errors.work_availability}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="addShop"
                                    checked={data.addShop}
                                    onChange={(e) =>
                                        setData("addShop", e.target.checked)
                                    }
                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-600">
                                    Add Shop Information
                                </span>
                            </label>
                        </div>

                        {data.addShop && (
                            <>
                                <div>
                                    <InputLabel
                                        htmlFor="tailoring_name"
                                        value="Tailoring Name"
                                    />
                                    <TextInput
                                        id="tailoring_name"
                                        name="tailoring_name"
                                        value={data.tailoring_name}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                "tailoring_name",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.tailoring_name}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="tailoring_address"
                                        value="Tailoring Address"
                                    />
                                    <TextInput
                                        id="tailoring_address"
                                        name="tailoring_address"
                                        value={data.tailoring_address}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                "tailoring_address",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.tailoring_address}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="tailor_count"
                                        value="Number of Tailors"
                                    />
                                    <TextInput
                                        id="tailor_count"
                                        type="number"
                                        name="tailor_count"
                                        value={data.tailor_count}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                "tailor_count",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.tailor_count}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="published_year"
                                        value="Year Established"
                                    />
                                    <TextInput
                                        id="published_year"
                                        type="number"
                                        name="published_year"
                                        value={data.published_year}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                "published_year",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.published_year}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="contact_number"
                                        value="Contact Number"
                                    />
                                    <TextInput
                                        id="contact_number"
                                        name="contact_number"
                                        value={data.contact_number}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                "contact_number",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.contact_number}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="shop_email"
                                        value="Shop Email"
                                    />
                                    <TextInput
                                        id="shop_email"
                                        type="email"
                                        name="shop_email"
                                        value={data.shop_email}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                "shop_email",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.shop_email}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="working_hours"
                                        value="Working Hours"
                                    />
                                    <TextInput
                                        id="working_hours"
                                        name="working_hours"
                                        value={data.working_hours}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                "working_hours",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.working_hours}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="services"
                                        value="Services"
                                    />
                                    <TextInput
                                        id="services"
                                        name="services"
                                        value={data.services}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("services", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.services}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="payment_methods"
                                        value="Payment Methods"
                                    />
                                    <div className="mt-2 space-y-2">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="payment_methods"
                                                value="Cash"
                                                checked={data.payment_methods.includes(
                                                    "Cash"
                                                )}
                                                onChange={(e) => {
                                                    const methods = [
                                                        ...data.payment_methods,
                                                    ];
                                                    if (e.target.checked) {
                                                        methods.push("Cash");
                                                    } else {
                                                        const index =
                                                            methods.indexOf(
                                                                "Cash"
                                                            );
                                                        if (index > -1) {
                                                            methods.splice(
                                                                index,
                                                                1
                                                            );
                                                        }
                                                    }
                                                    setData(
                                                        "payment_methods",
                                                        methods
                                                    );
                                                }}
                                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-600">
                                                Cash
                                            </span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="payment_methods"
                                                value="Bank Transfer"
                                                checked={data.payment_methods.includes(
                                                    "Bank Transfer"
                                                )}
                                                onChange={(e) => {
                                                    const methods = [
                                                        ...data.payment_methods,
                                                    ];
                                                    if (e.target.checked) {
                                                        methods.push(
                                                            "Bank Transfer"
                                                        );
                                                    } else {
                                                        const index =
                                                            methods.indexOf(
                                                                "Bank Transfer"
                                                            );
                                                        if (index > -1) {
                                                            methods.splice(
                                                                index,
                                                                1
                                                            );
                                                        }
                                                    }
                                                    setData(
                                                        "payment_methods",
                                                        methods
                                                    );
                                                }}
                                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-600">
                                                Bank Transfer
                                            </span>
                                        </label>
                                    </div>
                                    <InputError
                                        message={errors.payment_methods}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="shop_images"
                                        value="Shop Images"
                                    />
                                    <input
                                        type="file"
                                        id="shop_images"
                                        name="shop_images"
                                        multiple
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                "shop_images",
                                                Array.from(e.target.files)
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.shop_images}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="social_links.facebook"
                                        value="Facebook Link"
                                    />
                                    <TextInput
                                        id="social_links.facebook"
                                        name="social_links.facebook"
                                        value={data.social_links.facebook}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("social_links", {
                                                ...data.social_links,
                                                facebook: e.target.value,
                                            })
                                        }
                                    />
                                    <InputError
                                        message={
                                            errors["social_links.facebook"]
                                        }
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="social_links.instagram"
                                        value="Instagram Link"
                                    />
                                    <TextInput
                                        id="social_links.instagram"
                                        name="social_links.instagram"
                                        value={data.social_links.instagram}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("social_links", {
                                                ...data.social_links,
                                                instagram: e.target.value,
                                            })
                                        }
                                    />
                                    <InputError
                                        message={
                                            errors["social_links.instagram"]
                                        }
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="social_links.telegram"
                                        value="Telegram Link"
                                    />
                                    <TextInput
                                        id="social_links.telegram"
                                        name="social_links.telegram"
                                        value={data.social_links.telegram}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("social_links", {
                                                ...data.social_links,
                                                telegram: e.target.value,
                                            })
                                        }
                                    />
                                    <InputError
                                        message={
                                            errors["social_links.telegram"]
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </>
                        )}
                    </>
                )}

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ml-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
