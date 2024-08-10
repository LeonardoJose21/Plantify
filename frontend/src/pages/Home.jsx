import React, { useState } from 'react';
import StoreData from '../components/StoreData';
import AppFeatures from '../components/AppFeatures';
import FinalResult from '../components/FinalResult';

export default function Home() {
  const [bizName, setBizName] = useState('');
  const [requirements, setRequirements] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [firstStepCompleted, setFirstStepCompleted] = useState(false);
  const [secondStepCompleted, setSecondStepCompleted] = useState(false);

  return (
    <div className="flex flex-col text-slate-900">
      <div className="flex flex-1 flex-col">
        <div className="p-5 border-b md:border-b-0 md:border-r border-gray-300 flex-1">
          <h2 className="text-xl font-semibold mb-4">1. Datos de la tienda</h2>
          <StoreData
            bizName={bizName}
            requirements={requirements}
            selectedCategories={selectedCategories}
            setBizName={setBizName}
            setSelectedCategories={setSelectedCategories}
            setRequirements={setRequirements}
            setFirstStepCompleted={setFirstStepCompleted}
          />
          <h2 className="text-xl font-semibold mb-4">2. Funcionalidades de su plantilla/app en Excel
          </h2>
          <AppFeatures firstStepIsCompleted={firstStepCompleted} setSecondStepIsCompleted={setSecondStepCompleted} />
          <h2 className="text-xl font-semibold mb-4">3. Plantilla final
          </h2>
          <FinalResult seconStepCompleted={secondStepCompleted}/>
        </div>
      </div>
    </div>
  );
}
