import React from 'react';

const Copyright = () => {
  // Función para obtener el año actual dinámicamente
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <div className="mt-8 pt-4 border-t border-gray-300 text-center text-sm text-gray-600">
      <p>&copy; {getCurrentYear()} Jose Velis. Todos los derechos reservados.</p>
    </div>
  );
};

export default Copyright;