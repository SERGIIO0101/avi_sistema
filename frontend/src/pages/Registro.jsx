import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clienteAxios from '../api/axios';
import fondoAvi from '../assets/login-bg.jpg';

const Registro = () => {
    // 1. Estados para los campos del formulario
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // Estados para alertas y carga
    const [alerta, setAlerta] = useState({});
    const [cargando, setCargando] = useState(false);

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const navigate = useNavigate();

    // 2. Función que procesa el formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación básica
        if ([nombre, email, password].includes('')) {
            setAlerta({ msg: 'Todos los campos son obligatorios', error: true });
            return;
        }

        if (password.length < 6) {
            setAlerta({ msg: 'La contraseña debe tener al menos 6 caracteres', error: true });
            return;
        }

        setAlerta({});
        setCargando(true);

        try {
            // Petición al backend (Ajusta la URL '/usuarios' según tu API)
            const { data } = await clienteAxios.post('/usuarios', { nombre, email, password });
            
            setAlerta({
                msg: 'Cuenta creada correctamente. Redirigiendo al login...',
                error: false
            });

            // Limpiar campos
            setNombre('');
            setEmail('');
            setPassword('');

            // Redirigir después de 2 segundos
            setTimeout(() => {
                navigate('/login');
            }, 2500);

        } catch (error) {
            setAlerta({
                msg: error.response?.data?.msg || 'Hubo un error al registrar el usuario',
                error: true
            });
        } finally {
            setCargando(false);
        }
    };

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        setMousePos({ 
            x: (clientX - window.innerWidth / 2) / 45, 
            y: (clientY - window.innerHeight / 2) / 45 
        });
    };

    return (
        <div className="h-screen w-full flex bg-white font-sans overflow-hidden relative" onMouseMove={handleMouseMove}>
            <style>
                {`
                    @keyframes balanceo { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
                    @keyframes picoteo { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(1.4); } }
                    .pollito-vivo { animation: balanceo 3s ease-in-out infinite; }
                    .pico-vivo { animation: picoteo 1.5s ease-in-out infinite; transform-origin: top; }
                    .rayo-cut { clip-path: polygon(0% 0%, 100% 0%, 82% 42%, 92% 42%, 72% 100%, 0% 100%); }
                `}
            </style>

            {/* PANEL IZQUIERDO: FORMULARIO */}
            <div className="relative w-full lg:w-[68%] bg-white z-20 rayo-cut flex items-center justify-center p-8 lg:p-20 shadow-[30px_0_60px_rgba(0,0,0,0.1)]">
                <div className="max-w-md w-full animate-in fade-in duration-700">
                    
                    {/* Header AVI */}
                    <div className="mb-8">
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
                        <h2 className="text-3xl font-extrabold text-neutral-800 tracking-tight">Crear Cuenta</h2>
                        <p className="text-neutral-500 mt-2 font-medium uppercase text-[10px] tracking-[0.2em] text-emerald-600">Registro de Administrador</p>
                    </div>

                    {/* Alerta dinámica */}
                    {alerta.msg && (
                        <div className={`p-4 rounded-xl text-xs font-black uppercase tracking-widest mb-6 border-2 ${alerta.error ? 'bg-red-50 border-red-100 text-red-600' : 'bg-emerald-50 border-emerald-100 text-emerald-600'}`}>
                            {alerta.msg}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Nombre Completo</label>
                            <input 
                                type="text" 
                                placeholder="Ej. Sergio Perdomo"
                                value={nombre}
                                onChange={e => setNombre(e.target.value)}
                                className="w-full bg-neutral-50 border-2 border-neutral-100 p-4 rounded-xl outline-none focus:border-emerald-600 focus:bg-white transition-all font-bold text-sm" 
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Correo Corporativo</label>
                            <input 
                                type="email" 
                                placeholder="administrador@avi.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full bg-neutral-50 border-2 border-neutral-100 p-4 rounded-xl outline-none focus:border-emerald-600 focus:bg-white transition-all font-bold text-sm" 
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Nueva Contraseña</label>
                            <input 
                                type="password" 
                                placeholder="••••••••"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full bg-neutral-50 border-2 border-neutral-100 p-4 rounded-xl outline-none focus:border-emerald-600 focus:bg-white transition-all font-bold text-sm" 
                            />
                        </div>
                        
                        <button 
                            disabled={cargando}
                            className="w-full bg-emerald-600 text-white font-black py-5 rounded-xl shadow-lg shadow-emerald-100 uppercase tracking-[0.2em] text-[11px] hover:bg-emerald-700 transition-all active:scale-[0.98] mt-4 disabled:opacity-50"
                        >
                            {cargando ? 'Procesando...' : 'Registrar Sistema'}
                        </button>
                    </form>

                    <p className="mt-8 text-sm font-bold text-neutral-400 text-center">
                        ¿Ya tienes cuenta? <Link to="/login" className="text-emerald-600 hover:underline">Inicia Sesión</Link>
                    </p>
                </div>

                {/* SVG DEL RAYO */}
                <div className="hidden lg:block absolute left-[83%] top-0 h-full w-[300px] z-30 pointer-events-none">
                    <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <polyline points="98,0 80,42 90,42 70,100" fill="none" stroke="white" strokeWidth="1" opacity="0.6" />
                    </svg>
                </div>
            </div>

            {/* PANEL DERECHO: PARALLAX */}
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
            </div>
        </div>
    );
};

export default Registro;