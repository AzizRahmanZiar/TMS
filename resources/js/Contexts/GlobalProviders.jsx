import { PostProvider } from "./PostContext";
import { SadraiProvider } from "./SadraiContext";
import { ClothsProvider } from "./ClothsContext";
import { UniformProvider } from "./UniformContext";
import { KortaiProvider } from "./KortaiContext";
import { AdminProvider } from "./AdminContext";
import { RegProvider } from "./RegContext";
import { RatingProvider } from "./RatingContext";
import { MessagesProvider } from "./MessagesContext";
import { OrderProvider } from "./OrderContext";

const GlobalProviders = ({ children }) => {
    return (
        <PostProvider>
            <SadraiProvider>
                <ClothsProvider>
                    <OrderProvider>
                        <UniformProvider>
                            <KortaiProvider>
                                <AdminProvider>
                                    <RegProvider>
                                        <RatingProvider>
                                            <MessagesProvider>
                                                {children}
                                            </MessagesProvider>
                                        </RatingProvider>
                                    </RegProvider>
                                </AdminProvider>
                            </KortaiProvider>
                        </UniformProvider>
                    </OrderProvider>
                </ClothsProvider>
            </SadraiProvider>
        </PostProvider>
    );
};

export default GlobalProviders;
