import { useState } from 'react';
import { createContact } from '../services/contactService';

export default function ContactForm({ onAddContact }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    favorite: false
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  function handleInputChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  function validateForm() {
    if (!formData.name.trim()) {
      setError('El nombre es obligatorio');
      return false;
    }
    if (!formData.phone.trim()) {
      setError('El teléfono es obligatorio');
      return false;
    }
    if (formData.email && !formData.email.includes('@')) {
      setError('El email debe tener un formato válido');
      return false;
    }
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    
    if (!validateForm()) {
      return;
    }
    
    setIsSaving(true);
    
    try {
      console.log('🌐 Enviando datos del formulario:', formData);
      console.log('🔗 URL de la API:', import.meta.env.VITE_API_URL || 'http://localhost:3000/api/contacts');
      
      const newContact = await createContact(formData);
      console.log('✅ Contacto creado exitosamente:', newContact);
      
      // Limpiar formulario
      setFormData({ name: '', phone: '', email: '', company: '', favorite: false });
      // Notificar al componente padre
      onAddContact?.(newContact);
      
    } catch (error) {
      console.error('❌ Error al crear contacto:', error);
      console.error('❌ Tipo de error:', error.name);
      console.error('❌ Mensaje de error:', error.message);
      console.error('❌ Stack trace:', error.stack);
      
      // Mensajes de error más específicos
      let errorMessage = 'Error al crear contacto';
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        errorMessage = 'No se pudo conectar con el servidor. Verifica que la API esté ejecutándose en http://localhost:3000';
      } else if (error.message.includes('404')) {
        errorMessage = 'Endpoint no encontrado. Verifica la URL de la API';
      } else if (error.message.includes('500')) {
        errorMessage = 'Error interno del servidor. Intenta más tarde';
      } else if (error.message.includes('CORS')) {
        errorMessage = 'Error de CORS. Verifica la configuración del servidor';
      } else {
        errorMessage = `Error al crear contacto: ${error.message}`;
      }
      
      setError(errorMessage);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div style={{
      padding: '1.5rem',
      border: '1px solid #e5e7eb',
      borderRadius: '0.5rem',
      backgroundColor: 'white',
      marginBottom: '1rem'
    }}>
      <h3 style={{ marginBottom: '1rem', color: '#374151' }}>➕ Crear Nuevo Contacto</h3>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            👤 Nombre completo *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Ej: Juan Pérez"
            required
            disabled={isSaving}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            📞 Teléfono *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Ej: +51 987 654 321"
            required
            disabled={isSaving}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            ✉️ Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Ej: juan.perez@email.com"
            disabled={isSaving}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            🏢 Empresa
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="Ej: Tech Solutions"
            disabled={isSaving}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="checkbox"
              name="favorite"
              checked={formData.favorite}
              onChange={handleInputChange}
              disabled={isSaving}
              style={{ marginRight: '0.5rem' }}
            />
            ⭐ Marcar como favorito
          </label>
        </div>

        {error && (
          <div style={{
            padding: '0.75rem',
            backgroundColor: '#fef2f2',
            border: '1px solid #f87171',
            color: '#dc2626',
            borderRadius: '0.375rem',
            marginBottom: '1rem'
          }}>
            ❌ {error}
          </div>
        )}
        
        <button 
          type="submit" 
          disabled={isSaving}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            fontSize: '1rem',
            cursor: isSaving ? 'not-allowed' : 'pointer',
            opacity: isSaving ? 0.5 : 1
          }}
        >
          {isSaving ? '💾 Guardando...' : '💾 Guardar Contacto'}
        </button>
      </form>
    </div>
  );
}
