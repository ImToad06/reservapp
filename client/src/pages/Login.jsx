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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            email: formData.email,
            password: formData.password
        };
        console.log('Login attempt:', formData);
        const response = await fetch("http://localhost:3000/api/auth/register/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Antes de parsear como JSON, comprobamos que sea realmente JSON
        const text = await response.text();
        try {
            const data = JSON.parse(text);
            console.log("Login exitoso:", data);
            alert("Usuario registrado con éxito ✅");
        } catch (err) {
            console.error("La respuesta no es JSON:", text);
            alert("Error inesperado en el servidor");
        }
    };

    return (
        <main className="login-container">
            {/* Left panel with branding */}
            <div className="login-left">
                <div className="brand-content">
                    <div className="logo-large">
                        <User size={48} />
                    </div>
                    <h1 className="brand-title">Welcome to ReservApp</h1>
                    <p className="brand-subtitle">
                        Book your favorite table anytime, anywhere.
                        Discover restaurants, manage reservations, and enjoy unforgettable dining experiences.
                    </p>
                    <div className="feature-list">
                        <div className="feature-item">
                            <div className="feature-icon">🍽️</div>
                            <span>Find and book tables instantly</span>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">📅</div>
                            <span>Manage your reservations with ease</span>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">⭐</div>
                            <span>Discover top-rated restaurants</span>
                        </div>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="floating-elements">
                    <div className="floating-circle circle-1"></div>
                    <div className="floating-circle circle-2"></div>
                    <div className="floating-circle circle-3"></div>
                </div>
            </div>

            {/* Right panel with login form */}
            <div className="login-right">
                <div className="login-form-container">
                    <div className="form-header">
                        <h2 className="form-title">Sign In</h2>
                        <p className="form-subtitle">Access your reservations and dining profile</p>
                    </div>

                    {/* ✅ Aquí envolvemos en form y usamos onSubmit */}
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label className="input-label">Email Address</label>
                            <div className="input-wrapper">
                                <Mail className="input-icon" size={20} />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="you@email.com"
                                    className="input-field"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Password</label>
                            <div className="input-wrapper">
                                <Lock className="input-icon" size={20} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Your account password"
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
                                Keep me signed in
                            </label>
                            <a href="#" className="forgot-link">Forgot password?</a>
                        </div>

                        {/* ✅ Ahora sí dispara handleSubmit */}
                        <button type="submit" className="login-button">
                            <span>Access My Reservations</span>
                            <ArrowRight size={20} className="button-icon" />
                        </button>
                    </form>

                    <div className="divider">
                        <span>Or sign in with</span>
                    </div>

                    <div className="social-buttons">
                        <button className="social-btn google">
                            {/* ... tu SVG ... */}
                            Continue with Google
                        </button>

                        <button className="social-btn microsoft">
                            {/* ... tu SVG ... */}
                            Continue with Microsoft
                        </button>
                    </div>

                    <div className="signup-prompt">
                        <span>Don't have an account? </span>
                        <a href="/register" className="signup-link">Create a free account</a>
                    </div>
                </div>
            </div>
        </main>
    );

}