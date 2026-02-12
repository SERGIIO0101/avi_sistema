import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RutaProtegida = () => {
    const { auth, cargando } = useAuth();

    // Mientras se verifica el token en el AuthProvider, mostramos la pantalla de carga
    if (cargando) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-white">
                <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
                <h2 className="text-emerald-600 font-black uppercase tracking-widest animate-pulse">
                    Cargando AVI...
                </h2>
            </div>
        );
    }

    /**
     * LÓGICA DE ACCESO:
     * Si auth tiene un 'id' (proveniente de tu tabla usuarios en MySQL), 
     * permitimos el paso al Layout y Dashboard mediante <Outlet />.
     * De lo contrario, lo mandamos de vuelta al login.
     */
    return auth?.id ? <Outlet /> : <Navigate to="/login" />;
};

export default RutaProtegida;