"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Função para abrir/fechar o menu mobile
  const toggleMenu = () => setIsOpen(!isOpen);
  
  // Função para fechar o menu mobile ao clicar em um link
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-black text-white sticky top-0 z-50 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo da Loja */}
          <div className="flex-shrink-0">
            <Link href="/" onClick={closeMenu} className="text-2xl font-bold tracking-tighter">
              DD <span className="text-zinc-400">MOTORS</span>
            </Link>
          </div>

          {/* Menu para PC/Desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/" className="hover:text-zinc-400 px-3 py-2 text-sm font-medium uppercase tracking-wider transition-colors">Home</Link>
              <Link href="/estoque" className="hover:text-zinc-400 px-3 py-2 text-sm font-medium uppercase tracking-wider transition-colors">Estoque</Link>
              <Link href="/#sobre" className="hover:text-zinc-400 px-3 py-2 text-sm font-medium uppercase tracking-wider transition-colors">Sobre Nós</Link>
              <Link href="/#avaliacoes" className="hover:text-zinc-400 px-3 py-2 text-sm font-medium uppercase tracking-wider transition-colors">Avaliações</Link>
            </div>
          </div>

          {/* Botão do Menu Hambúrguer (Mobile) */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menu principal</span>
              {isOpen ? (
                <X className="block h-7 w-7" aria-hidden="true" />
              ) : (
                <Menu className="block h-7 w-7" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Painel do Menu Mobile Aberto */}
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
            <Link 
              href="/#sobre" 
              onClick={closeMenu}
              className="block px-3 py-4 text-base font-medium text-white hover:bg-zinc-800 border-b border-zinc-800 uppercase tracking-wider"
            >
              Sobre Nós
            </Link>
            <Link 
              href="/#avaliacoes" 
              onClick={closeMenu}
              className="block px-3 py-4 text-base font-medium text-white hover:bg-zinc-800 uppercase tracking-wider"
            >
              Avaliações
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
