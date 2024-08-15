import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Loader, Lock } from "lucide-react";
import { getGeneratedCode } from '../services/generateCode';
import axios from 'axios';

export default function AppFeatures({ firstStepIsCompleted, setSecondStepIsCompleted, dataForPrompt, user, setCode, requirements }) {
    const [loading, setLoading] = useState(false);
    const [btnIsUsed, setBtnIsUsed] = useState(false);
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState('');

    const prompt = `Give me the xlsxwriter python code to create an excel inventory template. The template must have different tables and sheets (each table should have its own sheet). Also, there must be a sheet for a dashboard. Take the next information ${dataForPrompt} as the main reference, since the idea is to generate a custom template based on the previous data.` +
        "Always keep in mind that an inventory app should have at least a table for products, sales, purchases, clients, providers, categories, sales details, purchase details, especially if that is not specified in the previous information. Make sure that some columns have a predefined formula for all their fields (for example, the column for stock should consist of a formula). " +
        " Add data validation to the required tables or columns. Plus, add format conditioning to the columns that require it, using **both colors and icon conditioning**. Use **table format** for each table and don't forget to create the charts and graphs for the dashboard. Also, the charts and tables of the dashboard must be connected to the data of the tables of other sheets (this way they can be dynamic). In other words, the selected data must be from any or several existing tables." +
        " Each KPI should have a value retrieved from the information from any or several of the existing tables. Also, place the charts in order. " +
        " The validation and format conditioning should be applied to the tables in such a way that each time a new row is added, these validations or formats apply to the new rows. ** ALWAYS_SAVE THE EXCEL FILE IN TH LOCATION:'files/'. So it shoul be like this: 'files/file_name'." + `** the file name should consist of this user id: '${user}' plus a number resulting from combining the current timestamp with a randon number, example: 121_102929393020201.xlsx**`
        " Finally, DON'T GIVE ANY EXPLANATION OR TEXT THAT IS NOT CODE IN YOUR RESPONSES. JUST GIVE ME THE **CODE**, WITHOUT ANY TEXT";

    const parsedResponse = (response) => {
        const codeBlockMatch = response.match(/```python\s+([\s\S]*?)\s+```/);

        if (codeBlockMatch) {
            return codeBlockMatch[1]; // Return the code inside the block
        } else {
            console.log("ERROR al Obtener el código");
            return null; // Return null if no code block is found
        }
    };

    const handleFeatures = () => {
        setLoading(true);
        executeRequest();
    };

    const executeRequest = () => {
        getGeneratedCode(prompt)
            .then(response => {
                const parsedCode = parsedResponse(response.choices[0].message.content);
                setCode(parsedCode);
                return axios.post(import.meta.env.VITE_API_URL + 'playground/api/execute-code/',
                    {
                        code: parsedCode,
                        user: user, 
                        description: requirements 
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
            })
            .then(response => {
                if (response.data.message) {
                    setSecondStepIsCompleted(true);
                    setBtnIsUsed(true);
                    setSuccess(true);
                    setFailure('')
                    setLoading(false);
                }  else if (response.data.error) {
                    setFailure("Error: "+response.data.error);
                    setLoading(false);
                }
            })
            .catch(error => {
                setFailure(`Error: ${error.response?.data?.error || error.message}`);
                setLoading(false);
            });
    };

    return (
        firstStepIsCompleted ? (
            <div className='flex flex-col space-y-4 p-4'>
                <p>Genial, ya tenemos los requisitos de tu negocio, ahora es hora de generar tu plantilla de inventario</p>
                <Button onClick={handleFeatures} disabled={btnIsUsed || loading} className='w-full md:w-2/5 md:mr-0 md:ml-auto'>Generar {loading ? < Loader className='ml-3' /> : null}</Button>
                {success  &&  <span className='bg-slate-900 p-2 w-4/5 md:w-3/5 md:ml-0 md:mr-auto mx-auto rounded mt-6 text-white'>¡Tu plantilla ha sido generada con exito! Debajo podrás encontrar el like para descargarla :) </span> }
                { failure &&  <span className='bg-red-500 p-2 w-4/5 mx-auto rounded mt-6 md:w-3/5 md:ml-0 md:mr-auto text-white'> {failure} </span>}
                <span>

                </span>
            </div>
        ) : (
            <div className="flex items-center space-x-2 p-4">
                <p>Complete todos los datos de su negocio para poder continuar</p>
                <Lock />
            </div>
        )
    );
}
