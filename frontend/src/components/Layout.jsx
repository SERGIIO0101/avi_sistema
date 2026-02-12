import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Layout = () => {
    const { auth, cerrarSesion } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        cerrarSesion();
        navigate('/login');
    };

    // Diccionario de títulos para el Header según la ruta
    const titulos = {
        '/dashboard': 'Panel de Control',
        '/lotes': 'Gestión de Lotes Activos',
        '/personal': 'Administración de Personal',
        '/reportes': 'Reportes y Estadísticas'
    };

    const tituloActual = titulos[location.pathname] || 'Sistema AVI';

    const isActive = (path) => 
        location.pathname === path 
        ? "bg-emerald-50 text-emerald-700 border-r-4 border-emerald-600 shadow-sm" 
        : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-800";

    return (
        <div className="flex h-screen bg-neutral-50 font-sans text-neutral-900">
            {/* ESTILOS DE ANIMACIÓN IDENTITARIOS */}
            <style>
                {`
                    @keyframes balanceo { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
                    @keyframes picoteo { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(1.4); } }
                    .pollito-sidebar { animation: balanceo 3s ease-in-out infinite; }
                    .pico-sidebar { animation: picoteo 1.5s ease-in-out infinite; transform-origin: top; }
                `}
            </style>
            
            {/* SIDEBAR */}
            <aside className="w-72 bg-white border-r border-neutral-200 flex flex-col py-10 shadow-sm z-40">
                
                {/* Logo AVI */}
                <div className="px-10 mb-12 flex items-center gap-4">
                    <div className="relative">
                        <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center border-b-4 border-yellow-500 shadow-sm pollito-sidebar">
                            <div className="flex flex-col items-center">
                                <div className="flex gap-1.5 mb-1">
                                    <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                                    <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                                </div>
                                <div className="w-0 h-0 border-l-[4.5px] border-l-transparent border-r-[4.5px] border-r-transparent border-t-[7px] border-t-orange-600 pico-sidebar"></div>
                            </div>
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-sm"></div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tighter leading-none">AVI</h1>
                        <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-[0.2em]">Tecnología Avícola</p>
                    </div>
                </div>

                {/* MENÚ DE NAVEGACIÓN */}
                <nav className="flex-1 px-4 space-y-1">
                    <Link to="/dashboard" className={`flex items-center gap-4 p-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${isActive('/dashboard')}`}>
                        Dashboard
                    </Link>
                    <Link to="/lotes" className={`flex items-center gap-4 p-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${isActive('/lotes')}`}>
                        Lotes Activos
                    </Link>
                    <Link to="/personal" className={`flex items-center gap-4 p-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${isActive('/personal')}`}>
                        Gestión de Personal
                    </Link>
                    <Link to="/reportes" className={`flex items-center gap-4 p-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${isActive('/reportes')}`}>
                        Reportes
                    </Link>
                </nav>

                {/* INFO USUARIO Y LOGOUT */}
                <div className="px-6 mt-auto">
                    <div className="mb-6 p-4 bg-neutral-50 rounded-2xl border border-neutral-100 overflow-hidden">
                        <p className="text-[10px] font-black text-neutral-400 uppercase mb-1">Usuario Activo</p>
                        <p className="text-sm font-bold text-neutral-800 truncate capitalize">
                            {auth?.nombre || 'Usuario AVI'}
                        </p>
                    </div>
                    <button 
                        onClick={handleLogout} 
                        className="w-full flex items-center justify-center p-4 text-red-500 font-black hover:bg-red-50 rounded-2xl transition-all uppercase text-[10px] tracking-widest border border-transparent hover:border-red-100"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* CONTENIDO PRINCIPAL */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#F8F9FA]">
                {/* HEADER DINÁMICO */}
                <header className="h-20 bg-white border-b border-neutral-200 px-12 flex justify-between items-center shrink-0">
                    <h2 className="text-sm font-black text-neutral-500 uppercase tracking-[0.25em]">
                        {tituloActual}
                    </h2>
                    
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col text-right">
                            <span className="text-[10px] font-black text-emerald-600 uppercase">Sistema Online</span>
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{auth?.email}</span>
                        </div>
                        <div className="w-10 h-10 bg-emerald-100 text-emerald-700 flex items-center justify-center font-black rounded-xl border border-emerald-200 uppercase text-xs">
                            {auth?.nombre?.substring(0, 2) || 'AV'}
                        </div>
                    </div>
                </header>

                {/* VISTA DE LA PÁGINA ACTUAL */}
                <section className="flex-1 overflow-y-auto p-12 scroll-smooth">
                    <div className="max-w-7xl mx-auto">
                        <Outlet /> 
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Layout;