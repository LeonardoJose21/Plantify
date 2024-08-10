import React, { useState } from 'react';
import CategoryCheckboxes from "@/components/Checkboxes";  // Adjusted import to match your file name
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react"

export default function AppFeatures({ firstStepIsCompleted, setSecondStepIsCompleted}) {    
    const [categories, setCategories] = useState([
        "Agregar nuevos productos",
        "Dashboards",
        "Buscar productos",
    ]);
    const [selectedCategories, setSelectedCategories] = useState(new Set());
    const [newCategory, setNewCategory] = useState('');

    const handleFeatures = () => {
        setSecondStepIsCompleted(true);
        console.log("Selected Features:", selectedCategories);
    };

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

    return (
        firstStepIsCompleted ? (
            <div className='flex flex-col space-y-6 p-4'>
                <CategoryCheckboxes
                    categories={categories}
                    selectedCategories={selectedCategories}
                    onCheckboxChange={handleCheckboxChange}
                    onAddCategory={handleAddCategory}
                    newCategory={newCategory}
                    onNewCategoryChange={setNewCategory}
                />
                <Button onClick={handleFeatures} className='w-full md:w-2/5 md:mr-0 md:ml-auto'>Continuar</Button>
            </div>
        ) : (
            <div className="flex items-center space-x-2 p-4">
                <p>Complete todos los datos de su negocio para poder continuar</p>
                <Lock />
            </div>
        )
    );
}
