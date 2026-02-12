import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Contexto de Autenticación
import { AuthProvider } from './context/AuthProvider';

// Componentes de Estructura y Seguridad
import Layout from './components/Layout';
import RutaProtegida from './components/RutaProtegida';

// Páginas Públicas
import Login from './pages/Login';
import Registro from './pages/Registro';
import RecuperarPassword from './pages/RecuperarPassword';

// Páginas Privadas
import Dashboard from './pages/Dashboard';
import Lotes from './pages/Lotes'; // Importación del componente que creamos

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          
          {/* RUTAS PÚBLICAS: Acceso libre para login y registro */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/recuperar-clave" element={<RecuperarPassword />} />

          {/* RUTAS PRIVADAS: Requieren Token de sesión válido */}
          <Route element={<RutaProtegida />}>
            <Route path="/" element={<Layout />}>
              
              {/* Al entrar a la raíz, redirigimos automáticamente al Dashboard */}
              <Route index element={<Navigate to="/dashboard" />} />
              
              {/* Panel principal con gráficas y noticias */}
              <Route path="dashboard" element={<Dashboard />} />
              
              {/* Gestión de producción (Formulario y Tabla) */}
              <Route path="lotes" element={<Lotes />} />

              {/* RUTA DE PERSONAL: Placeholder (Puedes crear Personal.jsx luego) */}
              <Route 
                path="personal" 
                element={
                  <div className="animate-in fade-in duration-700">
                    <h2 className="text-4xl font-black text-neutral-900 uppercase tracking-tighter">Gestión de Personal</h2>
                    <p className="text-neutral-400 font-bold text-xs uppercase tracking-widest mt-2">Administración de operadores y galponeros</p>
                    <div className="mt-10 p-10 border-2 border-dashed border-neutral-200 rounded-2xl text-center text-neutral-400">
                        Sección en desarrollo...
                    </div>
                  </div>
                } 
              />

              {/* RUTA DE REPORTES: Placeholder */}
              <Route 
                path="reportes" 
                element={
                  <div className="animate-in fade-in duration-700">
                    <h2 className="text-4xl font-black text-neutral-900 uppercase tracking-tighter">Reportes Especializados</h2>
                    <p className="text-neutral-400 font-bold text-xs uppercase tracking-widest mt-2">Análisis de datos y exportación</p>
                    <div className="mt-10 p-10 border-2 border-dashed border-neutral-200 rounded-2xl text-center text-neutral-400">
                        Próximamente: Exportación a PDF y Excel
                    </div>
                  </div>
                } 
              />
              
            </Route>
          </Route>

          {/* Redirección por defecto si la ruta no existe */}
          <Route path="*" element={<Navigate to="/login" />} />
          
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;