import React, { useState } from 'react';
import { Eye, EyeOff, User, Lock, Mail, ArrowRight } from 'lucide-react';
import '../login.css';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login attempt:', formData);
    };

    return (
        <main className="login-container">
            {/* Panel izquierdo con imagen/branding */}
            <div className="login-left">
                <div className="brand-content">
                    <div className="logo-large">
                        <User size={48} />
                    </div>
                    <h1 className="brand-title">Bienvenido a tu Plataforma</h1>
                    <p className="brand-subtitle">
                        Gestiona todos tus proyectos desde un solo lugar.
                        Conecta, colabora y crea experiencias increíbles.
                    </p>
                    <div className="feature-list">
                        <div className="feature-item">
                            <div className="feature-icon">✨</div>
                            <span>Interfaz moderna e intuitiva</span>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">🚀</div>
                            <span>Herramientas avanzadas</span>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">🔒</div>
                            <span>Seguridad garantizada</span>
                        </div>
                    </div>
                </div>

                {/* Elementos decorativos */}
                <div className="floating-elements">
                    <div className="floating-circle circle-1"></div>
                    <div className="floating-circle circle-2"></div>
                    <div className="floating-circle circle-3"></div>
                </div>
            </div>

            {/* Panel derecho con formulario */}
            <div className="login-right">
                <div className="login-form-container">
                    <div className="form-header">
                        <h2 className="form-title">Iniciar Sesión</h2>
                        <p className="form-subtitle">Ingresa a tu cuenta para continuar</p>
                    </div>

                    <div className="login-form">
                        <div className="input-group">
                            <label className="input-label">Correo electrónico</label>
                            <div className="input-wrapper">
                                <Mail className="input-icon" size={20} />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="correo@restaurante.com"
                                    className="input-field"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Contraseña</label>
                            <div className="input-wrapper">
                                <Lock className="input-icon" size={20} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Contraseña del sistema"
                                    className="input-field"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="form-options">
                            <label className="checkbox-label">
                                <input type="checkbox" className="checkbox" />
                                <span className="checkmark"></span>
                                Mantener sesión activa
                            </label>
                            <a href="#" className="forgot-link">¿Olvidaste la contraseña?</a>
                        </div>

                        <button type="submit" className="login-button">
                            <span>Acceder al Panel</span>
                            <ArrowRight size={20} className="button-icon" />
                        </button>

                        <div className="divider">
                            <span>O accede con</span>
                        </div>

                        <div className="social-buttons">
                            <button className="social-btn google">
                                <svg width="20" height="20" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                Continuar con Google
                            </button>

                            <button className="social-btn microsoft">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"/>
                                </svg>
                                Continuar con Microsoft
                            </button>
                        </div>

                        <div className="signup-prompt">
                            <span>¿No tienes una cuenta? </span>
                            <a href="#" className="signup-link">Crear cuenta gratuita</a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}