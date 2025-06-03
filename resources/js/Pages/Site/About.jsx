import React from "react";
import SiteLayout from "../../Layouts/SiteLayout";
import { motion } from "framer-motion";
import { FaUsers, FaHandshake, FaAward } from "react-icons/fa";
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
            {/* Enhanced Our Story Section */}
            <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-primary-25">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
                        <motion.div
                            className="lg:w-1/2"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-zar text-primary-800 mb-6 sm:mb-8 bg-gradient-to-r from-primary-800 via-secondary-600 to-tertiary-600 bg-clip-text text-transparent leading-tight">
                                زموږ کیسه
                            </h2>
                            <p className="text-primary-700 mb-4 sm:mb-6 font-zar text-lg sm:text-xl lg:text-2xl leading-relaxed">
                                خیاط ماسټر د یوې ساده لیدنې سره پیل شو:
                                پیرودونکي د ماهرو خیاطانو سره ونښلوو چې وکولی شي
                                لوړ کیفیت، ځانګړې جامې جوړې کړي چې د بدن او
                                سټایل غوښتنو سره په بشپړ ډول برابرې وي.
                            </p>
                            <p className="text-primary-700 mb-4 sm:mb-6 font-zar text-lg sm:text-xl lg:text-2xl leading-relaxed">
                                په ۱۳۸۴ کال کې د احمد رحیمي لخوا تاسیس شو، چې د
                                ۲۰ کلونو څخه زیاته تجربه لرونکی ماهر خیاط دی،
                                زموږ شرکت د کابل په یوه کوچني خیاطۍ دوکان کې پیل
                                شو. کله چې زموږ د کیفیت کار لپاره غوښتنه زیاته
                                شوه، موږ څو ځایونو ته پراختیا ورکړه او په پای کې
                                مو خپل آنلاین پلیټفارم جوړ کړ.
                            </p>
                            <p className="text-primary-700 font-zar text-lg sm:text-xl lg:text-2xl leading-relaxed">
                                نن ورځ، خیاط ماسټر په هیواد کې د خیاطۍ خدماتو
                                مخکښ پلیټفارم دی، چې پیرودونکي د ۱۰۰+ مسلکي
                                خیاطانو سره نښلوي چې په بیلابیلو سټایلونو او
                                تخنیکونو کې تخصص لري، له دودیزو څخه نیولې تر
                                عصري فیشن پورې.
                            </p>
                        </motion.div>

                        <motion.div
                            className="lg:w-1/2"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            {/* Clean Image Only */}
                            <motion.img
                                src="./imgs/team.jpg"
                                alt="زموږ کیسه"
                                className="w-full h-auto rounded-2xl"
                                whileHover={{ scale: 1.02 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                }}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Our Mission */}
            <motion.section
                className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary-50 via-secondary-25 to-tertiary-25"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h2
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold font-zar text-primary-800 mb-6 sm:mb-8 bg-gradient-to-r from-primary-800 via-secondary-600 to-tertiary-600 bg-clip-text text-transparent leading-tight"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        زموږ ماموریت
                    </motion.h2>
                    <motion.p
                        className="text-primary-700 mb-8 sm:mb-12 font-zar text-lg sm:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed px-4"
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
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <motion.div
                            className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/30 shadow-xl"
                            variants={fadeIn}
                            whileHover={{
                                y: -10,
                                scale: 1.02,
                                boxShadow:
                                    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                            }}
                        >
                            <motion.div
                                className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg"
                                whileHover={{ rotate: 360, scale: 1.1 }}
                                transition={{ duration: 0.6 }}
                            >
                                <FaUsers className="text-xl sm:text-2xl" />
                            </motion.div>
                            <h3 className="text-xl sm:text-2xl font-zar font-bold text-primary-700 mb-3 sm:mb-4">
                                پیرودونکي محوري
                            </h3>
                            <p className="text-primary-600 font-zar text-base sm:text-lg lg:text-xl leading-relaxed">
                                موږ د پیرودونکو رضایت ته لومړیتوب ورکوو د شخصي
                                خدمت او جزئیاتو ته پاملرنې له لارې.
                            </p>
                        </motion.div>

                        <motion.div
                            className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/30 shadow-xl"
                            variants={fadeIn}
                            whileHover={{
                                y: -10,
                                scale: 1.02,
                                boxShadow:
                                    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                            }}
                        >
                            <motion.div
                                className="bg-gradient-to-br from-secondary-500 to-tertiary-500 text-white w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg"
                                whileHover={{ rotate: 360, scale: 1.1 }}
                                transition={{ duration: 0.6 }}
                            >
                                <FaHandshake className="text-xl sm:text-2xl" />
                            </motion.div>
                            <h3 className="text-xl sm:text-2xl font-zar font-bold text-primary-700 mb-3 sm:mb-4">
                                د کیفیت کسب
                            </h3>
                            <p className="text-primary-600 font-zar text-base sm:text-lg lg:text-xl leading-relaxed">
                                موږ په هر ګنډل، ټوکر او بشپړ شوي جامو کې د کیفیت
                                لوړ معیارونه ساتو.
                            </p>
                        </motion.div>

                        <motion.div
                            className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/30 shadow-xl"
                            variants={fadeIn}
                            whileHover={{
                                y: -10,
                                scale: 1.02,
                                boxShadow:
                                    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                            }}
                        >
                            <motion.div
                                className="bg-gradient-to-br from-tertiary-500 to-primary-500 text-white w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg"
                                whileHover={{ rotate: 360, scale: 1.1 }}
                                transition={{ duration: 0.6 }}
                            >
                                <FaAward className="text-xl sm:text-2xl" />
                            </motion.div>
                            <h3 className="text-xl sm:text-2xl font-zar font-bold text-primary-700 mb-3 sm:mb-4">
                                نوښت
                            </h3>
                            <p className="text-primary-600 font-zar text-base sm:text-lg lg:text-xl leading-relaxed">
                                موږ خپل تخنیکونه او خدمتونه په دوامداره توګه ښه
                                کوو ترڅو د پیرودونکو بدلیدونکو اړتیاوو ته ځواب
                                ووایو.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Our Team */}
            <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-primary-25">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold font-zar text-primary-900 mb-8 sm:mb-12 text-center bg-gradient-to-r from-primary-800 via-secondary-600 to-tertiary-600 bg-clip-text text-transparent leading-tight"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        زموږ ټیم سره وپیژنئ
                    </motion.h2>
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/30 overflow-hidden shadow-xl"
                                variants={fadeIn}
                                whileHover={{
                                    y: -10,
                                    scale: 1.02,
                                    boxShadow:
                                        "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                                }}
                            >
                                <div className="relative overflow-hidden">
                                    <motion.img
                                        src={
                                            member.image ||
                                            `https://via.placeholder.com/300x300?text=${member.name}`
                                        }
                                        alt={member.name}
                                        className="w-full h-48 sm:h-56 lg:h-64 object-cover"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                </div>
                                <motion.div
                                    className="p-4 sm:p-6"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    <h3 className="text-lg sm:text-xl lg:text-2xl font-zar font-bold text-primary-900 mb-1 sm:mb-2">
                                        {member.name}
                                    </h3>
                                    <p className="text-secondary-600 font-zar text-sm sm:text-base lg:text-lg mb-2 sm:mb-3">
                                        {member.position}
                                    </p>
                                    <p className="text-primary-600 font-zar text-sm sm:text-base leading-relaxed">
                                        {member.bio}
                                    </p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary-50 via-secondary-25 to-tertiary-25">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold font-zar text-primary-900 mb-12 sm:mb-16 text-center bg-gradient-to-r from-primary-800 via-secondary-600 to-tertiary-600 bg-clip-text text-transparent leading-tight"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        زموږ سفر
                    </motion.h2>
                    <div className="max-w-5xl mx-auto">
                        {timeline.map((item, index) => (
                            <motion.div
                                key={index}
                                className="flex mb-8 sm:mb-12 relative"
                                variants={timelineAnimation}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ delay: index * 0.2 }}
                            >
                                {/* Timeline line */}
                                {index < timeline.length - 1 && (
                                    <motion.div
                                        className="absolute right-4 sm:right-6 top-10 sm:top-12 bottom-0 w-0.5 bg-gradient-to-b from-secondary-300 to-tertiary-300"
                                        initial={{ height: 0 }}
                                        whileInView={{ height: "100%" }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        viewport={{ once: true }}
                                    ></motion.div>
                                )}

                                {/* Year bubble */}
                                <motion.div
                                    className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 font-zar font-bold text-lg sm:text-xl rounded-full bg-gradient-to-br from-secondary-600 to-tertiary-600 text-white flex items-center justify-center z-10 shadow-lg"
                                    whileHover={{
                                        scale: 1.2,
                                        boxShadow:
                                            "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                    }}
                                >
                                    {item.year.slice(-2)}
                                </motion.div>

                                {/* Content */}
                                <div className="mr-4 sm:mr-6 flex-1">
                                    <motion.div
                                        className="bg-white/80 backdrop-blur-sm text-base sm:text-lg lg:text-xl font-zar p-4 sm:p-6 lg:p-8 rounded-2xl border border-white/30 shadow-xl"
                                        whileHover={{
                                            y: -5,
                                            scale: 1.02,
                                            boxShadow:
                                                "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                                        }}
                                    >
                                        <h3 className="text-lg sm:text-xl lg:text-2xl font-zar font-bold text-primary-800 mb-2 sm:mb-3">
                                            {item.title}
                                        </h3>
                                        <p className="text-primary-600 leading-relaxed mb-3 sm:mb-4">
                                            {item.description}
                                        </p>
                                        <div className="text-base sm:text-lg font-zar font-bold text-secondary-700 bg-gradient-to-r from-secondary-100 to-tertiary-100 px-3 py-1 rounded-full inline-block">
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
                className="bg-gradient-to-br from-primary-600 via-secondary-600 to-tertiary-600 relative overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-white/10 rounded-full blur-3xl"
                        animate={{
                            x: [0, 100, 0],
                            y: [0, -50, 0],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                    <motion.div
                        className="absolute bottom-0 right-0 w-48 sm:w-80 h-48 sm:h-80 bg-white/10 rounded-full blur-3xl"
                        animate={{
                            x: [0, -80, 0],
                            y: [0, 50, 0],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 sm:py-20 lg:py-24 relative z-10">
                    <motion.h2
                        className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-zar text-white mb-6 sm:mb-8 leading-tight"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        د لوړ کیفیت خیاطۍ تجربه کولو ته چمتو یاست؟
                    </motion.h2>
                    <motion.p
                        className="text-lg sm:text-xl lg:text-2xl font-zar text-white/90 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        د زرګونو راضي پیرودونکو سره یوځای شئ چې د خیاط ماسټر سره
                        یې بشپړ برابروالی موندلی دی.
                    </motion.p>
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href="/tailors"
                                className="inline-block bg-white text-primary-800 py-3 sm:py-4 px-6 sm:px-8 text-lg sm:text-xl rounded-2xl font-zar font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl min-w-[200px]"
                            >
                                خیاط ومومئ
                            </Link>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href="/order"
                                className="inline-block font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-zar text-lg sm:text-xl bg-transparent border-2 border-white text-white hover:text-primary-800 hover:bg-white transition-all duration-300 min-w-[200px]"
                            >
                                فرمایش ورکړئ
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>
        </SiteLayout>
    );
};

export default About;
