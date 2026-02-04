# Sistema de Gestión de Usuarios

Aplicación Angular para la gestión de usuarios con dashboard administrativo y sistema de solicitudes.

## Configuración del Entorno

### Variables de Entorno

El proyecto utiliza archivos de configuración de entorno ubicados en `src/environments/`:

**Desarrollo (`environment.ts`):**
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3001/api'
};
```

**Producción (`environment.prod.ts`):**
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-api-url.com/api'
};
```

### Usuario Demo

Para probar la aplicación, crea el siguiente usuario en tu base de datos:

```
Email: admin@test.com
Contraseña: admin123
Rol: admin
```

## Instalación y Configuración

1. **Instalar dependencias:**
```bash
npm install
```

2. **Configurar variables de entorno:**
   - Actualiza `src/environments/environment.ts` con la URL de tu API
   - Para producción, actualiza `src/environments/environment.prod.ts`

3. **Iniciar servidor de desarrollo:**
```bash
ng serve
```

4. **Acceder a la aplicación:**
   - URL: `http://localhost:4200/`
   - Login con: `admin@test.com` / `admin123`

## Vistas de la Aplicación

### 🔐 Login
- Autenticación de usuarios
- Validación de credenciales
- Redirección automática al dashboard
- <img width="1395" height="948" alt="Screenshot from 2026-02-04 12-07-24" src="https://github.com/user-attachments/assets/352fbe95-3240-4aae-a0d8-1196c15f61e2" />


### 📊 Dashboard
- **Solicitudes Pendientes**: Widget clickeable que muestra solicitudes de usuarios por aprobar
- **Usuarios Activos**: Contador de usuarios activos en el sistema
- **Administradores**: Número total de usuarios con rol admin
- **Nuevos este mes**: Usuarios registrados en el mes actual
- **Gráficos**: Visualización de datos por rol y crecimiento de usuarios
- **Acciones rápidas**: Acceso directo a gestión de usuarios
- <img width="1594" height="961" alt="Screenshot from 2026-02-04 12-07-57" src="https://github.com/user-attachments/assets/2b3b8282-84e5-4125-be6a-db5d89681894" />


### 👥 Gestión de Usuarios
- **Lista de usuarios**: Vista en cards con información completa
- **Crear usuario**: Formulario para registro de nuevos usuarios
- **Eliminar usuario**: Funcionalidad con modal de confirmación
- **Filtros por rol**: Admin y Natural
- **Información mostrada**: Email, cédula, tipo documento, teléfono, rol
- <img width="1594" height="961" alt="Screenshot from 2026-02-04 12-08-20" src="https://github.com/user-attachments/assets/b6258cff-8bfe-4e9b-9ef4-134a6aa67120" />
- <img width="1594" height="961" alt="Screenshot from 2026-02-04 12-08-33" src="https://github.com/user-attachments/assets/236cdcf5-0e22-40e7-ba79-cab550a93ce4" />
- <img width="1594" height="961" alt="Screenshot from 2026-02-04 12-08-50" src="https://github.com/user-attachments/assets/9a3cd23c-c440-4cea-be48-e8c56657df6c" />


### 📋 Solicitudes de Usuarios
- **Tabla de solicitudes**: Lista completa de solicitudes pendientes
- **Estados**: Pendiente, Aprobada, Rechazada
- **Acciones**: Aprobar o rechazar solicitudes
- **Información detallada**: Todos los datos del solicitante
- **Navegación**: Acceso directo a gestión de usuarios
- <img width="1594" height="961" alt="Screenshot from 2026-02-04 12-08-08" src="https://github.com/user-attachments/assets/1b96ecc5-324d-4c05-a779-d972020f132e" />


## Desarrollo

### Servidor de desarrollo
```bash
ng serve
```
Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente cuando modifiques los archivos fuente.

### Construcción
```bash
ng build
```
Los artefactos de construcción se almacenarán en el directorio `dist/`.

### Construcción para producción
```bash
ng build --configuration production
```

### Pruebas unitarias
```bash
ng test
```

### Pruebas end-to-end
```bash
ng e2e
```

## Estructura del Proyecto

```
src/
├── app/
│   ├── core/                 # Servicios y modelos principales
│   │   ├── guards/           # Guards de autenticación
│   │   ├── models/           # Interfaces y modelos
│   │   └── services/         # Servicios de API
│   ├── features/             # Módulos de funcionalidades
│   │   ├── auth/             # Autenticación
│   │   ├── dashboard/        # Dashboard principal
│   │   ├── users/            # Gestión de usuarios
│   │   └── user-requests/    # Solicitudes de usuarios
│   └── shared/               # Componentes compartidos
│       └── components/       # Widgets y componentes reutilizables
└── environments/             # Configuración de entornos
```

## Tecnologías Utilizadas

- **Angular 21.1.2**: Framework principal
- **TypeScript**: Lenguaje de programación
- **RxJS**: Programación reactiva
- **Angular Material**: Componentes de UI
- **SCSS**: Preprocesador CSS

## Recursos Adicionales

Para más información sobre Angular CLI, visita la [documentación oficial](https://angular.dev/tools/cli).
