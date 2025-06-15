"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Category } from "../types/category";

interface ToolBar {
  categories: Category[];
  // onCategorySelect?: (categoryId: string) => void;
  isMobile?: boolean;
}

const Toolbar: React.FC<ToolBar> = ({
  categories,
  // onCategorySelect,
  isMobile = false,
}) => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const handleCategoryClick = (categoryId: number) => {
    // if (onCategorySelect) {
    //   onCategorySelect(categoryId);
    // }
    setActiveDropdown(null);
  };

  const toggleDropdown = (categoryId: number) => {
    setActiveDropdown(activeDropdown === categoryId ? null : categoryId);
  };

  return (
    <div className={`${isMobile ? "toolbar-mobile" : "toolbar-desktop"}`}>
      <div className="toolbar-container">
        {categories.map((category) => (
          <div key={category.id} className="category-item">
            <button
              className="category-button"
              onClick={() => {
                if (category.children && category.children.length > 0) {
                  toggleDropdown(category.id);
                } else {
                  handleCategoryClick(category.id);
                }
              }}
            >
              {category.name}
              {category.children && category.children.length > 0 && (
                <ChevronDown
                  size={16}
                  className={`chevron ${
                    activeDropdown === category.id ? "rotated" : ""
                  }`}
                />
              )}
            </button>

            {/* Dropdown menu for subcategories */}
            {category.children &&
              category.children.length > 0 &&
              activeDropdown === category.id && (
                <div className="dropdown-menu">
                  {category.children.map((subcategory, index) => (
                    <button
                      key={index}
                      className="dropdown-item"
                      onClick={() =>
                        handleCategoryClick(subcategory.id)
                      }
                    >
                      {subcategory.name}
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
