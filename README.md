# Creación de API - Fabricio Vega Ugalde

Este ejercicio permite realizar un crud de vehiculos (consultar, insertar, modificar y eliminar), implementando la metodología de GraphQL y almacenando los registros en un gestor de base de datos.

Para realizar la implementación del API, se utilizó:

>Express: Como servicio de backend

>Graphql: Permite el manejo del -routes, resolvers, mutations y queries-

>Mysql: Almacenamiento de la información, el backup se encuentra en la carpeta Database/backup.sql

Para la creación del proyecto se inicia con los siguiente comandos.

Ejecutar 1 a 1:

 ```
 npm install express express-graphql graphql --save
 npm install mysql
 ```

La estructura de la implementación queda de la siguiente forma:

- Util/
    - SQLConstant.js *Permmite conocer el orden de una consulta a mysql*
    - Util.js *Permite conocer si se está o no en modo de producción*
- Database/
    - MySQLConnector.js *Conexión a la BD y ejecuta un hilo*
    - DBWapper.js *Ejecuta las queries, commids, rollbacks*
    - DBMysql.js *Ejecuta las queries y devuelve un objeto tipo: promise*
- Models/
    - Vehicles/
        - type.js *Todos los campos de una tabla*
        - vehicle.js *Nombre de la tabla en base, nombre del identificador: ID, puente a la base de datos para ejecutar consultas* 
        - mutations.js *Define las mutations al estilo graphql*
        - queries.js *Define los queries al estilo graphql*
- Schema/
    - mutations.js *Resolver que llamada a los mutations definidos anteriormente*
    - queries.js *Resolver que llama a los queries definidos anteriormente*
    - index.js *Retorna un modulo de ls mutations y de los queries*
- Routes/
    - index.js *Crea la instancia con graphql*
    - graphql.js *Manejo de las rutas get y post*
- index.js

Este ultimo archivo **index.js** es el que se encarga de levantar la aplicación y definir los modulos requeridos.

Se buscar la url indicada en la consola: *http://localhost:4000/graphql*

Y luego se ejecuta en el play ground lo siguiente a modo de prueba:

```
    {
        vehicles{
            color
        }
    }   
```

Con ello debería retornar todos los colores de los vehículos en la base de datos