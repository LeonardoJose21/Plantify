import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Loader, Lock } from "lucide-react";
import { getGeneratedCode } from '../services/generateCode';
import axios from 'axios';

export default function AppFeatures({ firstStepIsCompleted, setSecondStepIsCompleted, dataForPrompt, code, setCode }) {
    const [loading, setLoading] = useState(false);
    const [btnIsUsed, setBtnIsUsed] = useState(false);
    const [retryCount, setRetryCount] = useState(0);

    const userId = 1; // Example user ID, replace with actual user data

    const prompt = `Give me the xlsxwriter python code to create an excel inventory template. The template must have different tables and sheets (each table should have its own sheet). Also, there must be a sheet for a dashboard. Take the next information ${dataForPrompt} as the main reference, since the idea is to generate a custom template based on the previous data.` +
        "Always keep in mind that an inventory app should have at least a table for products, sales, purchases, clients, providers, categories, sales details, purchase details, especially if that is not specified in the previous information. Make sure that some columns have a predefined formula for all their fields (for example, the column for stock should consist of a formula). " +
        " Add data validation to the required tables or columns. Plus, add format conditioning to the columns that require it, using **both colors and icon conditioning**. Use **table format** for each table and don't forget to create the charts and graphs for the dashboard. Also, the charts and tables of the dashboard must be connected to the data of the tables of other sheets (this way they can be dynamic). In other words, the selected data must be from any or several existing tables." +
        " Each KPI should have a value retrieved from the information from any or several of the existing tables. Also, place the charts in order. " +
        " The validation and format conditioning should be applied to the tables in such a way that each time a new row is added, these validations or formats apply to the new rows. ** ALWAYS_SAVE THE EXCEL FILE IN TH LOCATION:'files/'. So it shoul be like this: 'files/file_name'" +
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
        setRetryCount(0);
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
                        user_id: 1,  // Include user ID in the request 
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
            })
            .then(response => {
                if (response.data.message) {
                    alert(response.data.message); // Display the success message
                    setSecondStepIsCompleted(true);
                    setBtnIsUsed(true);
                    setLoading(false);
                } else if (response.data.error && retryCount < 3) {
                    console.log(`Error in code execution. Retrying... (${retryCount + 1}/3)`);
                    setRetryCount(retryCount + 1);
                    executeRequestWithError(response.data.error);
                } else if (response.data.error) {
                    alert("Error: Unable to generate a valid Excel file. Please try again.");
                    setLoading(false);
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert(`Error: ${error.response?.data?.error || error.message}`);
                setLoading(false);
            });
    };

    const executeRequestWithError = (errorMessage) => {
        const updatedPrompt = "Code: '" + code + `'. Error encountered: ${errorMessage}. Please correct it and provide the working code without any additional explanations.`;

        getGeneratedCode(updatedPrompt)
            .then(response => {
                const parsedCode = parsedResponse(response.choices[0].message.content);
                setCode(parsedCode);
                // console.log(parsedCode);
                return axios.post(import.meta.env.VITE_API_URL + 'playground/api/execute-code/',
                    {
                        code: parsedCode,
                        user_id: userId  // Include user ID in the request 
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
            })
            .then(response => {
                if (response.data.message) {
                    alert(response.data.message); // Display the success message
                    setSecondStepIsCompleted(true);
                    setBtnIsUsed(true);
                    setLoading(false);
                } else if (response.data.error && retryCount < 3) {
                    console.log(`Error in code execution. Retrying... (${retryCount + 1}/3)`);
                    setRetryCount(retryCount + 1);
                    executeRequestWithError(response.data.error);
                } else if (response.data.error) {
                    alert("Error: Unable to generate a valid Excel file. Please try again.");
                    setLoading(false);
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert(`Error: ${error.response?.data?.error || error.message}`);
                setLoading(false);
            });
    };

    return (
        firstStepIsCompleted ? (
            <div className='flex flex-col space-y-4 p-4'>
                <p>Genial, ya tenemos los requisitos de tu negocio, ahora es hora de generar tu plantilla de inventario { }</p>
                <Button onClick={handleFeatures} disabled={btnIsUsed} className='w-full md:w-2/5 md:mr-0 md:ml-auto'>Generar {loading ? <Loader /> : null}</Button>
            </div>
        ) : (
            <div className="flex items-center space-x-2 p-4">
                <p>Complete todos los datos de su negocio para poder continuar</p>
                <Lock />
            </div>
        )
    );
}
