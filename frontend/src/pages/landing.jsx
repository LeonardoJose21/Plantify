import React from 'react';
import AcercaDe from '../components/landing/about';
import Caracteristicas from '../components/landing/features';
import Contacto from '../components/landing/contact';

export default function LandingPage() {
  return (
    <div className="bg-white text-slate-900 min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className='flex flex-col md:flex-row items-center'>
          <div className='flex-1 p-6'>
            <section 
              id='hero' 
              className="flex flex-col justify-center items-center h-auto md:h-screen pt-16 md:pt-0" // Added padding-top for small screens
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Transforma tu negocio con plantillas a tu medida</h2>
              <p className="text-base md:text-lg mb-6 text-center max-w-2xl">
              Crea automáticamente plantillas de inventario en Excel en cuestión de segundos.
              </p>
              <a href="/" className="bg-green-600 text-white py-3 px-6 rounded-lg text-base md:text-lg hover:bg-green-700">
                Comienza Ahora
              </a>
            </section>
          </div>
          <div className='flex-1 p-6'>
            <img 
              src="/hero.jpg" 
              alt="hero image" 
              className="w-full h-auto object-cover rounded-lg" 
            />
          </div>
        </div>

        <Caracteristicas />
        <AcercaDe />
        <Contacto />
      </main>

      <footer className="p-6 bg-slate-900 text-white text-center">
        <p>&copy; 2024 Plantify. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
