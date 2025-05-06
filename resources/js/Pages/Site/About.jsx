import React from "react";
import SiteLayout from "../../Layouts/SiteLayout";
import { motion } from "framer-motion";
import { FaCheck, FaUsers, FaHandshake, FaAward } from "react-icons/fa";
import { Link } from "@inertiajs/react";

const About = () => {
    // Sample team members data
    const teamMembers = [
        {
            name: "  Aziz",
            position: "بنسټګر او ماهر خیاط",
            bio: "د خیاطۍ په برخه کې د ۲۰+ کلونو تجربه لري او په رسمي جامو کې تخصص لري.",
            image: "./imgs/ahmad.jpg",
        },
        {
            name: " ابراهیم ",
            position: "مشر ډیزاینر",
            bio: "د واده او رسمي جامو په ډیزاین کې تخصص لري او عصري سټایل ورسره یوځای کوي.",
            image: "./imgs/javid.jpg",
        },
        {
            name: "محمد کریمي",
            position: "د دودیزو جامو متخصص",
            bio: "دودیزې تخنیکونه ساتي او په عین وخت کې عصري عناصر ورسره یوځای کوي.",
            image: "./imgs/ahmad.jpg",
        },
        {
            name: " زرمت شاه",
            position: "د پیرودونکو د اړیکو مدیره",
            bio: "ډاډ ترلاسه کوي چې هر پیرودونکی شخصي پاملرنه او خدمت ترلاسه کوي.",
            image: "./imgs/rahim.jpg",
        },
    ];

    // Timeline data
    const timeline = [
        {
            year: "۱۳۸۴",
            title: "پیل",
            description:
                "د یوه کوچني خیاطۍ دوکان په توګه پیل شو چې یوازې دوه خیاطان یې درلودل. زموږ تمرکز د لوړ کیفیت جامو ګنډلو او دودیزو طرحو چمتو کولو باندې و.",
        },
        {
            year: "۱۳۸۹",
            title: "پراختیا",
            description:
                "درې نوي څانګې پرانیستل شوې او د مسلکي خیاطانو ټیم مو پراخ شو. پیرودونکو ته د غوره خدماتو وړاندې کولو لپاره موږ عصري ماشینونه او تجهیزات اضافه کړل.",
        },
        {
            year: "۱۳۹۴",
            title: "آنلاین پلیټفارم",
            description:
                "زموږ آنلاین پلیټفارم پیل شو ترڅو پیرودونکي د هیواد په کچه له خیاطانو سره ونښلوي. دا پلیټفارم پیرودونکو ته د فیشن غوره کولو، فرمایش ورکولو، او د خیاطانو سره مستقیمې اړیکې اسانتیا برابره کړه.",
        },
        {
            year: "۱۳۹۹",
            title: "نوښت",
            description:
                "مجازي فیټینګ معرفي شو چې پیرودونکو ته یې د آنلاین اندازه اخیستنې اسانتیا برابره کړه. زموږ خدمتونه په ملي کچه پراخ شول، او د خیاطۍ صنعت ته مو د ټیکنالوژۍ نوې بڼه راوستله.",
        },
        {
            year: "۱۴۰۲",
            title: "نن ورځ",
            description:
                "اوس مهال موږ د زرګونو پیرودونکو خدمت کوو او د ۱۰۰+ مسلکي خیاطانو شبکه لرو. زموږ هدف د نړیوال معیار مطابق خدمتونه وړاندې کول، د خیاطۍ صنعت ته وده ورکول، او د پیرودونکو تجربې ته لا ښه والی ورکول.",
        },
    ];

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const timelineAnimation = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <SiteLayout title="زموږ په اړه - خیاط ماسټر">
            {/* Hero Section */}
            <motion.section
                className="bg-primary-50 text-primary-900 py-20"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <div className="container mx-auto px-4 text-center">
                    <motion.h1
                        className="text-3xl md:text-5xl font-bold font-zar mb-4    "
                        variants={fadeIn}
                    >
                        د خیاط ماسټر په اړوند
                    </motion.h1>
                    <motion.p
                        className="text-lg font-zar md:text-2xl max-w-3xl mx-auto"
                        variants={fadeIn}
                    >
                        د ۱۳۸۴ کال راهیسې د پیرودونکو او ماهرو خیاطانو ترمنځ
                        اړیکه ټینګوو.
                    </motion.p>
                </div>
            </motion.section>

            {/* Our Story */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <motion.div
                            className="md:w-1/2"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold font-zar text-primary-800  mb-6">
                                زموږ کیسه
                            </h2>
                            <p className="text-primary-700 mb-4 font-zar text-xl md:text-2xl">
                                خیاط ماسټر د یوې ساده لیدنې سره پیل شو:
                                پیرودونکي د ماهرو خیاطانو سره ونښلوو چې وکولی شي
                                لوړ کیفیت، ځانګړې جامې جوړې کړي چې د بدن او
                                سټایل غوښتنو سره په بشپړ ډول برابرې وي.
                            </p>
                            <p className="text-primary-700 mb-4 font-zar text-xl md:text-2xl">
                                په ۱۳۸۴ کال کې د احمد رحیمي لخوا تاسیس شو، چې د
                                ۲۰ کلونو څخه زیاته تجربه لرونکی ماهر خیاط دی،
                                زموږ شرکت د کابل په یوه کوچني خیاطۍ دوکان کې پیل
                                شو. کله چې زموږ د کیفیت کار لپاره غوښتنه زیاته
                                شوه، موږ څو ځایونو ته پراختیا ورکړه او په پای کې
                                مو خپل آنلاین پلیټفارم جوړ کړ.
                            </p>
                            <p className="text-primary-700 font-zar text-xl md:text-2xl">
                                نن ورځ، خیاط ماسټر په هیواد کې د خیاطۍ خدماتو
                                مخکښ پلیټفارم دی، چې پیرودونکي د ۱۰۰+ مسلکي
                                خیاطانو سره نښلوي چې په بیلابیلو سټایلونو او
                                تخنیکونو کې تخصص لري، له دودیزو څخه نیولې تر
                                عصري فیشن پورې.
                            </p>
                        </motion.div>

                        <motion.div
                            className="md:w-1/2"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <img
                                src="./imgs/team.jpg"
                                alt="زموږ کیسه"
                                className="rounded-lg w-full h-auto"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Our Mission */}
            <motion.section
                className="py-16 bg-primary-50"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-4 text-center">
                    <motion.h2
                        className="text-3xl font-bold font-zar text-primary-800  mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        زموږ ماموریت
                    </motion.h2>
                    <motion.p
                        className="text-primary-700 mb-8 font-zar text-xl md:text-2xl max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        د استثنایي خیاطۍ خدماتو وړاندې کول چې دودیز کسب له عصري
                        ډیزاین سره یوځای کوي، ډاډ ترلاسه کوي چې هر پیرودونکی په
                        بشپړ ډول برابرې، لوړ کیفیت جامې ترلاسه کوي چې د هغوی
                        شخصي سټایل منعکس کوي.
                    </motion.p>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <motion.div
                            className="bg-white p-6 rounded-lg border shadow-md"
                            variants={fadeIn}
                            whileHover={{
                                y: -10,
                                boxShadow:
                                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                            }}
                        >
                            <motion.div
                                className="bg-primary-50 text-tertiary-700 hover:bg-tertiary-700 hover:text-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                            >
                                <FaUsers className="text-2xl" />
                            </motion.div>
                            <h3 className="text-2xl font-zar font-bold text-primary-700  mb-2">
                                پیرودونکي محوري
                            </h3>
                            <p className="text-primary-600 font-zar text-xl md:text-2xl">
                                موږ د پیرودونکو رضایت ته لومړیتوب ورکوو د شخصي
                                خدمت او جزئیاتو ته پاملرنې له لارې.
                            </p>
                        </motion.div>

                        <motion.div
                            className="bg-white p-6 rounded-lg border shadow-md"
                            variants={fadeIn}
                            whileHover={{
                                y: -10,
                                boxShadow:
                                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                            }}
                        >
                            <motion.div
                                className="bg-primary-50 text-tertiary-700 hover:bg-tertiary-700 hover:text-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                            >
                                <FaHandshake className="text-2xl" />
                            </motion.div>
                            <h3 className="text-2xl font-zar font-bold text-primary-700  mb-2">
                                د کیفیت کسب
                            </h3>
                            <p className="text-primary-600 font-zar text-xl md:text-2xl">
                                موږ په هر ګنډل، ټوکر او بشپړ شوي جامو کې د کیفیت
                                لوړ معیارونه ساتو.
                            </p>
                        </motion.div>

                        <motion.div
                            className="bg-white p-6 rounded-lg border shadow-md"
                            variants={fadeIn}
                            whileHover={{
                                y: -10,
                                boxShadow:
                                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                            }}
                        >
                            <motion.div
                                className="bg-primary-50 text-tertiary-700 hover:bg-tertiary-700 hover:text-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                            >
                                <FaAward className="text-2xl" />
                            </motion.div>
                            <h3 className="text-2xl font-zar font-bold text-primary-700  mb-2">
                                نوښت
                            </h3>
                            <p className="text-primary-600 font-zar text-xl md:text-2xl">
                                موږ خپل تخنیکونه او خدمتونه په دوامداره توګه ښه
                                کوو ترڅو د پیرودونکو بدلیدونکو اړتیاوو ته ځواب
                                ووایو.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Our Team */}
            <section className="py-16 bg-primary-50">
                <div className="container mx-auto px-4">
                    <motion.h2
                        className="text-3xl font-bold font-zar text-primary-900  mb-8 text-center"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        زموږ ټیم سره وپیژنئ
                    </motion.h2>
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-lg border overflow-hidden shadow-md"
                                variants={fadeIn}
                                whileHover={{
                                    y: -10,
                                    boxShadow:
                                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                                }}
                            >
                                <motion.img
                                    src={
                                        member.image ||
                                        `https://via.placeholder.com/300x300?text=${member.name}`
                                    }
                                    alt={member.name}
                                    className="w-full h-64 object-cover"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                />
                                <motion.div
                                    className="p-6"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    <h3 className="text-2xl font-zar font-bold text-primary-900  mb-1">
                                        {member.name}
                                    </h3>
                                    <p className="text-secondary-600 font-zar text-xl mb-3">
                                        {member.position}
                                    </p>
                                    <p className="text-primary-600 font-zar">
                                        {member.bio}
                                    </p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <motion.h2
                        className="text-3xl font-bold font-zar text-primary-900  mb-12 text-center"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        زموږ سفر
                    </motion.h2>
                    <div className="max-w-4xl mx-auto">
                        {timeline.map((item, index) => (
                            <motion.div
                                key={index}
                                className="flex mb-8 relative"
                                variants={timelineAnimation}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ delay: index * 0.2 }}
                            >
                                {/* Timeline line */}
                                {index < timeline.length - 1 && (
                                    <motion.div
                                        className="absolute right-6  top-10 bottom-0 w-0.5 bg-primary-200"
                                        initial={{ height: 0 }}
                                        whileInView={{ height: "100%" }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        viewport={{ once: true }}
                                    ></motion.div>
                                )}

                                {/* Year bubble */}
                                <motion.div
                                    className="flex-shrink-0 w-12 font-zar font-bold text-2xl h-12 rounded-full bg-secondary-700 text-primary-50 flex items-center justify-center z-10"
                                    whileHover={{
                                        scale: 1.2,
                                        backgroundColor: "#4338ca",
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                    }}
                                >
                                    {item.year.slice(-2)}
                                </motion.div>

                                {/* Content */}
                                <div className="mr-6">
                                    <motion.div
                                        className="bg-white text-xl font-zar p-6 rounded-lg border shadow-md"
                                        whileHover={{
                                            y: -5,
                                            boxShadow:
                                                "0 20px 25px -5px rgba(11, 6, 6, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                                        }}
                                    >
                                        <h3 className="text-2xl font-zar font-bold text-primary-800  mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-primary-600">
                                            {item.description}
                                        </p>{" "}
                                        <div className="text-xl font-zar font-bold text-secondary-900 mt-3">
                                            {item.year}
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="mx-auto px-4 text-center bg-primary-50 py-20">
                    <motion.h2
                        className="text-3xl font-bold font-zar text-primary-900  mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        د لوړ کیفیت خیاطۍ تجربه کولو ته چمتو یاست؟
                    </motion.h2>
                    <motion.p
                        className="text-xl md:text-2xl font-zar text-secondary-900 mb-8 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        د زرګونو راضي پیرودونکو سره یوځای شئ چې د خیاط ماسټر سره
                        یې بشپړ برابروالی موندلی دی.
                    </motion.p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/tailors"
                            className=" bg-tertiary-700 text-primary-50 py-3 px-4 text-xl rounded-md font-zar font-bold hover:bg-tertiary-800 transition"
                        >
                            خیاط ومومئ
                        </Link>
                        <Link
                            href="/order"
                            className="font-bold px-6 py-3 rounded-md font-zar text-xl bg-transparent border-2  border-secondary-600 text-primary-800  hover:text-primary-50 hover:bg-secondary-700 transition"
                        >
                            فرمایش ورکړئ
                        </Link>
                    </div>
                </div>
            </motion.section>
        </SiteLayout>
    );
};

export default About;
