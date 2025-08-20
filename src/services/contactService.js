const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/contacts';

// Función temporal para simular la creación de contactos (para testing)
function simulateCreateContact(contactData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newContact = {
        id: Date.now(), // ID temporal
        ...contactData,
        createdAt: new Date().toISOString()
      };
      console.log('🎭 Simulando creación de contacto:', newContact);
      resolve(newContact);
    }, 1000); // Simular delay de red
  });
}

// GET - Obtener todos los contactos
export async function fetchContacts() {
  try {
    console.log('🌐 Cargando contactos desde:', API_URL);
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const contacts = await response.json();
    console.log('✅ Contactos cargados:', contacts.length);
    return contacts;
    
  } catch (error) {
    console.error('❌ Error al cargar contactos:', error);
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      console.log('🔄 Usando datos simulados...');
      // Retornar datos simulados si la API no está disponible
      return [
        {
          id: 1,
          name: "Ana García",
          phone: "+51 987 654 321",
          email: "ana.garcia@email.com",
          company: "Tech Solutions",
          favorite: false
        },
        {
          id: 2,
          name: "Carlos Mendoza",
          phone: "+51 976 543 210",
          email: "carlos.mendoza@email.com",
          company: "Marketing Pro",
          favorite: false
        }
      ];
    }
    throw error;
  }
}

// POST - Crear nuevo contacto
export async function createContact(contactData) {
  try {
    console.log('🌐 Creando contacto en:', API_URL);
    console.log('📝 Datos a enviar:', contactData);
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Respuesta del servidor:', response.status, errorText);
      throw new Error(`Error ${response.status}: ${response.statusText} - ${errorText}`);
    }
    
    const newContact = await response.json();
    console.log('✅ Contacto creado:', newContact);
    return newContact;
    
  } catch (error) {
    console.error('❌ Error al crear contacto:', error);
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      console.log('🔄 Usando simulación de creación...');
      // Usar simulación si la API no está disponible
      return await simulateCreateContact(contactData);
    }
    throw error;
  }
}

// PUT - Actualizar contacto
export async function updateContact(id, contactData) {
  try {
    console.log('🌐 Actualizando contacto...');
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const updatedContact = await response.json();
    console.log('✅ Contacto actualizado:', updatedContact);
    return updatedContact;
    
  } catch (error) {
    console.error('❌ Error al actualizar contacto:', error);
    throw error;
  }
}

// DELETE - Eliminar contacto
export async function deleteContact(id) {
  try {
    console.log('🌐 Eliminando contacto...');
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    console.log('✅ Contacto eliminado:', id);
    return true;
    
  } catch (error) {
    console.error('❌ Error al eliminar contacto:', error);
    throw error;
  }
} 