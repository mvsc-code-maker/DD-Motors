"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Função que sequestra o clique e força o deslizamento na mesma página
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    closeMenu();

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
    <nav className="bg-black text-white sticky top-0 z-50 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" onClick={closeMenu} className="text-2xl font-bold tracking-tighter">
              DD <span className="text-zinc-400">MOTORS</span>
            </Link>
          </div>

          {/* Menu para PC/Desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link 
                href="/" 
                className="hover:text-zinc-400 px-3 py-2 text-sm font-medium uppercase tracking-wider transition-colors"
              >
                Home
              </Link>
              
              <Link 
                href="/estoque" 
                className="hover:text-zinc-400 px-3 py-2 text-sm font-medium uppercase tracking-wider transition-colors"
              >
                Estoque
              </Link>
              
              {/* Botões usando a rolagem inteligente */}
              <a 
                href="#sobre" 
                onClick={(e) => handleScroll(e, 'sobre')} 
                className="hover:text-zinc-400 px-3 py-2 text-sm font-medium uppercase tracking-wider transition-colors cursor-pointer"
              >
                Sobre Nós
              </a>
              
              <a 
                href="#avaliacoes" 
                onClick={(e) => handleScroll(e, 'avaliacoes')} 
                className="hover:text-zinc-400 px-3 py-2 text-sm font-medium uppercase tracking-wider transition-colors cursor-pointer"
              >
                Avaliações
              </a>
            </div>
          </div>

          {/* Botão Mobile (Hambúrguer) */}
          <div className="-mr-2 flex md:hidden">
            <button 
              onClick={toggleMenu} 
              type="button" 
              className="inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none cursor-pointer"
            >
              {isOpen ? <X className="block h-7 w-7" /> : <Menu className="block h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile Dropdown Aberto */}
      {isOpen && (
        <div className="md:hidden bg-zinc-900 border-b border-zinc-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              href="/" 
              onClick={closeMenu} 
              className="block px-3 py-4 text-base font-medium text-white hover:bg-zinc-800 border-b border-zinc-800 uppercase tracking-wider"
            >
              Home
            </Link>
            
            <Link 
              href="/estoque" 
              onClick={closeMenu} 
              className="block px-3 py-4 text-base font-medium text-white hover:bg-zinc-800 border-b border-zinc-800 uppercase tracking-wider"
            >
              Estoque
            </Link>
            
            {/* Botões usando a rolagem inteligente no Mobile */}
            <a 
              href="#sobre" 
              onClick={(e) => handleScroll(e, 'sobre')} 
              className="block px-3 py-4 text-base font-medium text-white hover:bg-zinc-800 border-b border-zinc-800 uppercase tracking-wider cursor-pointer"
            >
              Sobre Nós
            </a>
            
            <a 
              href="#avaliacoes" 
              onClick={(e) => handleScroll(e, 'avaliacoes')} 
              className="block px-3 py-4 text-base font-medium text-white hover:bg-zinc-800 uppercase tracking-wider cursor-pointer"
            >
              Avaliações
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
