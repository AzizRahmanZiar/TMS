import React from "react";
import SiteLayout from "../../Layouts/SiteLayout";
import { FaCheck, FaUsers, FaHandshake, FaAward } from "react-icons/fa";

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
            position: "مشر ډیزاینر",
            bio: "د واده او رسمي جامو په ډیزاین کې تخصص لري او عصري سټایل ورسره یوځای کوي.",
            image: "./imgs/javid.jpg",
        },
        {
            name: "محمد کریمي",
            position: "د دودیزو جامو متخصص",
            bio: "دودیزې تخنیکونه ساتي او په عین وخت کې عصري عناصر ورسره یوځای کوي.",
            image: "./imgs/noor.jpg",
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

    return (
        <SiteLayout title="زموږ په اړه - خیاط ماسټر">
            {/* Hero Section */}
            <section className="bg-primary-50 text-primary-900 py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        د خیاط ماسټر په اړه
                    </h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto">
                        د ۱۳۸۴ کال راهیسې د پیرودونکو او ماهرو خیاطانو ترمنځ
                        اړیکه ټینګوو.
                    </p>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2">
                            <h2 className="text-3xl text-primary-800 font-bold mb-6">
                                زموږ کیسه
                            </h2>
                            <p className="text-primary-700 mb-4">
                                خیاط ماسټر د یوې ساده لیدنې سره پیل شو:
                                پیرودونکي د ماهرو خیاطانو سره ونښلوو چې وکولی شي
                                لوړ کیفیت، ځانګړې جامې جوړې کړي چې د بدن او
                                سټایل غوښتنو سره په بشپړ ډول برابرې وي.
                            </p>
                            <p className="text-primary-700 mb-4">
                                په ۱۳۸۴ کال کې د احمد رحیمي لخوا تاسیس شو، چې د
                                ۲۰ کلونو څخه زیاته تجربه لرونکی ماهر خیاط دی،
                                زموږ شرکت د کابل په یوه کوچني خیاطۍ دوکان کې پیل
                                شو. کله چې زموږ د کیفیت کار لپاره غوښتنه زیاته
                                شوه، موږ څو ځایونو ته پراختیا ورکړه او په پای کې
                                مو خپل آنلاین پلیټفارم جوړ کړ.
                            </p>
                            <p className="text-primary-700">
                                نن ورځ، خیاط ماسټر په هیواد کې د خیاطۍ خدماتو
                                مخکښ پلیټفارم دی، چې پیرودونکي د ۱۰۰+ مسلکي
                                خیاطانو سره نښلوي چې په بیلابیلو سټایلونو او
                                تخنیکونو کې تخصص لري، له دودیزو څخه نیولې تر
                                عصري فیشن پورې.
                            </p>
                        </div>

                        <div className="md:w-1/2">
                            <img
                                src="/images/about/story.jpg"
                                alt="زموږ کیسه"
                                className="rounded-lg w-full h-auto object-cover"
                                onError={(e) => {
                                    e.target.src = "./imgs/team-1.jpg";
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Mission */}
            <section className="py-16 bg-primary-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl text-primary-800 font-bold mb-6">
                        زموږ ماموریت
                    </h2>
                    <p className="text-primary-700 mb-8 max-w-3xl mx-auto">
                        د استثنایي خیاطۍ خدماتو وړاندې کول چې دودیز کسب له عصري
                        ډیزاین سره یوځای کوي، ډاډ ترلاسه کوي چې هر پیرودونکی په
                        بشپړ ډول برابرې، لوړ کیفیت جامې ترلاسه کوي چې د هغوی
                        شخصي سټایل منعکس کوي.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="bg-white p-6 rounded-lg border">
                            <div className="bg-primary-50 text-tertiary-700 hover:bg-tertiary-700 hover:text-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaUsers className="text-2xl" />
                            </div>
                            <h3 className="text-xl text-primary-700 font-bold mb-2">
                                پیرودونکي محوري
                            </h3>
                            <p className="text-primary-600">
                                موږ د پیرودونکو رضایت ته لومړیتوب ورکوو د شخصي
                                خدمت او جزئیاتو ته پاملرنې له لارې.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg border">
                            <div className="bg-primary-50 text-tertiary-700 hover:bg-tertiary-700 hover:text-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaHandshake className="text-2xl" />
                            </div>
                            <h3 className="text-xl text-primary-700 font-bold mb-2">
                                د کیفیت کسب
                            </h3>
                            <p className="text-primary-600">
                                موږ په هر ګنډل، ټوکر او بشپړ شوي جامو کې د کیفیت
                                لوړ معیارونه ساتو.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg border">
                            <div className="bg-primary-50 text-tertiary-700 hover:bg-tertiary-700 hover:text-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaAward className="text-2xl" />
                            </div>
                            <h3 className="text-xl text-primary-700 font-bold mb-2">
                                نوښت
                            </h3>
                            <p className="text-primary-600">
                                موږ خپل تخنیکونه او خدمتونه په دوامداره توګه ښه
                                کوو ترڅو د پیرودونکو بدلیدونکو اړتیاوو ته ځواب
                                ووایو.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Team */}
            <section className="py-16 bg-primary-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl text-primary-900 font-bold mb-8 text-center">
                        زموږ ټیم سره وپیژنئ
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg border overflow-hidden"
                            >
                                <img
                                    src={
                                        member.image ||
                                        `https://via.placeholder.com/300x300?text=${member.name}`
                                    }
                                    alt={member.name}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl text-primary-900 font-bold mb-1">
                                        {member.name}
                                    </h3>
                                    <p className="text-secondary-600 mb-3">
                                        {member.position}
                                    </p>
                                    <p className="text-primary-600">
                                        {member.bio}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl text-primary-900 font-bold mb-12 text-center">
                        زموږ سفر
                    </h2>
                    <div className="max-w-4xl mx-auto">
                        {timeline.map((item, index) => (
                            <div key={index} className="flex mb-8 relative">
                                {/* Timeline line */}
                                {index < timeline.length - 1 && (
                                    <div className="absolute right-6 top-10 bottom-0 w-0.5 bg-primary-200"></div>
                                )}

                                {/* Year bubble */}
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary-700 text-primary-50 flex items-center justify-center z-10">
                                    {item.year.slice(-2)}
                                </div>

                                {/* Content */}
                                <div className="mr-6">
                                    <div className="bg-white p-6 rounded-lg border">
                                        <h3 className="text-xl text-primary-800 font-bold mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-primary-600">
                                            {item.description}
                                        </p>{" "}
                                        <div className="text-sm text-secondary-900 mt-3">
                                            {item.year}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section>
                <div className=" mx-auto px-4 text-center bg-primary-50 py-20">
                    <h2 className="text-3xl text-primary-900 font-bold mb-6">
                        د لوړ کیفیت خیاطۍ تجربه کولو ته چمتو یاست؟
                    </h2>
                    <p className="text-xl text-secondary-900 mb-8 max-w-3xl mx-auto">
                        د زرګونو راضي پیرودونکو سره یوځای شئ چې د خیاط ماسټر سره
                        یې بشپړ برابروالی موندلی دی.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/tailors"
                            className="bg-tertiary-700 text-primary-50 py-3 px-8 rounded-md font-medium hover:bg-tertiary-800 transition"
                        >
                            خیاط ومومئ
                        </a>
                        <a
                            href="/order"
                            className="bg-transparent border-2 border-secondary-600 text-primary-800 py-3 px-8 rounded-md font-medium  hover:text-primary-50 hover:bg-secondary-700 transition"
                        >
                            فرمایش ورکړئ
                        </a>
                    </div>
                </div>
            </section>
        </SiteLayout>
    );
};

export default About;
