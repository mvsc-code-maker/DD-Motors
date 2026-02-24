'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_LINK } from '@/data/estoque';

export default function FloatingWhatsApp() {
  return (
    <a 
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center shadow-2xl hover:bg-emerald-600 hover:scale-110 transition-all z-50 text-white"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}
