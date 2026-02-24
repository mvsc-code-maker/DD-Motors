'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Clock, CheckCircle, ChevronRight } from 'lucide-react';

interface CarCardProps {
  car: any;
  onClick: (car: any) => void;
}

export default function CarCard({ car, onClick }: CarCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white group cursor-pointer border border-zinc-200 hover:border-black transition-colors flex flex-col h-full"
      onClick={() => onClick(car)}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
        <img 
          src={car.imagem} 
          alt={`${car.marca} ${car.modelo}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {car.badge && (
          <div className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white ${car.badge === 'Pronta Entrega' ? 'bg-emerald-600' : 'bg-red-600'}`}>
            {car.badge}
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">{car.marca}</p>
            <h3 className="text-xl font-bold text-black">{car.modelo}</h3>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-zinc-600">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" /> {car.ano}
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> {car.km} km
          </div>
        </div>
        
        <div className="pt-4 border-t border-zinc-100 flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold text-black">{car.preco}</span>
          <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:text-black transition-colors" />
        </div>
      </div>
    </motion.div>
  );
}
