// Componente que muestra pantalla de carga
const SplashScreen = ({ isLoading, error }) => {
  // Si no está cargando, no renderizar nada
  if (!isLoading) return null;

  return (
    <>
      {error ? (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          zIndex: 9999
        }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>❌ {error}</p>
          <p style={{ fontSize: '1rem', opacity: 0.8 }}>Verifica tu conexión e intenta nuevamente</p>
        </div>
      ) : (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          zIndex: 9999
        }}>
          <h2 style={{ fontSize: '2rem', textAlign: 'center' }}>
            📇 Iniciando Contact Manager...
          </h2>
        </div>
      )}
    </>
  );
};

export default SplashScreen; 