import React, { useState } from 'react';
import { Eye, EyeOff, User, Lock, Mail, Phone, Building, ArrowRight, Check } from 'lucide-react';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        restaurantName: '',
        ownerName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
    });

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Register attempt:', formData);
    };

    return (
        <>
            <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', sans-serif;
          line-height: 1.6;
          color: #1e293b;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .register-container {
          display: flex;
          min-height: 100vh;
          background: #f8fafc;
          overflow-x: hidden;
        }

        .register-left {
          flex: 1;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #667eea 50%, #f093fb 75%, #f5576c 100%);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          overflow: hidden;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .brand-content {
          max-width: 450px;
          text-align: center;
          z-index: 2;
          position: relative;
        }

        .logo-large {
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin: 0 auto 1.5rem;
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .brand-title {
          font-size: 2.2rem;
          font-weight: 800;
          color: white;
          margin-bottom: 0.75rem;
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          line-height: 1.2;
        }

        .brand-subtitle {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 2rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .feature-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          text-align: left;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: rgba(255, 255, 255, 0.95);
          font-size: 0.95rem;
          font-weight: 500;
        }

        .feature-icon {
          width: 32px;
          height: 32px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          flex-shrink: 0;
        }

        .floating-elements {
          position: absolute;
          inset: 0;
        }

        .floating-circle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .circle-1 {
          width: 200px;
          height: 200px;
          top: 10%;
          right: 10%;
          animation: floatCircle 20s linear infinite;
        }

        .circle-2 {
          width: 150px;
          height: 150px;
          bottom: 15%;
          left: 15%;
          animation: floatCircle 25s linear infinite reverse;
        }

        .circle-3 {
          width: 100px;
          height: 100px;
          top: 60%;
          right: 20%;
          animation: floatCircle 30s linear infinite;
        }

        @keyframes floatCircle {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(20px, -30px) rotate(90deg); }
          50% { transform: translate(-10px, -20px) rotate(180deg); }
          75% { transform: translate(-30px, 10px) rotate(270deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }

        .register-right {
          flex: 0 0 600px;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
          overflow-y: auto;
        }

        .register-form-container {
          width: 100%;
          max-width: 450px;
        }

        .form-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .form-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }

        .form-subtitle {
          color: #64748b;
          font-size: 0.95rem;
        }

        .register-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .input-label {
          font-weight: 600;
          color: #1e293b;
          font-size: 0.875rem;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 0.875rem;
          color: #94a3b8;
          z-index: 1;
          transition: color 0.3s ease;
        }

        .input-field {
          width: 100%;
          padding: 0.875rem 0.875rem 0.875rem 2.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 0.95rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: #ffffff;
          color: #1e293b;
        }

        .input-field::placeholder {
          color: #94a3b8;
        }

        .input-field:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
          transform: translateY(-1px);
        }

        .input-field:focus ~ .input-icon,
        .input-wrapper:focus-within .input-icon {
          color: #6366f1;
        }

        .toggle-password {
          position: absolute;
          right: 0.875rem;
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .toggle-password:hover {
          color: #6366f1;
          background: rgba(99, 102, 241, 0.1);
        }

        .password-strength {
          margin-top: 0.5rem;
          font-size: 0.75rem;
          color: #64748b;
        }

        .strength-bar {
          height: 4px;
          background: #e2e8f0;
          border-radius: 2px;
          margin-top: 0.25rem;
          overflow: hidden;
        }

        .strength-fill {
          height: 100%;
          transition: all 0.3s ease;
          border-radius: 2px;
        }

        .strength-weak { width: 33%; background: #ef4444; }
        .strength-medium { width: 66%; background: #f59e0b; }
        .strength-strong { width: 100%; background: #10b981; }

        .checkbox-container {
          margin: 1rem 0;
        }

        .checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          cursor: pointer;
          color: #64748b;
          user-select: none;
          font-size: 0.875rem;
          line-height: 1.4;
        }

        .checkbox {
          width: 1.1rem;
          height: 1.1rem;
          accent-color: #6366f1;
          margin-top: 0.125rem;
          flex-shrink: 0;
        }

        .terms-link {
          color: #6366f1;
          text-decoration: none;
          font-weight: 600;
        }

        .terms-link:hover {
          text-decoration: underline;
        }

        .register-button {
          width: 100%;
          padding: 1rem 1.5rem;
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .register-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        }

        .register-button:active {
          transform: translateY(0);
        }

        .register-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .button-icon {
          transition: transform 0.3s ease;
        }

        .register-button:hover:not(:disabled) .button-icon {
          transform: translateX(4px);
        }

        .divider {
          text-align: center;
          margin: 1.5rem 0;
          position: relative;
          color: #94a3b8;
          font-size: 0.875rem;
        }

        .divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: #e2e8f0;
        }

        .divider span {
          background: #ffffff;
          padding: 0 1.5rem;
          position: relative;
          font-weight: 500;
        }

        .login-prompt {
          text-align: center;
          font-size: 0.875rem;
          color: #64748b;
        }

        .login-link {
          color: #6366f1;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .login-link:hover {
          color: #4f46e5;
          text-decoration: underline;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-top: 1rem;
        }

        .benefit-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.875rem;
        }

        .benefit-check {
          width: 20px;
          height: 20px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        @media (max-width: 1024px) {
          .register-container {
            flex-direction: column;
          }
          
          .register-left {
            flex: none;
            min-height: 40vh;
            padding: 1.5rem;
          }
          
          .register-right {
            flex: none;
            box-shadow: none;
            padding: 1.5rem;
          }
          
          .brand-title {
            font-size: 2rem;
          }
          
          .brand-subtitle {
            font-size: 0.95rem;
          }
          
          .form-title {
            font-size: 1.5rem;
          }

          .benefits-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .register-left {
            min-height: 30vh;
            padding: 1rem;
          }
          
          .register-right {
            padding: 1rem;
          }
          
          .brand-title {
            font-size: 1.75rem;
          }
          
          .form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
          
          .register-form-container {
            max-width: 100%;
          }
        }

        @media (max-width: 480px) {
          .register-left {
            min-height: 25vh;
            padding: 1rem;
          }
          
          .brand-title {
            font-size: 1.5rem;
          }
          
          .brand-subtitle {
            font-size: 0.875rem;
            margin-bottom: 1rem;
          }
          
          .logo-large {
            width: 50px;
            height: 50px;
          }
          
          .form-header {
            margin-bottom: 1.5rem;
          }
          
          .form-title {
            font-size: 1.25rem;
          }
          
          .feature-list {
            display: none;
          }

          .benefits-grid {
            display: none;
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .register-left {
          animation: slideInLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .register-right {
          animation: slideInRight 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        .register-button:focus-visible,
        .login-link:focus-visible,
        .terms-link:focus-visible {
          outline: 2px solid #6366f1;
          outline-offset: 2px;
        }
      `}</style>

            <main className="register-container">
                {/* Panel izquierdo con branding */}
                <div className="register-left">
                    <div className="brand-content">
                        <div className="logo-large">
                            <Building size={32} />
                        </div>
                        <h1 className="brand-title">Únete a ReservApp</h1>
                        <p className="brand-subtitle">
                            Revoluciona la gestión de tu restaurante con nuestra plataforma
                            integral de reservas y administración de mesas.
                        </p>

                        <div className="feature-list">
                            <div className="feature-item">
                                <div className="feature-icon">🎯</div>
                                <span>Gestión centralizada de reservas</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon">📊</div>
                                <span>Reportes y analytics detallados</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon">🔔</div>
                                <span>Notificaciones automáticas</span>
                            </div>
                        </div>

                        <div className="benefits-grid">
                            <div className="benefit-item">
                                <div className="benefit-check">
                                    <Check size={12} />
                                </div>
                                <span>30 días gratis</span>
                            </div>
                            <div className="benefit-item">
                                <div className="benefit-check">
                                    <Check size={12} />
                                </div>
                                <span>Sin permanencia</span>
                            </div>
                            <div className="benefit-item">
                                <div className="benefit-check">
                                    <Check size={12} />
                                </div>
                                <span>Soporte 24/7</span>
                            </div>
                            <div className="benefit-item">
                                <div className="benefit-check">
                                    <Check size={12} />
                                </div>
                                <span>Configuración gratuita</span>
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
                <div className="register-right">
                    <div className="register-form-container">
                        <div className="form-header">
                            <h2 className="form-title">Crear Cuenta</h2>
                            <p className="form-subtitle">Completa la información de tu restaurante</p>
                        </div>

                        <div className="register-form">
                            <div className="form-row">
                                <div className="input-group">
                                    <label className="input-label">Nombre del restaurante</label>
                                    <div className="input-wrapper">
                                        <Building className="input-icon" size={20} />
                                        <input
                                            type="text"
                                            name="restaurantName"
                                            placeholder="Mi Restaurante"
                                            className="input-field"
                                            value={formData.restaurantName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="input-group">
                                    <label className="input-label">Nombre del propietario</label>
                                    <div className="input-wrapper">
                                        <User className="input-icon" size={20} />
                                        <input
                                            type="text"
                                            name="ownerName"
                                            placeholder="Juan Pérez"
                                            className="input-field"
                                            value={formData.ownerName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="input-group">
                                <label className="input-label">Correo electrónico</label>
                                <div className="input-wrapper">
                                    <Mail className="input-icon" size={20} />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="admin@mirestaurante.com"
                                        className="input-field"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label className="input-label">Teléfono</label>
                                <div className="input-wrapper">
                                    <Phone className="input-icon" size={20} />
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="+57 300 123 4567"
                                        className="input-field"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="input-group">
                                    <label className="input-label">Contraseña</label>
                                    <div className="input-wrapper">
                                        <Lock className="input-icon" size={20} />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="Mínimo 8 caracteres"
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
                                    {formData.password && (
                                        <div className="password-strength">
                                            <div className="strength-bar">
                                                <div className={`strength-fill ${
                                                    formData.password.length < 6 ? 'strength-weak' :
                                                        formData.password.length < 10 ? 'strength-medium' : 'strength-strong'
                                                }`}></div>
                                            </div>
                                            <span>
                        Seguridad: {
                                                formData.password.length < 6 ? 'Débil' :
                                                    formData.password.length < 10 ? 'Media' : 'Fuerte'
                                            }
                      </span>
                                        </div>
                                    )}
                                </div>

                                <div className="input-group">
                                    <label className="input-label">Confirmar contraseña</label>
                                    <div className="input-wrapper">
                                        <Lock className="input-icon" size={20} />
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            placeholder="Repite la contraseña"
                                            className="input-field"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="toggle-password"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="checkbox-container">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="acceptTerms"
                                        className="checkbox"
                                        checked={formData.acceptTerms}
                                        onChange={handleChange}
                                        required
                                    />
                                    <span>
                    Acepto los <a href="#" className="terms-link">Términos y Condiciones</a> y
                    la <a href="#" className="terms-link">Política de Privacidad</a> de ReservApp
                  </span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="register-button"
                                disabled={!formData.acceptTerms || formData.password !== formData.confirmPassword}
                                onClick={handleSubmit}
                            >
                                <span>Crear Cuenta</span>
                                <ArrowRight size={20} className="button-icon" />
                            </button>

                            <div className="divider">
                                <span>¿Ya tienes una cuenta?</span>
                            </div>

                            <div className="login-prompt">
                                <a href="#" className="login-link">Iniciar sesión aquí</a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}