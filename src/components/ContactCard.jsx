export default function ContactCard({ contact, onSelect, onToggleFavorite, onClearContact, isSelected, searchTerm }) {
  // Si es una tarjeta vacía para el contacto destacado (nada seleccionado)
  if (!onSelect && !contact) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 text-center">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          Contacto Destacado
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          👆 Selecciona un contacto
        </p>
      </div>
    );
  }

  // Si no hay función de selección pero sí contacto: es la vista del contacto destacado
  if (!onSelect) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">
          Contacto Destacado
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          <strong>Nombre:</strong> {contact.name}<br />
          <strong>Teléfono:</strong> {contact.phone}<br />
          <strong>Email:</strong> {contact.email}<br />
          <strong>Empresa:</strong> {contact.company}
        </p>
        <button
          onClick={onClearContact}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white text-sm py-2 px-4 rounded-lg transition-colors duration-200"
        >
          🗑️ Limpiar contacto
        </button>
      </div>
    );
  }

  // Tarjeta normal en la lista
  return (
    <div
      className={`p-6 rounded-xl shadow-lg border transition-all duration-300 cursor-pointer hover:scale-105
        ${isSelected
          ? 'bg-yellow-100 border-yellow-400 dark:bg-yellow-300/10 dark:border-yellow-500'
          : 'bg-white/90 dark:bg-gray-800/90 border-gray-200/50 dark:border-gray-700/50'
        }`}
      onClick={() => onSelect(contact)}
    >
      {/* Header con avatar y botón de favoritos */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {(contact.name || '?').charAt(0)}
          </div>
          <div className="ml-3">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              {searchTerm ? highlightText(contact.name || '', searchTerm) : (contact.name || 'Sin nombre')}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {searchTerm ? highlightText(contact.company || '', searchTerm) : (contact.company || 'Sin empresa')}
            </p>
          </div>
        </div>
        
        {/* Botón de favoritos */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Evitar que se seleccione el contacto al hacer clic en favoritos
            onToggleFavorite(contact.id);
          }}
          className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
            contact.favorite 
              ? 'bg-yellow-400 text-yellow-900 shadow-lg' 
              : 'bg-gray-200 text-gray-500 hover:bg-yellow-200 hover:text-yellow-700 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-yellow-200 dark:hover:text-yellow-700'
          }`}
          title={contact.favorite ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
          <span className="text-xl">
            {contact.favorite ? '⭐' : '☆'}
          </span>
        </button>
      </div>

      {/* Info */}
      <div className="space-y-3">
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <span className="text-lg mr-3">📞</span>
          <span className="text-sm">
            {searchTerm ? highlightText(contact.phone || '', searchTerm) : (contact.phone || 'Sin teléfono')}
          </span>
        </div>

        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <span className="text-lg mr-3">📧</span>
          <span className="text-sm truncate">
            {searchTerm ? highlightText(contact.email || '', searchTerm) : (contact.email || 'Sin email')}
          </span>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="mt-4 flex space-x-2">
        <button 
          onClick={(e) => e.stopPropagation()}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-3 rounded-lg transition-colors duration-200"
        >
          📞 Llamar
        </button>
        <button 
          onClick={(e) => e.stopPropagation()}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm py-2 px-3 rounded-lg transition-colors duration-200"
        >
          📧 Email
        </button>
      </div>
    </div>
  );
}
