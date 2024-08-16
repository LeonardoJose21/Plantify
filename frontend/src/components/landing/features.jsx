import React from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';

export default function Caracteristicas() {
  return (
    <section id="features" className="flex flex-col p-10 items-center justify-center bg-slate-900 text-white text-center h-screen">
      <h2 className="text-3xl font-bold mb-4">Características Principales</h2>
      <ul className="list-none space-y-4 md:w-1/2 rounded p-3 text-left">
        <li className="flex items-center space-x-2 animate-fade-in-out" style={{ animationDelay: '0s' }}>
          <CheckIcon className="w-6 h-6 text-green-400" />
          <span>Interfaz fácil de usar, sin necesidad de conocimientos técnicos.</span>
        </li>
        <li className="flex items-center space-x-2 animate-fade-in-out" style={{ animationDelay: '0.2s' }}>
          <CheckIcon className="w-6 h-6 text-green-400" />
          <span>Plantillas personalizables para adaptarse a cualquier negocio.</span>
        </li>
        <li className="flex items-center space-x-2 animate-fade-in-out" style={{ animationDelay: '0.4s' }}>
          <CheckIcon className="w-6 h-6 text-green-400" />
          <span>Descarga inmediata y sin complicaciones.</span>
        </li>
        <li className="flex items-center space-x-2 animate-fade-in-out" style={{ animationDelay: '0.6s' }}>
          <CheckIcon className="w-6 h-6 text-green-400" />
          <span>Interfaz intuitiva y fácil de usar.</span>
        </li>
        <li className="flex items-center space-x-2 animate-fade-in-out" style={{ animationDelay: '0.8s' }}>
          <CheckIcon className="w-6 h-6 text-green-400" />
          <span>Ahorro de tiempo y dinero en la creación de inventarios en excel.</span>
        </li>
      </ul>
    </section>
  );
}
