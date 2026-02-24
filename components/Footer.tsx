'use client';

import React from 'react';
import { Car, MapPin, Phone, Mail, ChevronRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contato" className="bg-zinc-950 text-white pt-20 pb-10 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Car className="w-6 h-6 text-white" />
              <span className="text-xl font-bold tracking-tighter">DD MOTORS</span>
            </div>
            <p className="text-zinc-400 mb-6 max-w-sm">
              Veículos importados e nacionais referência em Guarulhos. Transparência e excelência.
            </p>
            <a 
              href="https://g.page/r/ddmotors" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:text-zinc-300 transition-colors"
            >
              Avalie-nos no Google <ChevronRight className="w-4 h-4" />
            </a>
          </div>
          
          <div className="lg:col-span-1">
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-zinc-500">Contato</h4>
            <ul className="space-y-4 text-zinc-300">
              <li>
                <a 
                  href="https://maps.google.com/?q=Av.+Avelino+Alves+Machado,+48+-+Jardim+Pinhal,+Guarulhos+-+SP,+07120-000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-white transition-colors group"
                >
                  <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-zinc-500 group-hover:text-white transition-colors" />
                  <span>Av. Avelino Alves Machado, 48<br/>Jardim Pinhal, Guarulhos - SP<br/>07120-000</span>
                </a>
              </li>
              <li>
                <a href="tel:+5511986848481" className="flex items-center gap-3 hover:text-white transition-colors group">
                  <Phone className="w-5 h-5 shrink-0 text-zinc-500 group-hover:text-white transition-colors" />
                  <span>(11) 98684-8481</span>
                </a>
              </li>
              <li>
                <a href="mailto:dk.adm@outlook.com" className="flex items-center gap-3 hover:text-white transition-colors group">
                  <Mail className="w-5 h-5 shrink-0 text-zinc-500 group-hover:text-white transition-colors" />
                  <span>dk.adm@outlook.com</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-zinc-500">Horário</h4>
            <ul className="space-y-2 text-zinc-300">
              <li className="flex justify-between">
                <span>Segunda a Sexta</span>
                <span>09:00 - 18:00</span>
              </li>
              <li className="flex justify-between">
                <span>Sábado</span>
                <span>09:00 - 14:00</span>
              </li>
              <li className="flex justify-between text-zinc-500">
                <span>Domingo</span>
                <span>Fechado</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-zinc-500">Localização</h4>
            <div className="w-full h-48 bg-zinc-800 rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.888785190938!2d-46.5367156!3d-23.4645224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cef55a00000000%3A0x0!2sAv.%20Avelino%20Alves%20Machado%2C%2048%20-%20Jardim%20Pinhal%2C%20Guarulhos%20-%20SP%2C%2007120-000!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de Localização DD Motors"
              ></iframe>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-zinc-900 text-center text-zinc-600 text-sm">
          <p>&copy; {new Date().getFullYear()} DD Motors. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
