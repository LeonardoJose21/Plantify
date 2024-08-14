import React, { useState, useEffect } from 'react';
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from 'axios';

export default function FinalResult({ seconStepCompleted, user }) {
    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        // Fetch templates from the backend
        async function fetchTemplates() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}playground/api/templates/`, {
                    params: {
                        userId: user
                    }
                });
    
                if (response.status === 200) {
                    setTemplates(response.data);
                } else {
                    console.error('Error fetching templates:', response.data.error || 'Unknown error');
                }
            } catch (error) {
                console.error('Error fetching templates:', error);
            }
        }
    
        if (user) {
            fetchTemplates();
        }
    }, [user]);
    

    const handleDownload = (link) => {
        // Handle template download
        window.location.href = link;
    };

    return (
        <div className='flex flex-col md:flex-row'>
            <div className='w-full md:w-1/2'>
                {seconStepCompleted ? (
                    <div className='flex flex-auto items-center space-x-4'>
                        <span>Listo! Ya está lista tu plantilla</span>
                        <Button
                            onClick={() => handleDownload(templates[0]?.link_template)}
                            className="px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                            Descargar mi plantilla
                        </Button>
                    </div>
                ) : (
                    <div className="flex items-center space-x-2 p-4">
                        <p>Complete el segundo paso para continuar</p>
                        <Lock />
                    </div>
                )}
            </div>
            <div className='w-full md:w-1/2'>
                <h2 className='text-lg font-semibold mb-4'>Mis Plantillas</h2>
                {templates.length > 0 ? (
                    templates.map(template => (
                        <div key={template.id_template} className='mb-4 p-4 border rounded-md'>
                            <p><strong>Descripción:</strong> {template.description}</p>
                            <p><strong>Fecha de Creación:</strong> {new Date(template.date_created).toLocaleString()}</p>
                            <Button
                                onClick={() => handleDownload(template.link_template)}
                                className="mt-2 px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                                Descargar
                            </Button>
                        </div>
                    ))
                ) : (
                    <p>No tienes plantillas disponibles.</p>
                )}
            </div>
        </div>
    );
}
