import { PostProvider } from '@/Contexts/PostContext';
import { RatingProvider } from '@/Contexts/RatingContext';
import { ToastProvider } from '@/Contexts/ToastContext';
import { RegProvider } from "@/Contexts/RegContext";
import { ClothsProvider } from "@/Contexts/ClothsContext";
import { UniformProvider } from "@/Contexts/UniformContext";
import { SadraiProvider } from "@/Contexts/SadraiContext";
import { OrderProvider } from "@/Contexts/OrderContext";
import { MessagesProvider } from "@/Contexts/MessagesContext";

const GlobalProviders = ({ children }) => {
    return (
        <ToastProvider>
            <PostProvider>
                <RatingProvider>
                    <RegProvider>
                        <ClothsProvider>
                            <UniformProvider>
                                <SadraiProvider>
                                    <OrderProvider>
                                        <MessagesProvider>
                                            {children}
                                        </MessagesProvider>
                                    </OrderProvider>
                                </SadraiProvider>
                            </UniformProvider>
                        </ClothsProvider>
                    </RegProvider>
                </RatingProvider>
            </PostProvider>
        </ToastProvider>
    );
};

export default GlobalProviders; 