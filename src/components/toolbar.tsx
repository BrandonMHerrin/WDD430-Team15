// Here should be the categories (dynamic populated?), maybe dropdown menus (for subcategories)

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Category } from '../types/category';


interface ToolBar {
  categories: Category[];
 
}


const Toolbar: React.FC<ToolBar> = ({ categories }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    
    setActiveDropdown(null);
  };

  const toggleDropdown = (categoryId: string) => {
    setActiveDropdown(activeDropdown === categoryId ? null : categoryId);
  };

  return (
    <div className="toolbar">
      <div className="toolbar-container">
        {categories.map((category) => (
          <div key={category.id} className="category-item">
            <button
              className="category-button"
              onClick={() => {
                if (category.subcategories && category.subcategories.length > 0) {
                  toggleDropdown(category.id);
                } else {
                  handleCategoryClick(category.id);
                }
              }}
            >
              {category.name}
              {category.subcategories && category.subcategories.length > 0 && (
                <ChevronDown 
                  size={16} 
                  className={`chevron ${activeDropdown === category.id ? 'rotated' : ''}`}
                />
              )}
            </button>

            {/* Dropdown menu for subcategories */}
            {category.subcategories && 
             category.subcategories.length > 0 && 
             activeDropdown === category.id && (
              <div className="dropdown-menu">
                {category.subcategories.map((subcategory, index) => (
                  <button
                    key={index}
                    className="dropdown-item"
                    onClick={() => handleCategoryClick(`${category.id}-${subcategory}`)}
                  >
                    {subcategory}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;
