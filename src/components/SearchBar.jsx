import { useState } from 'react';

export default function SearchBar({ onSearch, searchTerm, onClearSearch }) {
  const [inputValue, setInputValue] = useState(searchTerm || '');

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onSearch(value);
  };

  const handleClear = () => {
    setInputValue('');
    onClearSearch();
  };

  return (
    <div className="relative max-w-md mx-auto mb-6">
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="🔍 Buscar por nombre o teléfono..."
          className="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
        />
        
        {/* Icono de búsqueda */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          🔍
        </div>
        
        {/* Botón de limpiar */}
        {inputValue && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            title="Limpiar búsqueda"
          >
            ✕
          </button>
        )}
      </div>
      
      {/* Contador de resultados */}
      {inputValue && (
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
          Buscando: "{inputValue}"
        </div>
      )}
    </div>
  );
} 