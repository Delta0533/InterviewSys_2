import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EnterScore from "./pages/EnterScore/EnterScore.tsx";
import DefaultPage from "./defaultPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultPage />,
    },
    {
        path: "/enter",
        element: <EnterScore />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
