import React, { useState, useEffect } from 'react';
import { Download, Lock, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import fileDownload from 'js-file-download';

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
    }, [user, seconStepCompleted]);


    const handleDownload = (filename) => {
        axios.post(`${import.meta.env.VITE_API_URL}playground/api/download`, {
            filename: filename
        }, {
            responseType: 'blob',
        }).then(response => {
            fileDownload(response.data, filename);
        }).catch(error => {
            console.error('Download failed:', error);
        });
    };

    const handleDelete = async (id_template) => {
        try {
          const response = await axios.delete(`${import.meta.env.VITE_API_URL}playground/api/templates/${id_template}/`);
          if (response.status === 204) {
            alert('Plantilla eliminada exitosamente.');
            // Refresh the list of templates, or remove the deleted template from the state
            setTemplates(templates.filter(template => template.id_template !== id_template));
          } else {
            alert('Hubo un error al eliminar la plantilla.');
          }
        } catch (error) {
          console.error('Error deleting template:', error);
          alert('Hubo un error al eliminar la plantilla.');
        }
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
            <div className='w-full md:w-1/2 min-h-80 overflow-y-scroll overflow-x-hidden'>
                <h2 className='text-lg font-semibold mb-4'>Mis Plantillas</h2>
                {templates.length > 0 ? (
                    templates.map((template, index) => (
                        (seconStepCompleted ? index < templates.length - 1 : true) && (
                            <div key={template.id_template} className='mb-4 p-2 border border-slate-400 rounded-md'>
                                <p className='text-sm'>{template.description}</p>
                                <div className='flex flex-row justify-between items-center'>
                                    <p className='text-xs'>{new Date(template.date_created).toLocaleString()}</p>
                                    <div className='flex space-x-2'>
                                        <Button
                                            onClick={() => handleDownload(template.link_template)}
                                            className="mt-2 px-2 py-1 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                                            <Download />
                                        </Button>
                                        <Button
                                            onClick={() => handleDelete(template.id_template)}
                                            className="mt-2 px-2 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
                                            <Trash />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )
                    ))
                ) : (
                    <p>No tienes plantillas disponibles.</p>
                )}
            </div>

        </div>
    );
}
