'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, MessageCircle, Calendar, Gauge, Fuel, Palette, ShieldCheck, 
  ChevronLeft, ChevronRight, Maximize2 
} from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/data/estoque';

interface CarModalProps {
  car: any;
  onClose: () => void;
}

export default function CarModal({ car, onClose }: CarModalProps) {
  // Controle de qual foto está aparecendo (pelo número/índice)
  const [currentIndex, setCurrentIndex] = useState(0);
  // Controle do modo tela cheia
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Reseta o estado sempre que um carro novo for aberto
  useEffect(() => {
    if (car) {
      setCurrentIndex(0);
      setIsFullscreen(false);
    }
  }, [car]);

  if (!car) return null;

  // Garante que temos uma lista de imagens, mesmo que o carro só tenha a imagem principal
  const imagens = car.galeria && car.galeria.length > 0 ? car.galeria : [car.imagem];
  const temMaisDeUmaFoto = imagens.length > 1;

  // Funções de navegação
  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation(); // Evita que clicar na seta abra a tela cheia
    setCurrentIndex((prev) => (prev + 1) % imagens.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + imagens.length) % imagens.length);
  };

  // Função que detecta o gesto de arrastar no celular
  const handleDragEnd = (e: any, { offset }: any) => {
    const limiarDeArrasto = 50; // Quantos pixels o usuário precisa arrastar para trocar a foto
    if (offset.x < -limiarDeArrasto) {
      nextImage(); // Arrastou para a esquerda (próxima)
    } else if (offset.x > limiarDeArrasto) {
      prevImage(); // Arrastou para a direita (anterior)
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Solicitação VIP enviada. Um consultor entrará em contato em breve.');
    onClose();
  };

  return (
    <>
      {/* ---------------- MODO TELA CHEIA (LIGHTBOX) ---------------- */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black flex items-center justify-center touch-none"
          >
            <button 
              onClick={() => setIsFullscreen(false)}
              className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/10 flex items-center justify-center rounded-full hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {temMaisDeUmaFoto && (
              <>
                <button onClick={prevImage} className="absolute left-4 z-50 p-3 text-white/50 hover:text-white bg-black/50 rounded-full hidden sm:block">
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button onClick={nextImage} className="absolute right-4 z-50 p-3 text-white/50 hover:text-white bg-black/50 rounded-full hidden sm:block">
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            <motion.img 
              key={`full-${currentIndex}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={imagens[currentIndex]} 
              alt={car.modelo}
              className="w-full h-auto max-h-[90vh] object-contain cursor-grab active:cursor-grabbing"
              drag={temMaisDeUmaFoto ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
            />

            {/* Indicadores de bolinhas na tela cheia */}
            {temMaisDeUmaFoto && (
              <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
                {imagens.map((_, idx) => (
                  <div key={idx} className={`h-2 rounded-full transition-all ${idx === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'}`} />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------- MODAL PRINCIPAL ---------------- */}
      <AnimatePresence>
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="relative bg-white w-full h-full sm:h-auto sm:max-h-[90vh] max-w-7xl sm:rounded-2xl overflow-hidden flex flex-col lg:flex-row shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-50 w-12 h-12 bg-black/5 backdrop-blur-md flex items-center justify-center rounded-full hover:bg-black hover:text-white transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </button>

            {/* LADO ESQUERDO: GALERIA ARRASTÁVEL */}
            <div className="w-full lg:w-3/5 bg-zinc-950 flex flex-col relative h-[45vh] lg:h-auto overflow-hidden group">
              
              <div className="relative flex-1 w-full h-full flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    src={imagens[currentIndex]} 
                    alt={car.modelo}
                    // O clique abre a tela cheia, e o drag permite arrastar no celular
                    onClick={() => setIsFullscreen(true)}
                    className="absolute inset-0 w-full h-full object-cover cursor-pointer touch-pan-y"
                    drag={temMaisDeUmaFoto ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={handleDragEnd}
                  />
                </AnimatePresence>

                {/* Ícone de Expandir */}
                <div 
                  className="absolute top-6 left-6 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Maximize2 className="w-4 h-4" />
                </div>
                
                {/* Setas de navegação (Aparecem no hover para Desktop) */}
                {temMaisDeUmaFoto && (
                  <>
                    <button 
                      onClick={prevImage} 
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={nextImage} 
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
              </div>
              
              {/* Miniaturas Flutuantes */}
              {temMaisDeUmaFoto && (
                <div className="absolute bottom-6 left-0 right-0 px-8 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {imagens.map((foto: string, index: number) => (
                    <button 
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentIndex(index);
                      }}
                      className={`relative w-20 h-14 sm:w-28 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden transition-all duration-300 ${
                        currentIndex === index 
                          ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-105' 
                          : 'opacity-50 hover:opacity-100 hover:scale-100 cursor-pointer'
                      }`}
                    >
                      <img src={foto} alt={`Miniatura ${index}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* LADO DIREITO: INFORMAÇÕES VIP (Restante do código igual) */}
            <div className="w-full lg:w-2/5 p-8 sm:p-10 lg:p-12 flex flex-col bg-white overflow-y-auto max-h-[55vh] lg:max-h-none custom-scrollbar">
              <div className="mb-8 border-b border-zinc-100 pb-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-bold bg-zinc-100 text-zinc-800 px-3 py-1 uppercase tracking-widest rounded-sm">
                    {car.marca}
                  </span>
                  {car.badge && (
                    <span className="text-xs font-bold bg-black text-white px-3 py-1 uppercase tracking-widest rounded-sm">
                      {car.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-4xl font-extrabold text-black mb-2 tracking-tight">{car.modelo}</h3>
                <p className="text-3xl font-light text-zinc-500">{car.preco}</p>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-900">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 uppercase tracking-widest">Ano</p>
                    <p className="font-semibold text-zinc-900">{car.ano}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-900">
                    <Gauge className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 uppercase tracking-widest">Quilometragem</p>
                    <p className="font-semibold text-zinc-900">{car.km} km</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-900">
                    <Fuel className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 uppercase tracking-widest">Combustível</p>
                    <p className="font-semibold text-zinc-900">{car.combustivel}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-900">
                    <Palette className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 uppercase tracking-widest">Cor Externa</p>
                    <p className="font-semibold text-zinc-900">{car.cor}</p>
                  </div>
                </div>
              </div>

              {car.descricaoCompleta && (
                <div className="mb-10">
                  <h4 className="flex items-center gap-2 font-bold text-black mb-4">
                    <ShieldCheck className="w-5 h-5" /> Visão Geral
                  </h4>
                  <p className="text-zinc-600 leading-relaxed text-sm">
                    {car.descricaoCompleta}
                  </p>
                </div>
              )}

              <div className="mt-auto space-y-4 pt-6 border-t border-zinc-100">
                <h4 className="font-bold text-black mb-4">Agendar Visita</h4>
                
                <form onSubmit={handleLeadSubmit} className="grid grid-cols-2 gap-3 mb-4">
                  <input 
                    type="text" 
                    placeholder="Seu Nome" 
                    required
                    className="col-span-2 sm:col-span-1 px-4 py-3 bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  />
                  <input 
                    type="tel" 
                    placeholder="Seu Telefone" 
                    required
                    className="col-span-2 sm:col-span-1 px-4 py-3 bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  />
                  <button 
                    type="submit"
                    className="col-span-2 bg-black text-white font-bold text-sm uppercase tracking-widest py-4 hover:bg-zinc-800 transition-colors"
                  >
                    Solicitar Contato
                  </button>
                </form>

                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Sou um cliente VIP e tenho interesse no ${car.marca} ${car.modelo} (${car.ano}) anunciado por ${car.preco}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 border border-zinc-200 text-black font-bold text-sm uppercase tracking-widest py-4 hover:bg-zinc-50 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" /> Falar com Consultor Agora
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    </>
  );
}
