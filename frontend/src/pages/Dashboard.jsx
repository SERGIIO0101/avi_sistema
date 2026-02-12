import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import clienteAxios from '../api/axios';
import useAuth from '../hooks/useAuth';

const Dashboard = () => {
    const { auth } = useAuth();
    const [datos, setDatos] = useState(null);
    const [noticias, setNoticias] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [filtro, setFiltro] = useState('Semana');

    const obtenerSaludo = () => {
        const hora = new Date().getHours();
        if (hora < 12) return 'Buenos días';
        if (hora < 18) return 'Buenas tardes';
        return 'Buenas noches';
    };

    useEffect(() => {
        const cargarDashboard = async () => {
            try {
                // Sincronización paralela: Datos internos + Noticias externas
                const [resMetricas, resNoticias] = await Promise.all([
                    clienteAxios.get('/usuarios/dashboard-stats'), // Ajustar según tu ruta de stats
                    clienteAxios.get('/noticias')
                ]);
                
                setDatos(resMetricas.data);
                setNoticias(resNoticias.data);
            } catch (error) {
                console.error("Error al sincronizar dashboard", error);
                // Datos de respaldo por si el backend aún no tiene las rutas listas
                setNoticias([]); 
            } finally {
                // Pequeño delay para que la animación de entrada luzca mejor
                setTimeout(() => setCargando(false), 600);
            }
        };
        cargarDashboard();
    }, []);

    if (cargando) return (
        <div className="h-[80vh] flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">Sincronizando Inteligencia...</p>
        </div>
    );

    return (
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-20">
            
            {/* --- CABECERA PERSONALIZADA --- */}
            <div className="mb-12 flex flex-col xl:flex-row xl:items-end justify-between gap-8">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase rounded-full tracking-widest">
                            {obtenerSaludo()}
                        </span>
                        <span className="text-neutral-400 text-[9px] font-bold uppercase tracking-widest">
                            {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
                        </span>
                    </div>
                    <h3 className="text-5xl font-black text-neutral-900 tracking-tighter uppercase leading-none">
                        Bienvenido, <span className="text-emerald-600">{auth?.nombre?.split(' ')[0] || 'Admin'}</span>
                    </h3>
                    <p className="text-neutral-500 font-medium mt-3 text-lg">Resumen productivo y noticias globales del sector.</p>
                </div>

                <div className="flex bg-white border border-neutral-100 p-1.5 rounded-2xl shadow-sm">
                    {['Hoy', 'Semana', 'Mes'].map((t) => (
                        <button
                            key={t}
                            onClick={() => setFiltro(t)}
                            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                                filtro === t ? 'bg-neutral-900 text-white shadow-lg' : 'text-neutral-400 hover:text-neutral-600'
                            }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            {/* --- GRID DE MÉTRICAS --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {[
                    { label: 'Población Total', valor: '12,500', sub: 'Aves activas', color: 'text-neutral-900', p: 85, trend: '+2%' },
                    { label: 'Mortalidad Lote', valor: '0.05%', sub: 'Bajo el umbral', color: 'text-red-600', p: 15, trend: '-0.01%' },
                    { label: 'Conversión Alimento', valor: '1.42', sub: 'Eficiencia FCR', color: 'text-emerald-600', p: 90, trend: 'Óptimo' }
                ].map((item, i) => (
                    <div key={i} className="bg-white p-10 rounded-[3rem] shadow-sm border border-neutral-100 group hover:shadow-xl transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">{item.label}</p>
                            <span className="text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md">{item.trend}</span>
                        </div>
                        <h4 className={`text-5xl font-black tracking-tighter ${item.color}`}>{item.valor}</h4>
                        <p className="text-[10px] font-bold text-neutral-500 mt-4 uppercase tracking-wider">{item.sub}</p>
                        <div className="mt-8 h-1.5 w-full bg-neutral-50 rounded-full overflow-hidden">
                            <div className="h-full bg-neutral-900 transition-all duration-1000" style={{ width: `${item.p}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- FEED DE NOTICIAS REAL-TIME --- */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-6 px-4">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
                    </span>
                    <h4 className="text-xs font-black text-neutral-800 uppercase tracking-[0.3em]">Sector News Live</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {noticias.length > 0 ? noticias.map((news, idx) => (
                        <a href={news.url} target="_blank" rel="noopener noreferrer" key={idx} className="bg-white p-8 rounded-[3rem] border border-neutral-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                            <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">{news.fuente}</span>
                            <h5 className="text-[14px] font-extrabold text-neutral-800 mt-3 line-clamp-2 leading-snug">{news.titulo}</h5>
                            <div className="mt-6 flex items-center justify-between">
                                <span className="text-[9px] font-bold text-neutral-400 uppercase">{new Date(news.tiempo).toLocaleDateString()}</span>
                                <div className="w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
                                    <svg className="w-4 h-4 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </div>
                            </div>
                        </a>
                    )) : (
                        [1,2,3].map(i => <div key={i} className="h-44 bg-neutral-100/50 animate-pulse rounded-[3rem]"></div>)
                    )}
                </div>
            </div>

            {/* --- ANÁLISIS Y BITÁCORA --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-12 rounded-[4rem] border border-neutral-100 shadow-sm">
                    <h4 className="text-sm font-black text-neutral-800 uppercase tracking-widest mb-10">Curva de Rendimiento (Peso/Semana)</h4>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={datos?.grafico || [
                                { dia: 'Sem 1', peso: 0.5 }, { dia: 'Sem 2', peso: 0.9 }, { dia: 'Sem 3', peso: 1.5 },
                                { dia: 'Sem 4', peso: 2.1 }, { dia: 'Sem 5', peso: 2.4 }
                            ]}>
                                <defs>
                                    <linearGradient id="colorPeso" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                                <XAxis dataKey="dia" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#a3a3a3'}} />
                                <YAxis hide />
                                <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '12px' }} />
                                <Area type="monotone" dataKey="peso" stroke="#10b981" strokeWidth={5} fillOpacity={1} fill="url(#colorPeso)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-neutral-900 p-10 rounded-[4rem] shadow-2xl relative overflow-hidden group">
                    <div className="relative z-10 flex flex-col h-full justify-between text-white">
                        <div>
                            <p className="text-emerald-400 font-black uppercase text-[10px] tracking-widest mb-4">Próximo Hito</p>
                            <h3 className="text-4xl font-black tracking-tighter leading-tight mb-6">Salida Lote #204</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between border-b border-white/10 pb-2">
                                    <span className="text-[10px] font-bold text-neutral-400 uppercase">Día Proyectado</span>
                                    <span className="text-xs font-black">14 Marzo</span>
                                </div>
                                <div className="flex justify-between border-b border-white/10 pb-2">
                                    <span className="text-[10px] font-bold text-neutral-400 uppercase">Peso Esperado</span>
                                    <span className="text-xs font-black">2.45 kg</span>
                                </div>
                            </div>
                        </div>
                        <button className="mt-10 bg-emerald-600 hover:bg-emerald-500 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all active:scale-95">
                            Generar Reporte Completo
                        </button>
                    </div>
                    <div className="absolute -right-20 -bottom-20 w-64 h-64 border-[1px] border-white/5 rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;