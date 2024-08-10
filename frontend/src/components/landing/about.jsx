import React from 'react';

export default function AcercaDe() {
  return (
    <section id="about" className="flex flex-col p-6 bg-white text-slate-900 text-center h-screen items-center justify-center">
      <div className='flex flex-row space-x-2'>
        <h2 className="text-3xl font-bold mb-6">Acerca de Plantify</h2>
      </div>

      <div className="flex flex-col space-y-2 items-center">
        <p className="text-lg mb-6 md:w-4/5 text-center">
          Esta aplicación nace del deseo de facilitar la vida de los emprendedores colombianos que gestionan sus negocios sin grandes recursos. Aquí, la inteligencia artificial se pone a tu servicio para crear aplicaciones y plantillas en Excel que responden a las necesidades específicas de tu inventario.
          <br></br>
          El objetivo es simple: permitir que cualquier persona, sin importar su experiencia técnica, pueda acceder a herramientas que hagan más eficiente la administración de su negocio. El enfoque está en ofrecer una solución rápida, económica y adaptada a lo que realmente importa: el crecimiento y la organización de tu emprendimiento.
          <br></br>
          Esta plataforma es una puerta abierta para que te concentres en lo que mejor haces: manejar y hacer crecer tu negocio, mientras te brindamos una manera sencilla de organizar tus inventarios. ¡Tu éxito está a un clic de distancia!
        </p>
      </div>


    </section>
  );
}
