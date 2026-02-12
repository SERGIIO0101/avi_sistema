import React, { useState, useEffect } from 'react';
import clienteAxios from '../api/axios';
import { PlusCircle, Bird, Loader2 } from 'lucide-react';

const Lotes = () => {
    const [lotes, setLotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mostrarForm, setMostrarForm] = useState(false);
    
    const estadoInicial = {
        nombre: '',
        tipo_ave: 'Pollo de Engorde',
        cantidad_inicial: '',
        fecha_entrada: new Date().toISOString().split('T')[0]
    };

    const [nuevoLote, setNuevoLote] = useState(estadoInicial);

    const cargarLotes = async () => {
        try {
            setLoading(true);
            const res = await clienteAxios.get('/lotes');
            setLotes(res.data);
        } catch (error) {
            console.error("Error cargando lotes", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { cargarLotes(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await clienteAxios.post('/lotes', nuevoLote);
            setMostrarForm(false);
            setNuevoLote(estadoInicial); // Limpiamos el formulario
            cargarLotes(); 
            alert("Lote registrado con éxito");
        } catch (error) {
            console.error(error);
            alert("Error al registrar el lote");
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black text-neutral-900 uppercase tracking-tighter">Gestión de Lotes</h1>
                    <p className="text-neutral-400 font-bold text-xs uppercase tracking-widest mt-1">Inventario actual de parvadas</p>
                </div>
                <button 
                    onClick={() => setMostrarForm(!mostrarForm)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-sm ${
                        mostrarForm ? 'bg-neutral-200 text-neutral-600' : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-emerald-200'
                    }`}
                >
                    {mostrarForm ? 'Cancelar' : <><PlusCircle size={18} /> Nuevo Lote</>}
                </button>
            </div>

            {mostrarForm && (
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-200 mb-8 grid grid-cols-1 md:grid-cols-4 gap-6 items-end animate-in zoom-in-95 duration-300">
                    <div className="md:col-span-1">
                        <label className="block text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-2">Nombre del Lote</label>
                        <input 
                            type="text" 
                            required
                            value={nuevoLote.nombre}
                            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-bold text-sm"
                            placeholder="Ej: Lote Norte A1"
                            onChange={e => setNuevoLote({...nuevoLote, nombre: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-2">Tipo de Ave</label>
                        <select 
                            value={nuevoLote.tipo_ave}
                            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 outline-none font-bold text-sm"
                            onChange={e => setNuevoLote({...nuevoLote, tipo_ave: e.target.value})}
                        >
                            <option value="Pollo de Engorde">Pollo de Engorde</option>
                            <option value="Ponedora">Ponedora</option>
                            <option value="Codorniz">Codorniz</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-2">Cantidad Inicial</label>
                        <input 
                            type="number" 
                            required
                            value={nuevoLote.cantidad_inicial}
                            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 outline-none font-bold text-sm"
                            placeholder="0"
                            onChange={e => setNuevoLote({...nuevoLote, cantidad_inicial: e.target.value})}
                        />
                    </div>
                    <button type="submit" className="bg-neutral-900 text-white p-3 rounded-xl font-bold hover:bg-black transition-all shadow-lg shadow-neutral-200 uppercase text-xs tracking-widest">
                        Guardar Registro
                    </button>
                </form>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
                {loading ? (
                    <div className="p-20 flex flex-col items-center justify-center text-neutral-400">
                        <Loader2 className="animate-spin mb-4" size={40} />
                        <p className="font-bold uppercase text-xs tracking-widest">Sincronizando Galpones...</p>
                    </div>
                ) : lotes.length > 0 ? (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-neutral-50/50 border-b border-neutral-100">
                                <th className="p-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Identificador</th>
                                <th className="p-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Categoría</th>
                                <th className="p-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest text-right">Población</th>
                                <th className="p-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest text-right">Fecha Ingreso</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lotes.map(lote => (
                                <tr key={lote.id} className="border-b border-neutral-50 hover:bg-emerald-50/30 transition-colors group">
                                    <td className="p-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center">
                                                <Bird size={16} />
                                            </div>
                                            <span className="font-bold text-neutral-800 uppercase text-sm tracking-tight">{lote.nombre}</span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className="px-3 py-1 bg-neutral-100 text-neutral-500 rounded-full text-[10px] font-black uppercase tracking-tighter">
                                            {lote.tipo_ave}
                                        </span>
                                    </td>
                                    <td className="p-6 text-right font-black text-neutral-700">
                                        {Number(lote.cantidad_inicial).toLocaleString()}
                                    </td>
                                    <td className="p-6 text-right text-neutral-400 font-bold text-xs uppercase">
                                        {new Date(lote.fecha_entrada).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="p-20 text-center">
                        <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-neutral-100">
                            <Bird className="text-neutral-300" size={30} />
                        </div>
                        <p className="text-neutral-500 font-bold uppercase text-xs tracking-widest">No hay lotes registrados actualmente</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Lotes;