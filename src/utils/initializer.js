// Función que retorna una Promise personalizada
export function initializeApp(duration = 3000) {
    return new Promise((resolve) => {
        // setTimeout simula una operación que toma tiempo
        setTimeout(() => {
            resolve(false); // Este resolve demorará 3000 ms en ejecutarse.
        }, duration);
    });
}

// Función con manejo de errores
export const loadAppData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = Math.random() > 0.5; // 50% de éxito (50% de fallo)
        
        if (success) {
          resolve(false); // Termino de cargar
        } else {
          reject(true); // Termino pero sigue cargando (true)
        }
      }, 2000);
    });
  }; 