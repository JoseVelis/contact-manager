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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

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

  function handleDeleteClick(contact) {
    setContactToDelete(contact);
    setShowDeleteDialog(true);
  }

  function handleCancelDelete() {
    setShowDeleteDialog(false);
    setContactToDelete(null);
  }

  async function handleConfirmDelete() {
    if (!contactToDelete) return;
    
    setDeletingId(contactToDelete.id);
    setShowDeleteDialog(false);
    
    try {
      await deleteContact(contactToDelete.id);
      // Actualizar la lista local removiendo el contacto eliminado
      setContacts(prev => prev.filter(contact => contact.id !== contactToDelete.id));
      
      // Si el contacto eliminado estaba seleccionado, deseleccionarlo
      if (selectedContact?.id === contactToDelete.id) {
        onSelectContact(null);
      }
      
      console.log(`✅ Contacto "${contactToDelete.name}" eliminado exitosamente`);
    } catch (error) {
      setError(`Error al eliminar: ${error.message}`);
      console.error('Error eliminando contacto:', error);
    } finally {
      setDeletingId(null);
      setContactToDelete(null);
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
                handleDeleteClick(contact);
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

      {/* Diálogo de confirmación de eliminación */}
      {showDeleteDialog && contactToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                  <span className="text-2xl">🗑️</span>
                </div>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Confirmar eliminación
                </h3>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ¿Estás seguro de que quieres eliminar a <strong className="text-gray-900 dark:text-white">"{contactToDelete.name}"</strong>?
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Esta acción no se puede deshacer.
              </p>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactList;

