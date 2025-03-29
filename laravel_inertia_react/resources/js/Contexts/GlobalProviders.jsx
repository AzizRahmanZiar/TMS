import { PostProvider } from "./PostContext";
import { SadraiProvider } from "./SadraiContext";
import { ClothsProvider } from "./ClothsContext";
import { UniformProvider } from "./UniformContext";
import { KortaiProvider } from "./KortaiContext";
import { AdminProvider } from "./AdminContext";
import { RegProvider } from "./RegContext";
import { RatingProvider } from "./RatingContext";

const GlobalProviders = ({ children }) => {
    return (
        <RatingProvider>
            <RegProvider>
                <AdminProvider>
                    <ClothsProvider>
                        <UniformProvider>
                            <KortaiProvider>
                                <SadraiProvider>
                                    <PostProvider>{children}</PostProvider>
                                </SadraiProvider>
                            </KortaiProvider>
                        </UniformProvider>
                    </ClothsProvider>
                </AdminProvider>
            </RegProvider>
        </RatingProvider>
    );
};

export default GlobalProviders;
