export default function SortDropdown({ onSort, currentSort }) {
  const sortOptions = [
    { value: 'name-asc', label: '📝 Alfabético A-Z', icon: '🔤' },
    { value: 'name-desc', label: '📝 Alfabético Z-A', icon: '🔤' },
    { value: 'favorites-first', label: '⭐ Favoritos primero', icon: '⭐' },
    { value: 'recent-first', label: '🕒 Recién agregados primero', icon: '🕒' }
  ];

  return (
    <div className="max-w-xs mx-auto mb-6">
      <label htmlFor="sort-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        📊 Ordenar por:
      </label>
      <select
        id="sort-select"
        value={currentSort}
        onChange={(e) => onSort(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.icon} {option.label}
          </option>
        ))}
      </select>
    </div>
  );
} 