import { useState, useEffect, createContext } from 'react';
import clienteAxios from '../api/axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');
            
            if (!token) {
                setCargando(false);
                return;
            }

            try {
                // El interceptor de clienteAxios pegará el token automáticamente
                const { data } = await clienteAxios.get('/usuarios/perfil');
                
                // data debe ser {id, nombre, email} según tu controlador de MySQL
                setAuth(data); 
            } catch (error) {
                console.error("Sesión expirada o inválida");
                localStorage.removeItem('token');
                setAuth({});
            } finally {
                setCargando(false);
            }
        };
        autenticarUsuario();
    }, []);

    // FUNCIÓN PARA CERRAR SESIÓN
    // Esta es la que llama tu Layout.jsx
    const cerrarSesion = () => {
        localStorage.removeItem('token');
        setAuth({});
    };

    return (
        <AuthContext.Provider 
            value={{ 
                auth, 
                setAuth, 
                cargando, 
                cerrarSesion // <--- IMPORTANTE: Exportar para el Layout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
export default AuthContext;