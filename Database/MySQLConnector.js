const mysql = require('mysql')
class MySQLConnector
{
    get MYSQL_DB_USER()      { return process.env.MYSQL_DB_USER || 'root'         }
    get MYSQL_DB_NAME()      { return process.env.MYSQL_DB_NAME || 'api_graphql'  }
    get MYSQL_DB_PASSWORD()  { return process.env.MYSQL_DB_PASSWORD || '123456'   }
    get MYSQL_DB_ADDRESS()   { return process.env.MYSQL_DB_ADDRESS || 'localhost' }
    get MYSQL_DB_POOL_SIZE() { return process.env.MYSQL_DB_POOL_SIZE || 10        }
    constructor()
    {
        //Se crea la instancia para la conexión
        this.internalPool = mysql.createPool({
            host: this.MYSQL_DB_ADDRESS,
            user: this.MYSQL_DB_USER,
            database: this.MYSQL_DB_NAME,
            password: this.MYSQL_DB_PASSWORD,
            connectionLimit: this.MYSQL_DB_POOL_SIZE,
            waitForConnections: true
        })
        //Permite mejor control para mantener sesiónes de conexiones
        this.registerThreadCounter()
    }
    /**
     * Método permite crear un hilo con cada solicitud de conexión
     * Imprime en consola los datos del nuevo hilo, pero se validad que solo se ejecute en modo de producción
     */
    registerThreadCounter()
    {
        this.internalPool.on('connection', (connection) => console.log(`New connection stablished with server on thread #${connection.threadId}`))
    }
    /** 
     * Retrieves the connection pool
     */
    get pool()
    {
        return this.internalPool
    }
}
//Exporta la conexión que será utilizada en el wrapper
module.exports = new MySQLConnector()