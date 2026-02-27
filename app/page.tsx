'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, ShieldCheck, ThumbsUp, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { estoqueCarros, avaliacoes } from '@/data/estoque';
import CarCard from '@/components/CarCard';
import CarModal from '@/components/CarModal';

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [selectedCar, setSelectedCar] = useState<typeof estoqueCarros[0] | null>(null);

  const heroCars = estoqueCarros.slice(0, 3);
  const carrosDestaque = estoqueCarros.slice(0, 3);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroCars.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroCars.length]);

  return (
    <>
      {/* HERO SECTION */}
      <section id="home" className="relative h-[85vh] min-h-[600px] bg-black overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={heroIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img 
              src={heroCars[heroIndex]?.imagem} 
              alt={heroCars[heroIndex]?.modelo}
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tighter">
              O SEU PRÓXIMO <br/><span className="text-zinc-400">CARRO DOS SONHOS</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-zinc-300 mb-8 max-w-2xl font-light">
              Loja de veículos importados e nacionais referência em Guarulhos! Transparência, Excelência e atendimento personalizado!
            </p>
            <Link 
              href="/estoque"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-widest hover:bg-zinc-200 transition-colors"
            >
              Ver Estoque Completo
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CARROS EM DESTAQUE */}
      <section className="py-20 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center md:text-left mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">VEÍCULOS EM DESTAQUE</h2>
            <p className="text-zinc-500 mt-2">Nossa seleção premium para você.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {carrosDestaque.map((carro) => (
              <CarCard key={carro.id} car={carro} onClick={setSelectedCar} />
            ))}
          </div>

          <div className="text-center">
            <Link 
              href="/estoque"
              className="inline-flex items-center justify-center px-10 py-4 bg-black text-white font-bold text-sm uppercase tracking-widest hover:bg-zinc-800 transition-colors shadow-lg"
            >
              Ver Todo o Estoque
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT US */}
      <section id="sobre" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6 tracking-tight">EXCELÊNCIA EM CADA DETALHE.</h2>
              <p className="text-base sm:text-lg text-zinc-600 mb-8 leading-relaxed">
                A DD Motors nasceu com o propósito de redefinir a experiência de compra de veículos premium em Guarulhos. Nossa curadoria rigorosa garante que cada carro em nosso estoque atenda aos mais altos padrões de qualidade.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-black flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-black mb-2">Procedência Garantida</h4>
                    <p className="text-sm sm:text-base text-zinc-600">Todos os veículos passam por um rigoroso laudo cautelar aprovado.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-black flex items-center justify-center shrink-0">
                    <ThumbsUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-black mb-2">Atendimento Personalizado</h4>
                    <p className="text-sm sm:text-base text-zinc-600">Consultoria completa do primeiro contato até o pós-venda.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative mt-8 lg:mt-0">
              <div className="aspect-square bg-zinc-100 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&q=80" 
                  alt="Showroom DD Motors"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 bg-black p-6 sm:p-8 hidden sm:block">
                <p className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">+10</p>
                <p className="text-xs sm:text-sm text-zinc-400 uppercase tracking-widest">Anos de Mercado</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS (ATUALIZADO COM LINKS DO GOOGLE) */}
      <section id="avaliacoes" className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">O QUE DIZEM NOSSOS CLIENTES</h2>
            <p className="text-zinc-400 text-sm sm:text-base">A satisfação de quem já realizou um sonho conosco.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {avaliacoes.map((av, i) => (
              <a 
                key={i} 
                href={av.link || '#'} // Usa o link do estoque.ts ou previne erro
                target="_blank" 
                rel="noopener noreferrer"
                className="block bg-zinc-900 p-6 sm:p-8 border border-zinc-800 hover:border-zinc-500 hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-500 text-yellow-500" />)}
                  </div>
                  <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100" />
                </div>
                
                <p className="text-zinc-300 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base italic">&quot;{av.texto}&quot;</p>
                
                <div className="flex items-center justify-between border-t border-zinc-800 pt-4 mt-auto">
                  <p className="font-bold uppercase tracking-wider text-xs sm:text-sm">{av.nome}</p>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold group-hover:text-blue-400 transition-colors">
                    Ver no Google
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <CarModal car={selectedCar} onClose={() => setSelectedCar(null)} />
    </>
  );
}
