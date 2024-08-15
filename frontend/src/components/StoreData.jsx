import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getChatGptResponse } from "../services/chatgptService";
import { Loader } from "lucide-react";

export default function StoreData({ bizName, setBizName, requirements, setRequirements, setFirstStepCompleted, setDataForPrompt }) {
    const [loading, setLoading] = useState(false);
    const [btnIsUsed, setBtnIsUsed] = useState(false);

    const handleDataStore = async () => {
        if (bizName && requirements) {

            const prompt = `based on this bussines name: '${bizName}' and these requirements: '${requirements}'.`+
            " Give me the minimun and most neccesary tables with the columns of each one) for an inventory template in excel. Just the esse tables. " +
            " Also give me a list of the categories fo the products of the bussiness. Also give me short list of the the neede KPIs, THE  Charts or graphs and the grouped tables we would need to create a dashboard. " +
            " YPUR ANSWER MUST HAVE A JSON FORMAT LIKE THIS: { " +
            " tables: {table1:{colmn1, column2, ...}, table2:{colmn1, column2}...}," +
            " categories: { categoria1, categoria2,...}," +
            " dashboard: { KPIs: {KPI1, KPI2,..}, CHARTS: {char1,char1,char2}, GROUPED_TABLES: {groupedtBL1, groupedtBL2, groupedtBL3}}" + 
            " }. Plus, the content MUST BE IN SPANISH." 

            setLoading(true);
            try {
                const response = await getChatGptResponse(prompt);
                setDataForPrompt(response.choices[0].message.content)
                setFirstStepCompleted(true);
                setBtnIsUsed(true);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        } else {
            alert("Por favor, complete todos los datos solicitados de su negocio")
        }
    };

    return (
        <div className="flex flex-col space-y-6 p-4">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-3 md:space-y-0 md:space-x-4 w-full">
                <h3 className='text-base font-semibold'>
                    Cómo se llama su negocio
                </h3>
                <Input
                    onChange={(event) => setBizName(event.target.value)}
                    placeholder="La Posada"
                    value={bizName}
                    className="w-full md:w-1/2"
                />
            </div>
            <div className='flex flex-col md:flex-row items-start md:items-center space-y-3 md:space-y-0 md:space-x-4 w-full'>
                <h3 className='text-base font-semibold'>
                    Describa los requerimientos de su negocio
                </h3>
                <Textarea
                    className="w-full md:w-2/3"
                    rows="3"
                    placeholder="En la tienda 'El Niño de Dios' necesitamos un sistema que permita gestionar el inventario de productos, realizar seguimiento de las ventas diarias, y generar reportes de clientes y ventas mensuales."
                    onChange={(event) => setRequirements(event.target.value)}
                    value={requirements}
                />
            </div>
            <Button onClick={handleDataStore} disabled={btnIsUsed || loading} className='w-full md:w-2/5 md:mr-0 md:ml-auto'> Continuar {loading ? <Loader/>:null} </Button>
        </div>
    );
}
