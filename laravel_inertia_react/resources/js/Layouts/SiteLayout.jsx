import Navbar from "../../js/Components/Navbar";
import Footer from "../../js/Components/Footer";

const SiteLayout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <main dir="rtl">{children}</main>
            <Footer />
        </div>
    );
};

export default SiteLayout;
