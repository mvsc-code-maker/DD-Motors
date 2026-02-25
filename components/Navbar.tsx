'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Car, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Função mágica para deslizar a tela sem recarregar
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false); // Fecha o menu no celular ao clicar

    if (pathname === '/') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(`/#${id}`);
    }
  };

  return (
    <header className="fixed top-0 w-full bg-black/95 backdrop-blur-sm z-50 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 z-50" onClick={() => setIsMenuOpen(false)}>
          <Car className="w-8 h-8 text-white" />
          <span className="text-2xl font-bold text-white tracking-tighter">DD MOTORS</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">Home</Link>
          <Link href="/estoque" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">Estoque</Link>
          {/* Trocado para <a> e usando handleScroll */}
          <a href="#sobre" onClick={(e) => handleScroll(e, 'sobre')} className="text-sm font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer">Sobre Nós</a>
          <a href="#avaliacoes" onClick={(e) => handleScroll(e, 'avaliacoes')} className="text-sm font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer">Avaliações</a>
          <a href="#contato" onClick={(e) => handleScroll(e, 'contato')} className="text-sm font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer">Contato</a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white z-50 p-2 cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center min-h-screen"
          >
            <nav className="flex flex-col items-center gap-8 w-full px-6">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-zinc-300 hover:text-white w-full text-center py-4 border-b border-zinc-800">Home</Link>
              <Link href="/estoque" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-zinc-300 hover:text-white w-full text-center py-4 border-b border-zinc-800">Estoque</Link>
              {/* Trocado para <a> e usando handleScroll no mobile também */}
              <a href="#sobre" onClick={(e) => handleScroll(e, 'sobre')} className="text-2xl font-bold text-zinc-300 hover:text-white w-full text-center py-4 border-b border-zinc-800 cursor-pointer">Sobre Nós</a>
              <a href="#avaliacoes" onClick={(e) => handleScroll(e, 'avaliacoes')} className="text-2xl font-bold text-zinc-300 hover:text-white w-full text-center py-4 border-b border-zinc-800 cursor-pointer">Avaliações</a>
              <a href="#contato" onClick={(e) => handleScroll(e, 'contato')} className="text-2xl font-bold text-zinc-300 hover:text-white w-full text-center py-4 cursor-pointer">Contato</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
