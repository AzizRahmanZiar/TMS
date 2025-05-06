import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const SiteLayout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default SiteLayout;
