'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, MessageCircle, Calendar, Gauge, Fuel, Palette, ShieldCheck, 
  ChevronLeft, ChevronRight, Maximize2, Calculator, AlertCircle
} from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/data/estoque';

export default function CarModal({ car, onClose }: { car: any; onClose: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [valorEntrada, setValorEntrada] = useState(0);
  const [parcelas, setParcelas] = useState(48);

  const precoCarro = car ? Number(car.preco.replace(/[^0-9]/g, '')) : 0;
  const minEntrada = precoCarro * 0.20; // 20%
  const maxEntrada = precoCarro * 0.90; // 90%

  // Verifica se a entrada digitada é menor que o mínimo exigido
  const isEntradaInvalida = valorEntrada > 0 && valorEntrada < minEntrada;

  useEffect(() => {
    if (car) {
      setCurrentIndex(0);
      setIsFullscreen(false);
      setValorEntrada(Number(car.preco.replace(/[^0-9]/g, '')) * 0.3); // Padrão 30% inicial
      setParcelas(48);
      setNome(''); setCpf(''); setWhatsapp('');
    }
  }, [car]);

  const taxaJurosMensal = useMemo(() => {
    switch (parcelas) {
      case 12: return 0.0129;
      case 24: return 0.0139;
      case 36: return 0.0149;
      case 48: return 0.0159;
      case 60: return 0.0169;
      default: return 0.0149;
    }
  }, [parcelas]);

  const { valorFinanciado, valorParcela, percentualEntrada } = useMemo(() => {
    let financiado = precoCarro - valorEntrada;
    if (financiado < 0) financiado = 0;
    
    let parcela = 0;
    // Só calcula a parcela se a entrada for válida
    if (financiado > 0 && !isEntradaInvalida) {
      parcela = (financiado * taxaJurosMensal) / (1 - Math.pow(1 + taxaJurosMensal, -parcelas));
    }
    
    const percentual = precoCarro > 0 ? Math.round((valorEntrada / precoCarro) * 100) : 30;
    return { valorFinanciado: financiado, valorParcela: parcela, percentualEntrada: percentual };
  }, [precoCarro, valorEntrada, parcelas, taxaJurosMensal, isEntradaInvalida]);

  const formatadorBR = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

  const handleEntradaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    setValorEntrada(Number(rawValue) / 100);
  };

  const handleEntradaBlur = () => {
    // Agora não forçamos mais para o mínimo, apenas travamos o máximo para não passar do valor do carro
    if (valorEntrada > maxEntrada) setValorEntrada(maxEntrada);
  };

  if (!car) return null;

  const imagens = car.galeria && car.galeria.length > 0 ? car.galeria : [car.imagem];
  const temMaisDeUmaFoto = imagens.length > 1;

  const nextImage = (e?: React.MouseEvent) => { e?.stopPropagation(); setCurrentIndex((prev) => (prev + 1) % imagens.length); };
  const prevImage = (e?: React.MouseEvent) => { e?.stopPropagation(); setCurrentIndex((prev) => (prev - 1 + imagens.length) % imagens.length); };
  const handleDragEnd = (e: any, { offset }: any) => { if (offset.x < -50) nextImage(); else if (offset.x > 50) prevImage(); };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEntradaInvalida) return; // Trava extra de segurança
    setIsSubmitting(true);
    setTimeout(() => {
      alert('Dados enviados com sucesso! Nosso consultor entrará em contato para a aprovação.');
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const msgWhatsApp = `Olá! Sou um cliente VIP e tenho interesse no ${car.marca} ${car.modelo}. Fiz uma simulação com entrada de ${formatadorBR.format(valorEntrada)} e vi as parcelas em ${parcelas}x de ${formatadorBR.format(valorParcela)}. Gostaria de seguir com a pré-aprovação.`;

  return (
    <>
      <AnimatePresence>
        {isFullscreen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black flex items-center justify-center touch-none">
            <button onClick={() => setIsFullscreen(false)} className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/10 flex items-center justify-center rounded-full hover:bg-white/20 text-white transition-colors"><X className="w-6 h-6" /></button>
            {temMaisDeUmaFoto && (
              <>
                <button onClick={prevImage} className="absolute left-4 z-50 p-3 text-white/50 hover:text-white bg-black/50 rounded-full hidden sm:block"><ChevronLeft className="w-8 h-8" /></button>
                <button onClick={nextImage} className="absolute right-4 z-50 p-3 text-white/50 hover:text-white bg-black/50 rounded-full hidden sm:block"><ChevronRight className="w-8 h-8" /></button>
              </>
            )}
            <motion.img 
              key={`full-${currentIndex}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
              src={imagens[currentIndex]} alt={car.modelo} className="w-full h-auto max-h-[90vh] object-contain cursor-grab active:cursor-grabbing"
              drag={temMaisDeUmaFoto ? "x" : false} dragConstraints={{ left: 0, right: 0 }} dragElastic={0.2} onDragEnd={handleDragEnd}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
          
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 50, scale: 0.98 }} transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="relative bg-white w-full h-full sm:h-auto sm:max-h-[90vh] max-w-7xl sm:rounded-2xl overflow-hidden flex flex-col lg:flex-row shadow-2xl"
          >
            <button onClick={onClose} className="absolute top-6 right-6 z-50 w-12 h-12 bg-black/5 backdrop-blur-md flex items-center justify-center rounded-full hover:bg-black hover:text-white transition-all duration-300"><X className="w-5 h-5" /></button>

            {/* LADO ESQUERDO */}
            <div className="w-full lg:w-3/5 bg-zinc-950 flex flex-col relative h-[45vh] lg:h-auto overflow-hidden group">
              <div className="relative flex-1 w-full h-full flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentIndex} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3, ease: "easeOut" }}
                    src={imagens[currentIndex]} alt={car.modelo} onClick={() => setIsFullscreen(true)} className="absolute inset-0 w-full h-full object-cover cursor-pointer touch-pan-y"
                    drag={temMaisDeUmaFoto ? "x" : false} dragConstraints={{ left: 0, right: 0 }} dragElastic={0.2} onDragEnd={handleDragEnd}
                  />
                </AnimatePresence>
                <div className="absolute top-6 left-6 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"><Maximize2 className="w-4 h-4" /></div>
                {temMaisDeUmaFoto && (
                  <>
                    <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"><ChevronLeft className="w-5 h-5" /></button>
                    <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"><ChevronRight className="w-5 h-5" /></button>
                  </>
                )}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
              </div>
              {temMaisDeUmaFoto && (
                <div className="absolute bottom-6 left-0 right-0 px-8 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {imagens.map((foto: string, index: number) => (
                    <button key={index} onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); }} className={`relative w-20 h-14 sm:w-28 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden transition-all duration-300 ${currentIndex === index ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-105' : 'opacity-50 hover:opacity-100 hover:scale-100 cursor-pointer'}`}>
                      <img src={foto} alt={`Miniatura ${index}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* LADO DIREITO */}
            <div className="w-full lg:w-2/5 p-8 sm:p-10 lg:p-12 flex flex-col bg-white overflow-y-auto max-h-[55vh] lg:max-h-none custom-scrollbar">
              
              <div className="mb-6 border-b border-zinc-100 pb-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-bold bg-zinc-100 text-zinc-800 px-3 py-1 uppercase tracking-widest rounded-sm">{car.marca}</span>
                  {car.badge && <span className="text-xs font-bold bg-black text-white px-3 py-1 uppercase tracking-widest rounded-sm">{car.badge}</span>}
                </div>
                <h3 className="text-4xl font-extrabold text-black mb-2 tracking-tight">{car.modelo}</h3>
                <p className="text-3xl font-light text-zinc-500">{car.preco}</p>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8 border-b border-zinc-100 pb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-900"><Calendar className="w-5 h-5" /></div>
                  <div><p className="text-xs text-zinc-400 uppercase tracking-widest">Ano</p><p className="font-semibold text-zinc-900">{car.ano}</p></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-900"><Gauge className="w-5 h-5" /></div>
                  <div><p className="text-xs text-zinc-400 uppercase tracking-widest">Km</p><p className="font-semibold text-zinc-900">{car.km}</p></div>
                </div>
              </div>

              {car.descricaoCompleta && (
                <div className="mb-10">
                  <h4 className="flex items-center gap-2 font-bold text-black mb-4"><ShieldCheck className="w-5 h-5" /> Visão Geral</h4>
                  <p className="text-zinc-600 leading-relaxed text-sm">{car.descricaoCompleta}</p>
                </div>
              )}

              {/* SIMULADOR COM BLOQUEIO DE ENTRADA */}
              <div className="mt-auto bg-zinc-50/80 p-6 sm:p-8 rounded-2xl border border-zinc-200">
                <h4 className="flex items-center gap-2 font-bold text-black mb-6"><Calculator className="w-5 h-5" /> Simulação de Financiamento</h4>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className={`font-medium ${isEntradaInvalida ? 'text-red-500' : 'text-zinc-500'}`}>
                      Entrada ({percentualEntrada}%)
                    </span>
                    
                    <input 
                      type="text" 
                      value={formatadorBR.format(valorEntrada)}
                      onChange={handleEntradaChange}
                      onBlur={handleEntradaBlur}
                      className={`text-right font-bold text-lg bg-white border rounded-lg px-3 py-1.5 w-44 focus:outline-none focus:ring-2 transition-all ${
                        isEntradaInvalida 
                          ? 'border-red-500 text-red-600 focus:ring-red-500 bg-red-50' 
                          : 'border-zinc-200 text-black focus:ring-black'
                      }`}
                    />
                  </div>
                  
                  {/* ALERTA DE ERRO DE ENTRADA */}
                  <AnimatePresence>
                    {isEntradaInvalida && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-1.5 text-xs text-red-600 mb-3 justify-end"
                      >
                        <AlertCircle className="w-3.5 h-3.5" /> Mínimo de 20% exigido ({formatadorBR.format(minEntrada)})
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <input 
                    type="range" min={0} max={maxEntrada} step={1000} value={valorEntrada} onChange={(e) => setValorEntrada(Number(e.target.value))}
                    className={`w-full h-2 rounded-lg appearance-none cursor-pointer mt-2 ${isEntradaInvalida ? 'bg-red-200 accent-red-600' : 'bg-zinc-200 accent-black'}`}
                  />
                </div>

                <div className={`mb-6 transition-opacity ${isEntradaInvalida ? 'opacity-40 pointer-events-none' : ''}`}>
                  <span className="text-sm text-zinc-500 font-medium block mb-3">Prazo (meses)</span>
                  <div className="flex gap-1.5 bg-zinc-200/50 p-1.5 rounded-xl">
                    {[12, 24, 36, 48, 60].map((num) => (
                      <button
                        key={num} type="button" onClick={() => setParcelas(num)}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${parcelas === num ? 'bg-white text-black shadow-sm scale-100' : 'text-zinc-500 hover:text-black hover:bg-zinc-200/50 scale-95'}`}
                      >
                        {num}x
                      </button>
                    ))}
                  </div>
                </div>

                <div className={`p-5 rounded-xl flex items-center justify-between mb-8 transition-colors ${isEntradaInvalida ? 'bg-zinc-200 text-zinc-500' : 'bg-black text-white shadow-lg shadow-black/10'}`}>
                  <div>
                    <p className="text-xs uppercase tracking-widest mb-1 opacity-70">Valor da Parcela</p>
                    <p className="text-3xl font-bold">{isEntradaInvalida ? '--' : formatadorBR.format(valorParcela)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] opacity-70">{isEntradaInvalida ? 'Simulação Indisponível' : `Taxa est. ${(taxaJurosMensal * 100).toFixed(2).replace('.', ',')}% a.m.`}</p>
                  </div>
                </div>
                
                <form onSubmit={handleLeadSubmit} className="space-y-3">
                  <h4 className="font-bold text-black mb-3 text-sm uppercase tracking-widest border-t border-zinc-200 pt-6">Solicitar Pré-Aprovação</h4>
                  <input type="text" placeholder="Nome Completo" disabled={isEntradaInvalida} required value={nome} onChange={(e) => setNome(e.target.value)} className="w-full px-4 py-3.5 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all disabled:opacity-50 disabled:bg-zinc-100" />
                  <div className="grid grid-cols-2 gap-3">
                    <input type="tel" placeholder="CPF" disabled={isEntradaInvalida} required value={cpf} onChange={(e) => setCpf(e.target.value)} className="w-full px-4 py-3.5 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all disabled:opacity-50 disabled:bg-zinc-100" />
                    <input type="tel" placeholder="WhatsApp" disabled={isEntradaInvalida} required value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="w-full px-4 py-3.5 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all disabled:opacity-50 disabled:bg-zinc-100" />
                  </div>
                  
                  {/* BOTÃO PRINCIPAL COM BLOQUEIO */}
                  <button 
                    type="submit" disabled={isSubmitting || isEntradaInvalida}
                    className={`w-full font-bold text-sm uppercase tracking-widest py-4 rounded-lg transition-colors mt-2 ${
                      isEntradaInvalida 
                        ? 'bg-zinc-300 text-zinc-500 cursor-not-allowed' 
                        : 'bg-black text-white hover:bg-zinc-800 shadow-lg shadow-black/20'
                    }`}
                  >
                    {isEntradaInvalida ? 'Entrada Insuficiente' : isSubmitting ? 'Processando...' : 'Analisar Crédito Agora'}
                  </button>
                </form>

                <div className="mt-4 flex items-center justify-center"><span className="text-xs text-zinc-400 uppercase tracking-widest">Ou</span></div>

                {/* BOTÃO DO WHATSAPP COM BLOQUEIO */}
                <a 
                  href={isEntradaInvalida ? '#' : `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msgWhatsApp)}`}
                  target={isEntradaInvalida ? '_self' : '_blank'} rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center gap-2 mt-4 border-2 font-bold text-sm uppercase tracking-widest py-3.5 rounded-lg transition-all ${
                    isEntradaInvalida 
                      ? 'border-zinc-200 text-zinc-400 bg-zinc-50 cursor-not-allowed pointer-events-none' 
                      : 'border-zinc-200 text-black hover:bg-white hover:border-black'
                  }`}
                >
                  <MessageCircle className="w-5 h-5" /> Simular via WhatsApp
                </a>
              </div>

            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    </>
  );
}
