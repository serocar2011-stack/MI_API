# API - Sistema de Gestión de Librería e Impresiones

Este proyecto es una API REST robusta desarrollada con **Node.js** y **Express**, diseñada para gestionar una librería y un sistema de pedidos de impresión. Incluye autenticación de usuarios, gestión de inventario y procesamiento automático de costos de impresión.

## Características Principales 

### 📚 Sección de Librería
*   **Gestión de Categorías**: CRUD completo para organizar productos.
*   **Gestión de Productos**: Control total sobre el inventario (nombre, precio, descripción, stock, imágenes, etc.).

### 🖨️ Pedidos de Impresión
*   **Cálculo Automático**: Procesa el precio total basado en el tipo de impresión (simple/doble faz, blanco y negro/color) y cantidad de páginas.
*   **Gestión Integral**: Vinculación de clientes con sus respectivos archivos y estados de pedido.
*   **Seguimiento**: Control de estados de impresión (ej. "printing", "completed").

### 🔐 Seguridad y Usuarios
*   **Autenticación JWT**: Rutas protegidas mediante JSON Web Tokens.
*   **Encriptación**: Contraseñas seguras procesadas con Bcrypt.

---

## Tecnologías Utilizadas

*   **Backend**: Node.js, Express.js
*   **Base de Datos Local**: MongoDB con Mongoose (ODM).
*   **Base de Datos en la Nube**: Atlas MongoDB.
*   **Autenticación**: JSON Web Token (JWT), Bcrypt.
*   **Otros**: Dotenv.


## Prerequisitos
- **Node.js instalado.
- **MongoBD instalado.



---

## Instalación y Configuración

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/serocar2011-stack/MI_API.git
   cd mi_api
   ```

2. **Instalar dependencias:**
   Ejecuta el siguiente comando para instalar todas las librerías necesarias:
   ```bash
   npm install express mongoose bcryptjs jsonwebtoken dotenv
   ```

3. **Configurar variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:
   ```env
   PORT=...
   MONGO_URI=...
   JWT_SECRET=...
   ```

4. **Iniciar el servidor:**
    
 - Modo desarrollo: `npm run dev`

 - Modo producción: `npm start`


---

## 📂 Estructura del Proyecto

```text
mi_api/
├── scripts/
│   └── createAdmin.js      # Script para inicialización de administrador
├── src/
│   ├── config/             # Configuración de DB y variables de entorno
│   │   ├── config.js
│   │   └── db.js
│   ├── controllers/        # Lógica de los endpoints (manejadores de peticiones)
│   │   ├── categoryController.js
│   │   ├── clienteController.js
│   │   ├── fileController.js
│   │   ├── fullPrintJobController.js
│   │   ├── printJobController.js
│   │   ├── productController.js
│   │   └── userController.js
│   ├── helpers/            # Funciones de ayuda reutilizables
│   │   └── checkExist.js
│   ├── middlewares/        # Middlewares de Express (validaciones, JWT)
│   │   └── verifyTokenMiddleware.js
│   ├── models/             # Modelos de datos (Mongoose Schemas)
│   │   ├── categoryModel.js
│   │   ├── clienteModel.js
│   │   ├── fileModel.js
│   │   ├── printJobModel.js
│   │   ├── productModel.js
│   │   └── userModel.js
│   ├── routes/             # Definición de rutas y endpoints
│   │   ├── categoryRouter.js
│   │   ├── clienteRoutes.js
│   │   ├── fileRoutes.js
│   │   ├── fullPrintJobRoutes.js
│   │   ├── printJobRoutes.js
│   │   ├── productRoutes.js
│   │   └── userRoutes.js
│   ├── services/           # Lógica de negocio y comunicación con la DB
│   │   ├── categoryService.js
│   │   ├── clienteService.js
│   │   ├── fileService.js
│   │   ├── fullPrintJobService.js
│   │   ├── printJobService.js
│   │   ├── productService.js
│   │   └── userService.js
│   └── utils/              # Utilidades varias (errores, cálculos)
│       ├── calculatePrintJobTotal.js
│       ├── errorHandler.js
│       └── verifyToken.js
├── .env                    # Variables de entorno (No incluido en Git)
├── .env.example            # Ejemplo de variables de entorno
├── .gitignore              # Archivos ignorados por Git
├── index.js                # Punto de entrada de la aplicación
├── package-lock.json       # Historial de versiones de dependencias
├── package.json            # Scripts y dependencias del proyecto
└── README.md               # Documentación del proyecto
```



## Inicialización y creación de usuario administrador

⚠️ Para poder iniciar la administración de la aplicación es necesaria la creación de un usuario administrador mediante la ejecución del siguiente comando **dentro de la carpeta scripts:**

```bash
node createAdmin.js
```

Este comando permitirá crear un usuario administrador para acceder a las funcionalidades de la API.

la respuesta exitosa sera la siguiente:

```json
{
    "message": "Administrador creado exitosamente",
    "user": {
        "email": "[EMAIL_ADDRESS]",
        "password": "[PASSWORD]"
    }
}
```


## Login

Para iniciar sesion como administrador se debe enviar un correo y una contraseña al siguiente endpoint:

**Endpoint:** POST /api/user/login


```json
{
    "email": "[EMAIL_ADDRESS]",
    "password": "[PASSWORD]"
}
```
En la respuesta se recibira un token JWT que deberá ser utilizado para las peticiones que requieran autenticación como administrador. Este token se debera colocar en el header Authorization.

---
## Ejemplos de Peticiones (Mocks)

Para facilitar las pruebas de la API, se han creado ejemplos de peticiones en formato JSON.



## Registro de Usuarios

> ⚠️ Requiere autenticación (token JWT en el header `Authorization`).

**Endpoint:** `POST /api/user`

```json
{
  "name": "juan",
  "lastName": "perez",
  "email": "juan.perez1@gmail.com",
  "password": "Password1"
}
```

Respuesta exitosa (`201 Created`):
```json
{
  "message": "User created",
  "data": {
    "_id": "664a1f...",
    "name": "juan",
    "lastName": "perez",
    "email": "juan.perez1@gmail.com",
    "createdAt": "2026-04-22T11:00:00.000Z",
    "updatedAt": "2026-04-22T11:00:00.000Z"
  }
}
```

**Endpoint:** `GET /api/user`
> ⚠️ Requiere autenticación.
Trae el listado de todos los usuarios registrados.

**Endpoint:** `PUT /api/user/:id`
> ⚠️ Requiere autenticación.
Actualiza los datos de un usuario por su ID.

**Endpoint:** `DELETE /api/user/:id`
> ⚠️ Requiere autenticación.
Elimina un usuario por su ID.

> ℹ️ Reglas de contraseña: debe contener al menos un número, una mayúscula y tener entre 6 y 16 caracteres.

---

## Login Users
De igual modo que con el login de administrador, se debe enviar un correo y una contraseña al siguiente endpoint:

**Endpoint:** POST /api/user/login


```json
{
    "email": "[EMAIL_ADDRESS]",
    "password": "[PASSWORD]"
}
```


## Categorías

> ⚠️ Requiere autenticación (token JWT en el header `Authorization`).

**Endpoint:** `POST /api/categories`

```json
{
  "name": "cuadernos"
}
```

Respuesta exitosa (`201 Created`):
```json
{
  "_id": "664b2a...",
  "name": "cuadernos",
  "createdAt": "2026-04-22T11:00:00.000Z",
  "updatedAt": "2026-04-22T11:00:00.000Z"
}
```

**Endpoint:** `GET /api/categories`
> ⚠️ Requiere autenticación.
Trae el listado de todas las categorías.

**Endpoint:** `DELETE /api/categories/:id`
> ⚠️ Requiere autenticación.
Elimina una categoría por su ID.

---

## Productos

> ⚠️ Requiere autenticación (token JWT en el header `Authorization`).
> ℹ️ La categoría debe existir previamente en la base de datos.

**Endpoint:** `POST /api/products`

```json
{
  "name": "cuaderno universitario rayado",
  "price": 5.50,
  "description": "cuaderno universitario de 80 hojas rayadas tapa dura",
  "quantity": 50,
  "status": "AVAILABLE",
  "category": "cuadernos",
  "image": "https://example.com/images/cuaderno-rayado.jpg",
  "highlighted": true
}
```

> Valores válidos para `status`: `"AVAILABLE"` | `"NOT AVAILABLE"` | `"DISCONTINUED"`

Respuesta exitosa (`201 Created`):
```json
{
  "_id": "664c3b...",
  "name": "cuaderno universitario rayado",
  "price": "5.50",
  "description": "cuaderno universitario de 80 hojas rayadas tapa dura",
  "quantity": 50,
  "status": "AVAILABLE",
  "category": "664b2a...",
  "image": "https://example.com/images/cuaderno-rayado.jpg",
  "highlighted": true,
  "profitRate": 1.20,
  "finalPrice": 6.60,
  "createdAt": "2026-04-22T11:00:00.000Z",
  "updatedAt": "2026-04-22T11:00:00.000Z"
}
```

**Endpoint:** `GET /api/products`
Trae el listado de todos los productos. Incluye datos de la categoría.

**Endpoint:** `GET /api/products/:id`
Trae un producto específico por su ID.

**Endpoint:** `PUT /api/products/:id`
> ⚠️ Requiere autenticación.
Actualiza los datos de un producto. Se puede actualizar la categoría enviando el nombre de la misma.

**Endpoint:** `DELETE /api/products/:id`
> ⚠️ Requiere autenticación.
Elimina un producto por su ID.

---

## Pedido de Impresión Completo (Cliente + Archivos)

> ℹ️ Endpoint público, no requiere autenticación.
> ℹ️ El precio total se calcula automáticamente según el tipo de impresión de cada archivo.

**Endpoint:** `POST /api/fullprintjobs`

```json
{
  "cliente": {
    "nombre": "juan",
    "apellido": "perez",
    "telefono": "3442478901",
    "email": "juan.perez1@gmail.com"
  },
  "files": [
    {
      "fileName": "tp_programacion.pdf",
      "fileUrl": "https://files.com/tp_programacion.pdf",
      "pages": 10,
      "color": "Blanco y negro",
      "faz": "simple"
    },
    {
      "fileName": "diagramas.pdf",
      "fileUrl": "https://files.com/diagramas.pdf",
      "pages": 8,
      "color": "Color",
      "faz": "doble"
    }
  ]
}
```

> Valores válidos para `color`: `"Blanco y negro"` | `"Color"`
> Valores válidos para `faz`: `"simple"` | `"doble"`

Respuesta exitosa (`201 Created`):
```json
{
  "_id": "664d4c...",
  "cliente": {
    "_id": "664e5d...",
    "nombre": "juan",
    "apellido": "perez",
    "telefono": "3442478901",
    "email": "juan.perez1@gmail.com"
  },
  "totalPages": 18,
  "totalPrice": 2100,
  "status": "pending",
  "files": [
    {
      "_id": "664f6e...",
      "fileName": "tp_programacion.pdf",
      "fileUrl": "https://files.com/tp_programacion.pdf",
      "pages": 10,
      "color": "Blanco y negro",
      "faz": "simple"
    },
    {
      "_id": "664f6f...",
      "fileName": "diagramas.pdf",
      "fileUrl": "https://files.com/diagramas.pdf",
      "pages": 8,
      "color": "Color",
      "faz": "doble"
    }
  ],
  "createdAt": "2026-04-22T11:00:00.000Z",
  "updatedAt": "2026-04-22T11:00:00.000Z"
}
```

**Endpoint:** `GET /api/fullprintjobs`
> ⚠️ Requiere autenticación.
Trae todos los pedidos de impresión completos.

**Endpoint:** `GET /api/fullprintjobs/:id`
> ⚠️ Requiere autenticación.
Trae un pedido de impresión específico por su ID.

**Endpoint:** `DELETE /api/fullprintjobs/:id`
> ⚠️ Requiere autenticación.
Elimina un pedido de impresión.

---

## Clientes

> ℹ️ Gestión de clientes registrados en el sistema.

**Endpoint:** `GET /api/clientes`
> ⚠️ Requiere autenticación.

**Endpoint:** `POST /api/clientes`
> ℹ️ Endpoint público, no requiere autenticación, se crea con pedido de impresión completo.
Crea un nuevo cliente.

**Endpoint:** `PATCH /api/clientes/:id`
> ⚠️ Requiere autenticación.
Actualización parcial de los datos de un cliente.

**Endpoint:** `DELETE /api/clientes/:id`
> ⚠️ Requiere autenticación.
Elimina un cliente.

