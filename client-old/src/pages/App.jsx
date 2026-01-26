import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "../pages/IndexApp.jsx";
import Login from "../pages/Login.jsx";
import Register from "./SignUp.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Ruta principal */}
                <Route path="/" element={<Index />} />

                {/* Ruta para login cliente */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Ruta para login admin */}
                <Route path="/admin/login" element={<Login isAdmin={true} />} />
            </Routes>
        </BrowserRouter>
    );
}
