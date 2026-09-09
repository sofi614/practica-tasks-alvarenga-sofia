# Investigación sobre dotenv

## ¿Qué es dotenv?

`dotenv` es un paquete de Node.js que carga variables definidas en un archivo
`.env` y las agrega a `process.env`. Permite separar la configuración del
código fuente y evita escribir credenciales, puertos u otros valores que
pueden cambiar entre ambientes directamente en los archivos JavaScript.

El archivo `.env` no debe subirse al repositorio porque puede contener
contraseñas o claves privadas. Para documentar las variables necesarias se
puede versionar un archivo `.env.example` sin valores sensibles.

## Instalación

Desde la carpeta raíz del proyecto se ejecuta:

```bash
npm install dotenv
```

En este proyecto el paquete ya está declarado en `package.json`.

## Configuración

Se crea un archivo `.env` en la raíz del proyecto:

```env
DB_NAME=tasks_users_db
DB_USER=root
DB_PASSWORD=mi_password_local
DB_HOST=localhost
PORT=3000
```

Con módulos ESModules se puede cargar dotenv al inicio del archivo mediante:

```js
import "dotenv/config";
```

También es posible usar `dotenv.config()`, pero la forma anterior es más
directa para este proyecto.

## Acceso a las variables

Después de cargar dotenv, las variables se leen desde `process.env`:

```js
const port = process.env.PORT || 3000;
const databaseName = process.env.DB_NAME || "tasks_users_db";
```

Los valores de `process.env` son cadenas, por lo que los valores numéricos o
booleanos deben convertirse explícitamente cuando sea necesario.

## Aplicación en este proyecto

La configuración de Sequelize en `src/config/database.js` carga dotenv y usa
las variables del entorno para conectarse a MySQL:

```js
import "dotenv/config";
import { Sequelize } from "sequelize";

const databaseName = process.env.DB_NAME || "tasks_users_db";
const databaseUser = process.env.DB_USER || "root";
const databasePassword = process.env.DB_PASSWORD || "";
const databaseHost = process.env.DB_HOST || "localhost";

export const sequelize = new Sequelize(
    databaseName,
    databaseUser,
    databasePassword,
    {
        host: databaseHost,
        dialect: "mysql",
        logging: false
    }
);
```

De esta forma, el mismo código puede conectarse a distintas bases de datos
sin modificar los modelos ni publicar credenciales. Si una variable no está
definida, se utiliza un valor predeterminado para el desarrollo local.