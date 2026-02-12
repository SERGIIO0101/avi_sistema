import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../api/axios';
import useAuth from '../hooks/useAuth'; // IMPORTANTE: Asegúrate de tener este hook
import fondoAvi from '../assets/login-bg.jpg';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    
    const navigate = useNavigate();
    const { setAuth } = useAuth(); // Extraemos setAuth para actualizar el estado global

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const moveX = (clientX - window.innerWidth / 2) / 45;
        const moveY = (clientY - window.innerHeight / 2) / 45;
        setMousePos({ x: moveX, y: moveY });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Petición al backend
            const { data } = await clienteAxios.post('/usuarios/login', { email, password });
            
            // 1. Guardar el token en el almacenamiento local
            localStorage.setItem('token', data.token);
            
            // 2. Sincronizar el estado global de autenticación
            // Pasamos data.usuario (que debe contener el 'id' de MySQL)
            setAuth(data.usuario); 

            // 3. Redirigir al dashboard
            navigate('/dashboard');

        } catch (err) {
            // Manejo de errores amigable
            setError(err.response?.data?.message || 'Credenciales incorrectas o error de conexión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div 
            className="h-screen w-full flex bg-white font-sans overflow-hidden relative"
            onMouseMove={handleMouseMove}
        >
            <style>
                {`
                    @keyframes balanceo { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
                    @keyframes picoteo { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(1.4); } }
                    .pollito-vivo { animation: balanceo 3s ease-in-out infinite; }
                    .pico-vivo { animation: picoteo 1.5s ease-in-out infinite; transform-origin: top; }
                    .rayo-cut {
                        clip-path: polygon(0% 0%, 100% 0%, 82% 42%, 92% 42%, 72% 100%, 0% 100%);
                    }
                `}
            </style>

            {/* PANEL IZQUIERDO */}
            <div className="relative w-full lg:w-[68%] bg-white z-20 rayo-cut flex items-center justify-center p-8 lg:p-20 shadow-[30px_0_60px_rgba(0,0,0,0.1)]">
                <div className="max-w-md w-full animate-in fade-in duration-700">
                    
                    {/* Header AVI */}
                    <div className="mb-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-sm border-b-4 border-yellow-500 pollito-vivo">
                                <div className="flex flex-col items-center">
                                    <div className="flex gap-1.5 mb-1">
                                        <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                                        <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                                    </div>
                                    <div className="w-0 h-0 border-l-[4.5px] border-l-transparent border-r-[4.5px] border-r-transparent border-t-[7px] border-t-orange-600 pico-vivo"></div>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-4xl font-black text-neutral-900 tracking-tighter leading-none">AVI</h1>
                                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Tecnología Avícola</p>
                            </div>
                        </div>
                        <h2 className="text-3xl font-extrabold text-neutral-800 tracking-tight leading-tight">Acceso al Sistema</h2>
                        <p className="text-neutral-500 mt-2 font-medium">Controle su producción con precisión profesional.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider ml-1">Correo electrónico</label>
                            <input 
                                type="email" 
                                className="w-full bg-neutral-50 border-2 border-neutral-100 p-4 rounded-xl text-neutral-900 focus:border-emerald-600 focus:bg-white outline-none transition-all"
                                placeholder="usuario@correo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider ml-1">Contraseña</label>
                            <input 
                                type="password" 
                                className="w-full bg-neutral-50 border-2 border-neutral-100 p-4 rounded-xl text-neutral-900 focus:border-emerald-600 focus:bg-white outline-none transition-all"
                                placeholder="Escriba su clave"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between px-1">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input type="checkbox" className="w-4 h-4 rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500" />
                                <span className="text-xs text-neutral-600 font-bold uppercase group-hover:text-black transition-colors">Recordarme</span>
                            </label>
                            <button type="button" onClick={() => navigate('/recuperar-clave')} className="text-xs font-black text-emerald-700 hover:text-emerald-900 uppercase">¿Olvidó su clave?</button>
                        </div>

                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-bold border border-red-200 text-center uppercase">
                                {error}
                            </div>
                        )}

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-5 rounded-xl shadow-lg shadow-emerald-200 transition-all active:scale-[0.97] text-lg uppercase tracking-wider mt-4"
                        >
                            {loading ? 'Entrando...' : 'Iniciar Sesión'}
                        </button>
                    </form>

                    <div className="mt-8">
                        <p className="text-xs text-neutral-500 font-medium italic">
                            ¿Necesita un usuario? <br />
                            <span className="text-emerald-700 font-bold uppercase tracking-tight not-italic">Contacte al administrador para el registro.</span>
                        </p>
                    </div>
                </div>

                {/* SVG DEL RAYO */}
                <div className="hidden lg:block absolute left-[83%] top-0 h-full w-[300px] z-30 pointer-events-none">
                    <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <polyline points="98,0 80,42 90,42 70,100" fill="none" stroke="white" strokeWidth="1" opacity="0.6" />
                        <polyline points="105,0 87,42 97,42 77,100" fill="none" stroke="white" strokeWidth="0.3" opacity="0.3" />
                    </svg>
                </div>
            </div>

            {/* PANEL DERECHO */}
            <div className="hidden lg:block lg:w-[48%] h-full fixed right-0 top-0 z-10 overflow-hidden bg-neutral-100">
                <img 
                    src={fondoAvi} 
                    alt="Fondo Avícola" 
                    style={{
                        transform: `scale(1.2) translate(${-mousePos.x}px, ${-mousePos.y}px)`,
                        transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                    }}
                    className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-emerald-900/5 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent"></div>
            </div>
        </div>
    );
};

export default Login;