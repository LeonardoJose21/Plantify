
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";


const CategoryCheckboxes = ({ categories, selectedCategories, onCheckboxChange, onAddCategory, newCategory, onNewCategoryChange }) => {
    return (
        <div className='flex flex-col space-y-3'>
            <h3 className='text-base font-semibold'>
                Categorías de productos que ofrece su tienda
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                            id={category}
                            checked={selectedCategories.has(category)}
                            onChange={() => onCheckboxChange(category)}
                        />
                        <label htmlFor={category} className="text-sm">
                            {category}
                        </label>
                    </div>
                ))}
            </div>
            <div className="flex items-center space-x-2 mt-2">
                <Input
                    onChange={(event) => onNewCategoryChange(event.target.value)}
                    placeholder="Otro?"
                    value={newCategory}
                    className="w-full md:w-auto"
                />
                <Button onClick={onAddCategory} className="ml-2">
                    +
                </Button>
            </div>
        </div>
    );
};

export default CategoryCheckboxes;
