import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
export default function Dashboard() {
    return <AuthenticatedLayout>Dashboard page</AuthenticatedLayout>;
}

// resources/js/Pages/Dashboard.jsx
// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { useTableData } from "@/Contexts/SadraiContext"; // Adjust the path

// export default function Dashboard() {
//     const { rowCount } = useTableData(); // Destructure rowCount from context

//     return (
//         <AuthenticatedLayout>
//             <h1 className="text-2xl font-bold">Dashboard</h1>
//             <p>Number of rows: {rowCount}</p>
//         </AuthenticatedLayout>
//     );
// }
