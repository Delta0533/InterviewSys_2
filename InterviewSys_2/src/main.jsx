import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EnterScore from "./pages/EnterScore/EnterScore.tsx";
// import DefaultPage from "./defaultPage.jsx";
import Table from "./pages/Table/table.jsx";
import LoginPage from "./pages/LoginPage/Login.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />,
    },
    {
        path: "/table",
        element: <Table />,
    },
    {
        path: "/enter/:junior_id",
        element: <EnterScore />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
