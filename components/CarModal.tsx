'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, MessageCircle, Calendar, Gauge, Fuel, Palette, ShieldCheck, 
  ChevronLeft, ChevronRight, Maximize2, Calculator
} from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/data/estoque';

// IMPORTAÇÕES DO FIREBASE (Descomente quando for ligar o banco de dados)
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import { db } from '@/lib/firebase'; // Ajuste para o caminho do seu arquivo de configuração do Firebase

interface CarModalProps {
  car: any;
  onClose: () => void;
}

export default function CarModal({ car, onClose }: CarModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // ESTADOS DO FORMULÁRIO (Para enviar ao Firebase)
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ESTADOS DO SIMULADOR
  const [entradaPerc, setEntradaPerc] = useState(30);
  const [parcelas, setParcelas] = useState(48);
  const taxaJurosMensal = 0.0149;

  useEffect(() => {
    if (car) {
      setCurrentIndex(0);
      setIsFullscreen(false);
      setEntradaPerc(30);
      setParcelas(48);
      setNome('');
      setCpf('');
      setWhatsapp('');
    }
  }, [car]);

  const { precoCarro, valorEntrada, valorFinanciado, valorParcela } = useMemo(() => {
    if (!car) return { precoCarro: 0, valorEntrada: 0, valorFinanciado: 0, valorParcela: 0 };
    const preco = Number(car.preco.replace(/[^0-9]/g, ''));
    const entrada = (preco * entradaPerc) / 100;
    const financiado = preco - entrada;
    let parcela = 0;
    if (financiado > 0) {
      parcela = (financiado * taxaJurosMensal) / (1 - Math.pow(1 + taxaJurosMensal, -parcelas));
    }
    return { precoCarro: preco, valorEntrada: entrada, valorFinanciado: financiado, valorParcela: parcela };
  }, [car, entradaPerc, parcelas]);

  const formatadorBR = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

  if (!car) return null;

  const imagens = car.galeria && car.galeria.length > 0 ? car.galeria : [car.imagem];
  const temMaisDeUmaFoto = imagens.length > 1;

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % imagens.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + imagens.length) % imagens.length);
  };

  const handleDragEnd = (e: any, { offset }: any) => {
    const limiarDeArrasto = 50;
    if (offset.x < -limiarDeArrasto) nextImage();
    else if (offset.x > limiarDeArrasto) prevImage();
  };

  // FUNÇÃO QUE SALVA NO BANCO DE DADOS
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      /* CÓDIGO DO FIREBASE (Descomente para funcionar de verdade)
      await addDoc(collection(db, 'leads_financiamento'), {
        nome: nome,
        cpf: cpf,
        whatsapp: whatsapp,
        carro_id: car.id,
        carro_modelo: `${car.marca} ${car.modelo}`,
        simulacao: {
          entrada_percentual: entradaPerc,
          valor_entrada: valorEntrada,
          parcelas: parcelas,
          valor_parcela: valorParcela
        },
        status: 'Novo Lead',
        data_criacao: serverTimestamp()
      });
      */

      // Simulação visual de carregamento
      setTimeout(() => {
        alert('Dados enviados com sucesso! Nosso consultor entrará em contato para a aprovação.');
        setIsSubmitting(false);
        onClose();
      }, 1000);

    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert('Ocorreu um erro. Tente novamente.');
      setIsSubmitting(false);
    }
  };

  const msgWhatsApp = `Olá! Sou um cliente VIP e tenho interesse no ${car.marca} ${car.modelo}. Fiz uma simulação com entrada de ${formatadorBR.format(valorEntrada)} e vi as parcelas em ${parcelas}x de ${formatadorBR.format(valorParcela)}. Gostaria de seguir com a pré-aprovação.`;

  return (
    <>
      <AnimatePresence>
        {isFullscreen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black flex items-center justify-center touch-none">
            <button onClick={() => setIsFullscreen(false)} className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/10 flex items-center justify-center rounded-full hover:bg-white/20 text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
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
            <button onClick={onClose} className="absolute top-6 right-6 z-50 w-12 h-12 bg-black/5 backdrop-blur-md flex items-center justify-center rounded-full hover:bg-black hover:text-white transition-all duration-300">
              <X className="w-5 h-5" />
            </button>

            {/* LADO ESQUERDO: GALERIA */}
            <div className="w-full lg:w-3/5 bg-zinc-950 flex flex-col relative h-[45vh] lg:h-auto overflow-hidden group">
              <div className="relative flex-1 w-full h-full flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentIndex} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3, ease: "easeOut" }}
                    src={imagens[currentIndex]} alt={car.modelo} onClick={() => setIsFullscreen(true)}
                    className="absolute inset-0 w-full h-full object-cover cursor-pointer touch-pan-y"
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
            
            {/* LADO DIREITO: INFORMAÇÕES E SIMULADOR */}
            <div className="w-full lg:w-2/5 p-8 sm:p-10 lg:p-12 flex flex-col bg-white overflow-y-auto max-h-[55vh] lg:max-h-none custom-scrollbar">
              
              {/* HEADER DO CARRO */}
              <div className="mb-6 border-b border-zinc-100 pb-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-bold bg-zinc-100 text-zinc-800 px-3 py-1 uppercase tracking-widest rounded-sm">{car.marca}</span>
                  {car.badge && <span className="text-xs font-bold bg-black text-white px-3 py-1 uppercase tracking-widest rounded-sm">{car.badge}</span>}
                </div>
                <h3 className="text-4xl font-extrabold text-black mb-2 tracking-tight">{car.modelo}</h3>
                <p className="text-3xl font-light text-zinc-500">{car.preco}</p>
              </div>

              {/* ESPECIFICAÇÕES (GRID) */}
              <div className="grid grid-cols-2 gap-6 mb-8 border-b border-zinc-100 pb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-900"><Calendar className="w-5 h-5" /></div>
                  <div><p className="text-xs text-zinc-400 uppercase tracking-widest">Ano</p><p className="font-semibold text-zinc-900">{car.ano}</p></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-900"><Gauge className="w-5 h-5" /></div>
                  <div><p className="text-xs text-zinc-400 uppercase tracking-widest">Km</p><p className="font-semibold text-zinc-900">{car.km}</p></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-900"><Fuel className="w-5 h-5" /></div>
                  <div><p className="text-xs text-zinc-400 uppercase tracking-widest">Combustível</p><p className="font-semibold text-zinc-900">{car.combustivel}</p></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-900"><Palette className="w-5 h-5" /></div>
                  <div><p className="text-xs text-zinc-400 uppercase tracking-widest">Cor</p><p className="font-semibold text-zinc-900">{car.cor}</p></div>
                </div>
              </div>

              {/* VISÃO GERAL (LEGENDA DO CARRO) */}
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

              {/* SIMULADOR DE FINANCIAMENTO (NOVO DESIGN PREMIUM NO FINAL) */}
              <div className="mt-auto bg-zinc-50/80 p-6 sm:p-8 rounded-2xl border border-zinc-200">
                <h4 className="flex items-center gap-2 font-bold text-black mb-6">
                  <Calculator className="w-5 h-5" /> Simulação de Financiamento
                </h4>
                
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-zinc-500 font-medium">Entrada ({entradaPerc}%)</span>
                    <span className="font-bold text-black">{formatadorBR.format(valorEntrada)}</span>
                  </div>
                  <input 
                    type="range" min="0" max="90" step="5" value={entradaPerc}
                    onChange={(e) => setEntradaPerc(Number(e.target.value))}
                    className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-black"
                  />
                </div>

                {/* BOTÕES DE PARCELAS ESTILO APPLE (SEGMENTED CONTROL) */}
                <div className="mb-6">
                  <span className="text-sm text-zinc-500 font-medium block mb-3">Prazo (meses)</span>
                  <div className="flex gap-1.5 bg-zinc-200/50 p-1.5 rounded-xl">
                    {[12, 24, 36, 48, 60].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setParcelas(num)}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${
                          parcelas === num 
                            ? 'bg-white text-black shadow-sm scale-100' 
                            : 'text-zinc-500 hover:text-black hover:bg-zinc-200/50 scale-95'
                        }`}
                      >
                        {num}x
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-black text-white p-5 rounded-xl flex items-center justify-between mb-8 shadow-lg shadow-black/10">
                  <div>
                    <p className="text-xs text-zinc-400 uppercase tracking-widest mb-1">Valor da Parcela</p>
                    <p className="text-3xl font-bold">{formatadorBR.format(valorParcela)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-zinc-400">Taxa est. 1,49% a.m.</p>
                  </div>
                </div>
                
                {/* FORMULÁRIO DE CAPTAÇÃO (ENVIA PARA O FIREBASE) */}
                <form onSubmit={handleLeadSubmit} className="space-y-3">
                  <h4 className="font-bold text-black mb-3 text-sm uppercase tracking-widest border-t border-zinc-200 pt-6">Solicitar Pré-Aprovação</h4>
                  <input 
                    type="text" placeholder="Nome Completo" required 
                    value={nome} onChange={(e) => setNome(e.target.value)}
                    className="w-full px-4 py-3.5 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all" 
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="tel" placeholder="CPF" required 
                      value={cpf} onChange={(e) => setCpf(e.target.value)}
                      className="w-full px-4 py-3.5 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all" 
                    />
                    <input 
                      type="tel" placeholder="WhatsApp" required 
                      value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full px-4 py-3.5 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all" 
                    />
                  </div>
                  
                  <button 
                    type="submit" disabled={isSubmitting}
                    className="w-full bg-black text-white font-bold text-sm uppercase tracking-widest py-4 rounded-lg hover:bg-zinc-800 transition-colors disabled:opacity-70 mt-2 shadow-lg shadow-black/20"
                  >
                    {isSubmitting ? 'Processando...' : 'Analisar Crédito Agora'}
                  </button>
                </form>

                <div className="mt-4 flex items-center justify-center">
                  <span className="text-xs text-zinc-400 uppercase tracking-widest">Ou</span>
                </div>

                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msgWhatsApp)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 mt-4 border-2 border-zinc-200 text-black font-bold text-sm uppercase tracking-widest py-3.5 rounded-lg hover:bg-white hover:border-black transition-all"
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
