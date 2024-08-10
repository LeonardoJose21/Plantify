import React from 'react';
import {Lock} from "lucide-react";

export default function FinalResult({ seconStepCompleted }) {
    const handleDownload = () => {
        const fileContent = "This is your file content."; // Replace with your actual content
        const blob = new Blob([fileContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'plantilla.txt'; // Name of the file to be downloaded
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        seconStepCompleted ? (
            <div className='flex flex-auto items-center space-x-4'>
                <span>Aquí está su plantilla:</span>
                <button
                    onClick={handleDownload}
                    className="px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                    Descargar
                </button>
            </div>
        ) : (
            <div className="flex items-center space-x-2 p-4">
                <p>Complete el segundo paso para continuar</p>
                <Lock />
            </div>
        )

    );
}
