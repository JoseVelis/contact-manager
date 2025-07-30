import { useState, useEffect } from 'react';
import { fetchContacts, deleteContact } from '../services/contactService';
import ContactCard from './ContactCard';

function ContactList({ 
  contacts, 
  onSelectContact, 
  onToggleFavorite, 
  selectedContact, 
  totalCount, 
  searchTerm, 
  originalCount, 
  setContacts 
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Cargar contactos automáticamente al montar el componente
  useEffect(() => {
    loadContactsFromAPI();
  }, []);

  async function loadContactsFromAPI() {
    setIsLoading(true);
    setError(null);
    
    try {
      const apiContacts = await fetchContacts();
      console.log('Contactos cargados desde API:', apiContacts);
      console.log('Primer contacto:', apiContacts[0]);
      console.log('Propiedades del primer contacto:', Object.keys(apiContacts[0] || {}));
      setContacts(apiContacts);
    } catch (error) {
      setError(error.message);
      console.error('Error cargando contactos:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteContact(id, name) {
    const confirmed = window.confirm(`¿Estás seguro de que quieres eliminar a "${name}"? Esta acción no se puede deshacer.`);
    
    if (!confirmed) return;
    
    setDeletingId(id);
    try {
      await deleteContact(id);
      // Actualizar la lista local removiendo el contacto eliminado
      setContacts(prev => prev.filter(contact => contact.id !== id));
    } catch (error) {
      setError(`Error al eliminar: ${error.message}`);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
          Contactos ({totalCount})
          {totalCount !== originalCount && (
            <span className="text-sm text-blue-600 dark:text-blue-400 ml-2">
              (filtrados de {originalCount})
            </span>
          )}
        </h2>
        
        <button
          onClick={loadContactsFromAPI}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? '🔄 Cargando...' : '🔄 Actualizar'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          <p className="font-semibold">❌ Error:</p>
          <p>{error}</p>
        </div>
      )}

      {isLoading && (
        <div className="mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded">
          <p>🔄 Cargando contactos...</p>
        </div>
      )}

      {contacts.filter(c => c.favorite).length === 0 && (
        <p className="text-red-500 mb-4">No hay favoritos</p>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {contacts.map(contact => (
          <div key={contact.id} style={{ position: 'relative' }}>
            <ContactCard 
              contact={contact}
              onSelect={onSelectContact}
              onToggleFavorite={onToggleFavorite}
              isSelected={selectedContact?.id === contact.id}
              searchTerm={searchTerm}
            />
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteContact(contact.id, contact.name);
              }}
              disabled={deletingId === contact.id}
              style={{
                position: 'absolute',
                top: '0.5rem',
                right: '0.5rem',
                padding: '0.25rem 0.5rem',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: deletingId === contact.id ? 'not-allowed' : 'pointer',
                opacity: deletingId === contact.id ? 0.5 : 1,
                fontSize: '0.875rem',
                zIndex: 10
              }}
            >
              {deletingId === contact.id ? '🗑️ Eliminando...' : '🗑️ Eliminar'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContactList;
