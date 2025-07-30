import React, { useState, useEffect } from "react";
import { initializeApp, loadAppData } from './utils/initializer';
import SplashScreen from './components/SplashScreen';
import Header from "./components/Header";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";
import SearchBar from "./components/SearchBar";
import SortDropdown from "./components/SortDropdown";
import { filterContacts, sortContacts } from "./utils/textUtils.jsx";
import Copyright from "./components/Copyright";

function App() {
  // Estado para controlar si la app está inicializando
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState(null);

  // useEffect se ejecuta al montar el componente
  useEffect(() => {
    async function startApp() {
      try {
        // Primero inicializar la app
        const initResult = await initializeApp(3000);
        
        // Luego cargar datos
        const dataResult = await loadAppData();
        setIsInitializing(false);
        setError(null);
      } catch (err) {
        setError("Error al cargar los datos de la aplicación");
        // Auto-retry después de 2 segundos
        setTimeout(() => {
          setError(null);
          startApp();
        }, 2000);
      }
    }
    startApp();
  }, []);

  const [contacts, setContacts] = useState([
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
    },
    {
      id: 3,
      name: "Lucía Torres",
      phone: "+51 965 432 109",
      email: "lucia.torres@email.com",
      company: "Innovate Perú",
      favorite: false
    }
  ]);

  const [selectedContact, setSelectedContact] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('name-asc');

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
  };

  const handleNextContact = () => {
    if (!selectedContact) return;

    const currentIndex = contacts.findIndex(
      (c) => c.id === selectedContact.id
    );
    const nextIndex = (currentIndex + 1) % contacts.length;
    setSelectedContact(contacts[nextIndex]);
  };

  const handleToggleFavorite = (id) => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === id ? { ...contact, favorite: !contact.favorite } : contact
    );
    setContacts(updatedContacts);
  };

  const handleSelectFirstFavorite = () => {
    const firstFav = contacts.find((c) => c.favorite);
    if (firstFav) {
      setSelectedContact(firstFav);
    } else {
      alert("No hay contactos favoritos.");
    }
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleAddContact = (newContact) => {
    // El contacto ya viene creado desde la API, solo agregarlo a la lista local
    setContacts(prevContacts => [...prevContacts, newContact]);
    setShowForm(false); // Ocultar el formulario después de agregar
    
    // Seleccionar automáticamente el nuevo contacto
    setSelectedContact(newContact);
    
    // Mostrar notificación de éxito
    showNotification(`✅ ${newContact.name} agregado a tus contactos.`);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleSort = (type) => {
    setSortType(type);
  };

  // Filtrar y ordenar contactos
  const filteredContacts = filterContacts(contacts, searchTerm);
  const sortedContacts = sortContacts(filteredContacts, sortType);

  return (
    <>
      {isInitializing && <SplashScreen isLoading={isInitializing} error={error} />}
      {!isInitializing && (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <Header 
        favoriteCount={contacts.filter((c) => c.favorite).length} 
        totalCount={contacts.length} 
      />

      {/* Notificación temporal */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-white dark:bg-gray-800 border-l-4 border-green-500 text-gray-800 dark:text-white px-6 py-4 rounded-lg shadow-lg animate-pulse">
          <p className="font-medium">{notification}</p>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Botón para agregar contacto */}
        <div className="mb-6 flex justify-center">
          <button
            onClick={toggleForm}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold flex items-center gap-2"
          >
            {showForm ? "❌ Cancelar" : "➕ Agregar Contacto"}
          </button>
        </div>

        {/* Formulario de contacto */}
        {showForm && (
          <div className="mb-8">
            <ContactForm onAddContact={handleAddContact} />
          </div>
        )}

        {/* Búsqueda y ordenamiento */}
        <div className="mb-8">
          <SearchBar 
            onSearch={handleSearch}
            searchTerm={searchTerm}
            onClearSearch={handleClearSearch}
          />
          <SortDropdown 
            onSort={handleSort}
            currentSort={sortType}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ContactList
            contacts={sortedContacts}
            onSelectContact={handleSelectContact}
            onToggleFavorite={handleToggleFavorite}
            selectedContact={selectedContact}
            totalCount={sortedContacts.length}
            searchTerm={searchTerm}
            originalCount={contacts.length}
            setContacts={setContacts}
          />

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              Detalles del Contacto
            </h2>

            {selectedContact ? (
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p>
                  <span className="font-semibold">📛 Nombre:</span>{" "}
                  {selectedContact.name}
                </p>
                <p>
                  <span className="font-semibold">📞 Teléfono:</span>{" "}
                  {selectedContact.phone}
                </p>
                <p>
                  <span className="font-semibold">📧 Email:</span>{" "}
                  {selectedContact.email}
                </p>
                <p>
                  <span className="font-semibold">🏢 Empresa:</span>{" "}
                  {selectedContact.company}
                </p>
                <p>
                  <span className="font-semibold">⭐ Favorito:</span>{" "}
                  {selectedContact.favorite ? "Sí" : "No"}
                </p>
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={handleNextContact}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Siguiente
                  </button>
                  <button
                    onClick={handleSelectFirstFavorite}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    ⭐ Primer Favorito
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                Selecciona un contacto para ver los detalles.
              </p>
            )}
          </div>
        </div>
      </main>
        </div>
      )}
    </>
  );
}

export default App;
