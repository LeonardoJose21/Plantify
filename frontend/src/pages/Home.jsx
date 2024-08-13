import React, { useState } from 'react';
import StoreData from '../components/StoreData';
import AppFeatures from '../components/AppFeatures';
import FinalResult from '../components/FinalResult';

export default function Home() {
  const [bizName, setBizName] = useState('');
  const [requirements, setRequirements] = useState('');
  const [dataForPrompt, setDataForPrompt] = useState('');
  const [firstStepCompleted, setFirstStepCompleted] = useState(false);
  const [secondStepCompleted, setSecondStepCompleted] = useState(false);
  const [code, setCode] = useState('');

  return (
    <div className="flex flex-col text-slate-900">
      <div className="flex flex-1 flex-col">
        <div className="p-5 border-b md:border-b-0 md:border-r border-gray-300 flex-1">
          <h2 className="text-xl font-semibold mb-4">1. Datos de la tienda</h2>
          <StoreData
            bizName={bizName}
            requirements={requirements}
            setBizName={setBizName}
            setRequirements={setRequirements}
            setFirstStepCompleted={setFirstStepCompleted}
            setDataForPrompt={setDataForPrompt}
          />
          <h2 className="text-xl font-semibold mb-4">2. Creación de su plantilla de inventario en Excel
          </h2>
          <AppFeatures 
          firstStepIsCompleted={firstStepCompleted} 
          setSecondStepIsCompleted={setSecondStepCompleted} 
          dataForPrompt={dataForPrompt}
          code={code}
          setCode={setCode}/>
          <h2 className="text-xl font-semibold mb-4">3. Resultado final
          </h2>
          <FinalResult seconStepCompleted={secondStepCompleted}/>
        </div>
      </div>
    </div>
  );
}
