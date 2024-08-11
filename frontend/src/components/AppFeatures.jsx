import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Loader, Lock } from "lucide-react"
import { getGeneratedCode } from '../services/generateCode';


export default function AppFeatures({ firstStepIsCompleted, setSecondStepIsCompleted, dataForPrompt, bizname, requirements}) {    
    const [loading, setLoading] = useState(false);
    const [btnIsUsed, setBtnIsUsed] = useState(false);

    const prompt = `Give me the xlsxwriter python code to create an excel inventary template. The template must have differents tables and sheets (each table should have their own sheet.). Also there must be  sheet for a dashboard. take the next information ${dataForPrompt}`+
    " Add data validation to the require tables or columns. Plus add format conditioning to the columns that requirement, use **both colors and icon conditioning**. Use **table format** for each table and dont forget to create the charts and graphs for the dashboard. Also, the charts and tables of the dashboard and KPI's must be connected to the data of the tables of other sheets (thjis way they can be dibnamic)" +
    " The validation and format conditioning should be applied to the tables in such way that each time a new row is added, these validations or formats apply to the new rows. "+
    " Finally, DONT'T GIVE ANY AEXPLANATION OR TEXT THAT IS NOT CODE IN YOUR RESPONSES. JUST GIVE ME THE **CODE**, WITHOUT ANY TEXT"

    const handleFeatures = async() => {
        console.log(prompt);
        setLoading(true);
        try {
            const response = await getGeneratedCode(prompt);
            console.log(response.choices[0].message.content)
            setSecondStepIsCompleted(true)
            setBtnIsUsed(true);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }

    };


    return (
        firstStepIsCompleted ? (
            <div className='flex flex-col space-y-4 p-4'>
                <p>Genial, ya tenemos los requrimientos de tu negocio, ahora es hoar de generar tu plantilla de inventario</p>
                <Button onClick={handleFeatures} disabled ={btnIsUsed} className='w-full md:w-2/5 md:mr-0 md:ml-auto'>Generar {loading ? <Loader/>:null}</Button>
            </div>
        ) : (
            <div className="flex items-center space-x-2 p-4">
                <p>Complete todos los datos de su negocio para poder continuar</p>
                <Lock />
            </div>
        )
    );
}
