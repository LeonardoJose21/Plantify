import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import CategoryCheckboxes from "@/components/Checkboxes";

export default function StoreData({ bizName, setBizName, requirements, setRequirements, selectedCategories, setSelectedCategories, setFirstStepCompleted}) {
    const [categories, setCategories] = useState([
        "Alimentos",
        "Ropa",
        "Electrónica",
        "Hogar",
        "Salud",
    ]);
    const [newCategory, setNewCategory] = useState('');

    const handleAddCategory = () => {
        if (newCategory.trim() && !categories.includes(newCategory)) {
            setCategories([...categories, newCategory]);
            setSelectedCategories(prev => new Set(prev).add(newCategory));
            setNewCategory('');
        }
    };

    const handleCheckboxChange = (category) => {
        setSelectedCategories(prev => {
            const newSelected = new Set(prev);
            if (newSelected.has(category)) {
                newSelected.delete(category);
            } else {
                newSelected.add(category);
            }
            return newSelected;
        });
    };

    const handleDataStore = () => {
       if (bizName && requirements && selectedCategories){
        setFirstStepCompleted(true);
        console.log("Business Name:", bizName);
        console.log("Requirements:", requirements);
        console.log("Selected Categories:", selectedCategories);
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
            <CategoryCheckboxes
                categories={categories}
                selectedCategories={selectedCategories}
                onCheckboxChange={handleCheckboxChange}
                onAddCategory={handleAddCategory}
                newCategory={newCategory}
                onNewCategoryChange={setNewCategory}
            />
            <Button onClick={handleDataStore} className='w-full md:w-2/5 md:mr-0 md:ml-auto'> Continuar </Button>
        </div>
    );
}
