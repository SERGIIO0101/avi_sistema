import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../api/axios';
import fondoAvi from '../assets/login-bg.jpg';

const RecuperarPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const navigate = useNavigate();

    // Mantenemos el Parallax para que la transición desde el login sea invisible
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
        setMensaje('');
        
        try {
            await clienteAxios.post('/usuarios/olvide-password', { email });
            setMensaje('Hemos enviado un correo con las instrucciones.');
        } catch (err) {
            setError(err.response?.data?.message || 'El correo no está registrado');
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
                    
                    /* GEOMETRÍA DE RAYO UNIFICADA */
                    .rayo-cut {
                        clip-path: polygon(0% 0%, 100% 0%, 82% 42%, 92% 42%, 72% 100%, 0% 100%);
                    }
                `}
            </style>

            {/* PANEL IZQUIERDO: Formulario con el corte de rayo */}
            <div className="relative w-full lg:w-[68%] bg-white z-20 rayo-cut flex items-center justify-center p-8 lg:p-20 shadow-[30px_0_60px_rgba(0,0,0,0.1)]">
                <div className="max-w-md w-full animate-in fade-in duration-700">
                    
                    {/* Header AVI */}
                    <div className="mb-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div 
                                className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-sm border-b-4 border-yellow-500 pollito-vivo cursor-pointer" 
                                onClick={() => navigate('/login')}
                            >
                                <div className="flex flex-col items-center">
                                    <div className="flex gap-1.5 mb-1">
                                        <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                                        <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                                    </div>
                                    <div className="w-0 h-0 border-l-[4.5px] border-l-transparent border-r-[4.5px] border-r-transparent border-t-[7px] border-t-orange-600 pico-vivo"></div>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-4xl font-black text-neutral-900 tracking-tighter leading-none cursor-pointer" onClick={() => navigate('/login')}>AVI</h1>
                                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Tecnología Avícola</p>
                            </div>
                        </div>
                        <h2 className="text-3xl font-extrabold text-neutral-800 tracking-tight leading-tight">Recuperar Acceso</h2>
                        <p className="text-neutral-500 mt-2 font-medium">Ingresa tu correo para restablecer tu contraseña.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider ml-1">Correo electrónico</label>
                            <input 
                                type="email" 
                                className="w-full bg-neutral-50 border-2 border-neutral-100 p-4 rounded-xl text-neutral-900 focus:border-emerald-600 focus:bg-white outline-none transition-all font-bold"
                                placeholder="usuario@correo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-bold border border-red-200 text-center uppercase tracking-wide">
                                {error}
                            </div>
                        )}

                        {mensaje && (
                            <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl text-xs font-bold border border-emerald-200 text-center uppercase tracking-wide">
                                {mensaje}
                            </div>
                        )}

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-5 rounded-xl shadow-lg shadow-emerald-200 transition-all active:scale-[0.97] text-lg uppercase tracking-wider mt-2"
                        >
                            {loading ? 'Enviando...' : 'Enviar Instrucciones'}
                        </button>

                        <button 
                            type="button"
                            onClick={() => navigate('/login')}
                            className="w-full text-xs font-black text-neutral-400 hover:text-emerald-700 uppercase tracking-[0.2em] transition-colors"
                        >
                            ← Volver al inicio de sesión
                        </button>
                    </form>
                </div>

                {/* SVG DEL RAYO (Sincronizado con clip-path) */}
                <div className="hidden lg:block absolute left-[83%] top-0 h-full w-[300px] z-30 pointer-events-none">
                    <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <polyline points="98,0 80,42 90,42 70,100" fill="none" stroke="white" strokeWidth="1" opacity="0.6" />
                        <polyline points="105,0 87,42 97,42 77,100" fill="none" stroke="white" strokeWidth="0.3" opacity="0.3" />
                    </svg>
                </div>
            </div>

            {/* PANEL DERECHO: Con Parallax y colores originales */}
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
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent shadow-inner"></div>
            </div>
        </div>
    );
};

export default RecuperarPassword;