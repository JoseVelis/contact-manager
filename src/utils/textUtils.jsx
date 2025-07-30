// Función para resaltar texto que coincide con la búsqueda
export function highlightText(text, searchTerm) {
  if (!searchTerm || !text) return text;
  
  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, index) => 
    regex.test(part) ? (
      <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
        {part}
      </mark>
    ) : part
  );
}

// Función para filtrar contactos por nombre y teléfono
export function filterContacts(contacts, searchTerm) {
  if (!searchTerm.trim()) return contacts;
  
  const term = searchTerm.toLowerCase();
  return contacts.filter(contact => 
    (contact.name || '').toLowerCase().includes(term) ||
    (contact.phone || '').toLowerCase().includes(term) ||
    (contact.email || '').toLowerCase().includes(term) ||
    (contact.company || '').toLowerCase().includes(term)
  );
}

// Función para ordenar contactos
export function sortContacts(contacts, sortType) {
  const sortedContacts = [...contacts];
  
  switch (sortType) {
    case 'name-asc':
      return sortedContacts.sort((a, b) => {
        const nameA = (a && a.name) || '';
        const nameB = (b && b.name) || '';
        return nameA.localeCompare(nameB);
      });
    
    case 'name-desc':
      return sortedContacts.sort((a, b) => {
        const nameA = (a && a.name) || '';
        const nameB = (b && b.name) || '';
        return nameB.localeCompare(nameA);
      });
    
    case 'favorites-first':
      return sortedContacts.sort((a, b) => {
        if (a && a.favorite && !(b && b.favorite)) return -1;
        if (!(a && a.favorite) && b && b.favorite) return 1;
        const nameA = (a && a.name) || '';
        const nameB = (b && b.name) || '';
        return nameA.localeCompare(nameB);
      });
    
    case 'recent-first':
      return sortedContacts.sort((a, b) => {
        const idA = (a && a.id) || 0;
        const idB = (b && b.id) || 0;
        return idB - idA;
      });
    
    default:
      return sortedContacts;
  }
} 