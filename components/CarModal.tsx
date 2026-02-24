'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/data/estoque';

interface CarModalProps {
  car: any;
  onClose: () => void;
}

export default function CarModal({ car, onClose }: CarModalProps) {
  if (!car) return null;

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Contato enviado com sucesso! Ligaremos em 5 minutos.');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row shadow-2xl"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/50 backdrop-blur-md flex items-center justify-center rounded-full hover:bg-white transition-colors"
          >
            <X className="w-5 h-5 text-black" />
          </button>

          <div className="w-full md:w-1/2 bg-zinc-100 relative">
            <img 
              src={car.imagem} 
              alt={car.modelo}
              className="w-full h-full object-cover min-h-[300px]"
            />
          </div>
          
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
            <div className="mb-8">
              <p className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-2">{car.marca}</p>
              <h3 className="text-3xl font-bold text-black mb-4">{car.modelo}</h3>
              <p className="text-3xl font-light text-black">{car.preco}</p>
            </div>

            <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-10">
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Ano</p>
                <p className="font-medium">{car.ano}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Quilometragem</p>
                <p className="font-medium">{car.km} km</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Combustível</p>
                <p className="font-medium">{car.combustivel}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Cor</p>
                <p className="font-medium">{car.cor}</p>
              </div>
            </div>

            <div className="mt-auto space-y-6">
              <div className="bg-zinc-50 p-6 border border-zinc-200">
                <h4 className="font-bold text-black mb-2">Interesse rápido</h4>
                <p className="text-sm text-zinc-600 mb-4">Deixe seu contato que ligamos em 5 minutos.</p>
                <form onSubmit={handleLeadSubmit} className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="Seu Nome" 
                    required
                    className="w-full px-4 py-3 bg-white border border-zinc-300 text-sm focus:outline-none focus:border-black"
                  />
                  <input 
                    type="tel" 
                    placeholder="Seu Telefone" 
                    required
                    className="w-full px-4 py-3 bg-white border border-zinc-300 text-sm focus:outline-none focus:border-black"
                  />
                  <button 
                    type="submit"
                    className="w-full bg-black text-white font-bold text-sm uppercase tracking-widest py-4 hover:bg-zinc-800 transition-colors"
                  >
                    Enviar
                  </button>
                </form>
              </div>

              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Tenho interesse no ${car.marca} ${car.modelo} (${car.ano}) anunciado por ${car.preco}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white font-bold text-sm uppercase tracking-widest py-4 hover:bg-emerald-600 transition-colors"
              >
                <MessageCircle className="w-5 h-5" /> Negociar via WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
