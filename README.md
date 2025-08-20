# 📞 Gestor de Contactos

Una aplicación moderna e intuitiva para gestionar contactos, desarrollada con React y Vite, diseñada para ayudarte a organizar y administrar tus contactos personales o profesionales de manera eficiente.

## ✨ Características

- **📝 Agregar Nuevos Contactos**: Crea perfiles detallados con información esencial
- **🔍 Buscar y Filtrar**: Encuentra contactos rápidamente con funcionalidad de búsqueda inteligente
- **✏️ Editar y Actualizar**: Modifica la información de contactos sin problemas
- **🗑️ Eliminar Contactos**: Remueve contactos no deseados con confirmación
- **📱 Diseño Responsivo**: Funciona perfectamente en escritorio, tablet y móvil
- **🎭 Pantalla de Bienvenida**: SplashScreen inicial con loading
- **📊 Ordenamiento**: Dropdown para organizar contactos
- **⚡ Carga Asíncrona**: Manejo de estados de carga y errores
- **🔄 Auto-retry**: Sistema de reintento automático para cargar datos

## 🚀 Inicio Rápido

### Prerequisitos

Asegúrate de tener instalado lo siguiente:
- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/JoseVelis/contact-manager
   cd contact-manager
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. **Abrir en el navegador**
   Navega a `http://localhost:5173` para ver la aplicación funcionando.

## 🛠️ Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo con recarga automática |
| `npm run build` | Crea una versión de producción |
| `npm run preview` | Previsualiza la versión de producción localmente |
| `npm run lint` | Ejecuta ESLint para verificar la calidad del código |

## 🏗️ Stack Tecnológico

- **Framework Frontend**: [React 18](https://reactjs.org/)
- **Herramienta de Build**: [Vite](https://vitejs.dev/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Gestión de Estado**: React Hooks / [Agrega si usas Redux, Zustand, etc.]
- **Herramientas de Desarrollo**: ESLint, Hot Module Replacement (HMR)

## 📁 Estructura del Proyecto

```
contact-manager/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ContactCard.jsx
│   │   ├── ContactForm.jsx
│   │   ├── ContactList.jsx
│   │   ├── Copyright.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── SearchBar.jsx
│   │   ├── SortDropdown.jsx
│   │   └── SplashScreen.jsx
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── tailwind.config.js
└── vite.config.js
```

## 🎨 Capturas de Pantalla

*[Agrega capturas de pantalla de tu aplicación aquí]*

## 🔧 Funcionalidades Implementadas

### Componentes Principales

- **🏠 App.jsx**: Componente principal con gestión de estado y lógica de inicialización
- **💳 ContactCard**: Tarjetas individuales para mostrar información de contactos
- **📝 ContactForm**: Formulario para agregar/editar contactos
- **📋 ContactList**: Lista principal de contactos con funcionalidades de filtrado
- **🔍 SearchBar**: Barra de búsqueda inteligente
- **📊 SortDropdown**: Menú desplegable para ordenar contactos
- **🎭 SplashScreen**: Pantalla de carga inicial con logo y loading
- **🎚️ Header**: Encabezado de la aplicación
- **🦶 Footer**: Pie de página con información de copyright

### Servicios y Utilidades

- **📡 Services**: Manejo de datos y API calls
- **🛠️ Utils**: Funciones utilitarias para filtrado y ordenamiento (`filterContacts`, `sortContacts`)

## 🔧 Configuración Avanzada

### Expandir la configuración de ESLint

Si estás desarrollando una aplicación para producción, recomendamos usar TypeScript con reglas de lint conscientes de tipos habilitadas. Consulta la [plantilla de TS](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) para información sobre cómo integrar TypeScript y `typescript-eslint` en tu proyecto.

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto para configurar variables de entorno:

```env
# Ejemplo de variables de entorno
VITE_APP_NAME=Gestor de Contactos
VITE_APP_VERSION=1.0.0
```

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si quieres contribuir a este proyecto:

1. Haz fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Realiza tus cambios y commitea (`git commit -m 'Agregar nueva característica'`)
4. Haz push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📋 Roadmap

- [ ] Integración con base de datos
- [ ] Exportar/importar contactos
- [ ] Categorías de contactos
- [ ] Búsqueda avanzada con filtros
- [ ] Tema oscuro/claro
- [ ] Sincronización en la nube

## 🐛 Reportar Problemas

Si encuentras algún bug o tienes sugerencias, por favor [abre un issue](https://github.com/tuusuario/contact-manager/issues) en GitHub.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@tuusuario](https://github.com/tuusuario)
- Email: tu.email@ejemplo.com

---

⭐ Si este proyecto te fue útil, ¡no olvides darle una estrella en GitHub!