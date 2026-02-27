'use client';

import React, { useState, useMemo } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { estoqueCarros } from '@/data/estoque';
import CarCard from '@/components/CarCard';
import CarModal from '@/components/CarModal';

export default function Estoque() {
  const [selectedCar, setSelectedCar] = useState<typeof estoqueCarros[0] | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  // Filters state
  const [busca, setBusca] = useState('');
  const [filtroMarca, setFiltroMarca] = useState('');
  const [filtroCarroceria, setFiltroCarroceria] = useState('');
  const [filtroCombustivel, setFiltroCombustivel] = useState('');
  const [filtroAno, setFiltroAno] = useState('');

  // 1. FILTRAGEM DOS CARROS (Mantida a sua lógica original)
  const carrosFiltrados = useMemo(() => {
    return estoqueCarros.filter(carro => {
      if (busca) {
        const termo = busca.toLowerCase();
        const matchMarca = carro.marca.toLowerCase().includes(termo);
        const matchModelo = carro.modelo.toLowerCase().includes(termo);
        if (!matchMarca && !matchModelo) return false;
      }
      if (filtroMarca && carro.marca !== filtroMarca) return false;
      if (filtroCarroceria && carro.carroceria !== filtroCarroceria) return false;
      if (filtroCombustivel && carro.combustivel !== filtroCombustivel) return false;
      if (filtroAno && carro.ano !== filtroAno) return false;
      return true;
    });
  }, [busca, filtroMarca, filtroCarroceria, filtroCombustivel, filtroAno]);

  // 2. ATUALIZAÇÃO: OPÇÕES DINÂMICAS BASEADAS NO QUE SOBROU NA TELA
  // Agora as listas usam "carrosFiltrados" em vez de "estoqueCarros"
  const marcas = Array.from(new Set(carrosFiltrados.map(c => c.marca))).sort();
  const carrocerias = Array.from(new Set(carrosFiltrados.map(c => c.carroceria))).sort();
  const combustiveis = Array.from(new Set(carrosFiltrados.map(c => c.combustivel))).sort();
  const anos = Array.from(new Set(carrosFiltrados.map(c => c.ano))).sort().reverse();

  const clearFilters = () => {
    setBusca('');
    setFiltroMarca('');
    setFiltroCarroceria('');
    setFiltroAno('');
    setFiltroCombustivel('');
  };

  return (
    <>
      {/* HEADER PAGE */}
      <section className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">NOSSO ESTOQUE</h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">Encontre o veículo perfeito para você. Utilize os filtros abaixo para refinar sua busca.</p>
        </div>
      </section>

      {/* SEARCH & FILTERS */}
      <section className="bg-zinc-900 py-6 border-b border-zinc-800 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Search Bar & Mobile Toggle */}
          <div className="flex flex-col md:flex-row gap-4 mb-4 md:mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input 
                type="text"
                placeholder="Buscar por marca ou modelo..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full bg-black border border-zinc-800 text-white pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-zinc-500 transition-colors"
              />
            </div>
            <button 
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="md:hidden flex items-center justify-center gap-2 bg-zinc-800 text-white px-6 py-3 text-sm font-medium hover:bg-zinc-700 transition-colors"
            >
              <Filter className="w-4 h-4" /> {isFiltersOpen ? 'Ocultar Filtros' : 'Filtrar Resultados'}
            </button>
          </div>

          {/* Filters Grid */}
          <AnimatePresence>
            {(isFiltersOpen || (typeof window !== 'undefined' && window.innerWidth >= 768)) && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:block overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 pt-4 md:pt-0 border-t border-zinc-800 md:border-t-0">
                  <select 
                    value={filtroMarca} 
                    onChange={(e) => setFiltroMarca(e.target.value)}
                    className="bg-black border border-zinc-800 text-white px-4 py-3 text-sm focus:outline-none focus:border-zinc-500"
                  >
                    <option value="">Todas as Marcas</option>
                    {marcas.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  
                  <select 
                    value={filtroCarroceria} 
                    onChange={(e) => setFiltroCarroceria(e.target.value)}
                    className="bg-black border border-zinc-800 text-white px-4 py-3 text-sm focus:outline-none focus:border-zinc-500"
                  >
                    <option value="">Carroceria</option>
                    {carrocerias.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>

                  <select 
                    value={filtroAno} 
                    onChange={(e) => setFiltroAno(e.target.value)}
                    className="bg-black border border-zinc-800 text-white px-4 py-3 text-sm focus:outline-none focus:border-zinc-500"
                  >
                    <option value="">Ano</option>
                    {anos.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>

                  <select 
                    value={filtroCombustivel} 
                    onChange={(e) => setFiltroCombustivel(e.target.value)}
                    className="bg-black border border-zinc-800 text-white px-4 py-3 text-sm focus:outline-none focus:border-zinc-500"
                  >
                    <option value="">Combustível</option>
                    {combustiveis.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>

                  <button 
                    onClick={clearFilters}
                    className="col-span-1 sm:col-span-2 md:col-span-1 bg-zinc-800 text-white px-4 py-3 text-sm font-medium hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" /> Limpar Filtros
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* INVENTORY GRID */}
      <section className="py-16 md:py-20 bg-zinc-50 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 md:mb-12 gap-4">
            <h2 className="text-2xl font-bold text-black tracking-tight">VEÍCULOS DISPONÍVEIS</h2>
            <span className="text-sm font-medium text-zinc-500">{carrosFiltrados.length} veículos encontrados</span>
          </div>

          {carrosFiltrados.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-zinc-500 text-lg">Nenhum veículo encontrado com os filtros atuais.</p>
              <button 
                onClick={clearFilters}
                className="mt-4 text-black font-bold underline hover:text-zinc-600"
              >
                Limpar todos os filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {carrosFiltrados.map((carro) => (
                <CarCard key={carro.id} car={carro} onClick={setSelectedCar} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CarModal car={selectedCar} onClose={() => setSelectedCar(null)} />
    </>
  );
}
