import React, { useState, useEffect, useRef } from 'react';
import * as FaIcons from 'react-icons/fa';
import './DropdownMenu.scss';

interface Category {
  name: string;
  icon: string;
}

interface DropdownMenuProps {
  categories: Category[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ categories }) => {
  const [options, setOptions] = useState(categories);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState('');
  const [newCategoryIcon, setNewCategoryIcon] = useState('FaPlus');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category.name);
    setIsOpen(false);
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !options.some(opt => opt.name === newCategory)) {
      setOptions([...options, { name: newCategory, icon: newCategoryIcon }]);
      setNewCategory('');
      setNewCategoryIcon('FaPlus');
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const getIconComponent = (iconName: string) => {
    const IconComponent = (FaIcons as any)[iconName];
    return IconComponent ? <IconComponent /> : <FaIcons.FaPlus />;
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button onClick={toggleDropdown} className={isOpen ? 'dropdown-toggle-actived' : 'dropdown-toggle'}>
        {selectedCategory ? selectedCategory : 'Select Category'}
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <ul>
            {options.map((category, index) => (
              <li
                key={index}
                className={selectedCategory === category.name ? 'selected' : ''}
                onClick={() => handleSelectCategory(category)}
              >
                {category.name}
                {getIconComponent(category.icon)}
              </li>
            ))}
          </ul>
          <div className="dropdown-footer">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Add new category"
            />
            <button onClick={handleAddCategory}>Add</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
