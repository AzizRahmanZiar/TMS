import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Layout from "../Components/Layout";

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Layout />
        </AuthenticatedLayout>
    );
}
