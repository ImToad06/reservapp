import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function Index() {
    const navigate = useNavigate();

    return (
        <main className="home-container">
            {/* Elementos decorativos */}
            <div className="decor decor-1"></div>
            <div className="decor decor-2"></div>

            {/* Contenido principal con animación */}
            <motion.div
                className="home-content"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h1 className="home-title">BIENVENIDO A RESERVAPP</h1>
                <p className="home-subtitle">¿Qué perfil deseas usar?</p>

                <div className="home-actions">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn btn-cliente"
                        onClick={() => navigate("/login")}
                    >
                        CLIENTE
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn btn-admin"
                        onClick={() => navigate("/admin/login")}
                    >
                        ADMIN
                    </motion.button>
                </div>
            </motion.div>
        </main>
    );
}
