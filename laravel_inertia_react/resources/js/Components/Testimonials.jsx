import React, { useState } from "react";

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newComment, setNewComment] = useState({ name: "", comment: "" });

    const handleAddComment = () => {
        setTestimonials([...testimonials, { ...newComment, id: Date.now() }]);
        setNewComment({ name: "", comment: "" });
        setIsModalOpen(false);
    };

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-primary-900 text-center mb-12">
                    د پیرودونکو نظرونه
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-gray-50 p-6 rounded-lg border"
                        >
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-gray-700 mb-4">
                                "{testimonial.comment}"
                            </p>
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
                >
                    نظر اضافه کړئ
                </button>

                {/* Modal for adding comment */}
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg">
                            <h3 className="text-lg font-bold mb-4">
                                نظر اضافه کړئ
                            </h3>
                            <input
                                type="text"
                                placeholder="ستاسو نوم"
                                value={newComment.name}
                                onChange={(e) =>
                                    setNewComment({
                                        ...newComment,
                                        name: e.target.value,
                                    })
                                }
                                className="border p-2 mb-4 w-full"
                            />
                            <textarea
                                placeholder="ستاسو نظر"
                                value={newComment.comment}
                                onChange={(e) =>
                                    setNewComment({
                                        ...newComment,
                                        comment: e.target.value,
                                    })
                                }
                                className="border p-2 mb-4 w-full"
                            />
                            <button
                                onClick={handleAddComment}
                                className="px-4 py-2 bg-green-600 text-white rounded"
                            >
                                اضافه کړئ
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="ml-2 px-4 py-2 bg-red-600 text-white rounded"
                            >
                                بندول
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Testimonials;
