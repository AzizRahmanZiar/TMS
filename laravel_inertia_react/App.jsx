import React from "react";
import ReactDOM from "react-dom";
import { TableDataProvider } from "./path/to/TableDataContext"; // Adjust the path as necessary
import Dashboard from "./resources/js/Pages/Dashboard"; // Adjust the path as necessary

const App = () => {
    return (
        <TableDataProvider>
            <Dashboard />
            {/* Other components can also go here */}
        </TableDataProvider>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
