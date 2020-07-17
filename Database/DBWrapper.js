const mySQLConnector = require('./MySQLConnector')
module.exports = class DBWrapper {
    /**
     * Queries de la base de datos
     * @param {String} query - La querie a ejecutar
     * @param {Array} params - Los parámetros que evitan la inyección sql
     * @returns {Promise} - El promise, que es el resutado de la query
     */
    static createQuery({query, params}) {
        return new Promise((succeed, fail) => {
            mySQLConnector.pool.getConnection((err, connection) => {
                //Si ocurre algún error
                if (err) {
                    return fail(err)
                }
                //se ejecuta la querie
                connection.query(query, params, (err, rows) => {
                    connection.release()
                    if (err) {
                        return fail(err)
                    }
                    return succeed(rows)
                })
            })
        })
    }
    /** 
     * Ejecutar una transacción
     * @param {MySQL.Connection} connection - La conexión al BD que se usará
     * @param {String} query - La querie a ejecutar
     * @param {Array} params - Parámetros que evitan inyección SQL
     * @returns {Promise} - The promise
     */
    static createTransactionalQuery({query, params, connection})
    {
        return new Promise((succeed, fail) =>
        {
            connection.query(query, params, (err, rows) =>
            {        
                if (err) {
                    return fail(err)
                }    
                return succeed(rows)
            })
        })
    }
    /**
     * Transacción -Rollbacks-
     * @param {MySQL.Connection} connection - La conexión que ejecutará el rollback
     * @returns {Promise} - El promise a devolver
     */
    static rollback(connection)
    {
        return new Promise((succeed, fail) =>
        {
            try
            {
                connection.rollback(() => succeed())
            } catch (e)
            {
                return fail(e)
            } finally
            {
                connection.release()
            }
        })
    }

    /**
     * Realizar el commit
     * @param {MySQL.Connection} connection - La conexión que ejecutará el commited
     * @returns {Promise} - El promise que retorna
     */
    static commit(connection)
    {
        return new Promise((succeed, fail) =>
        {
            try
            {
                connection.commit(err =>
                { 
                    if (err)
                    { 
                        return rollback(connection, err)
                    }
                    return succeed()
                })
            }
            catch (e)
            {
                return fail(e)
            }
            finally
            {
                connection.release()
            }
        })
    }
    /** 
     * Devuelve una conexión para ejecutar las diferentes consultas
     * @param {MySQL.Connection} connection - La conexión a devolver
     */
    static getConnectionFromPool() {
        return new Promise((succeed, fail) =>
        {
            mySQLConnector.pool.getConnection((err, connection) =>
            {
                if (err)
                {
                    return fail(err)
                }
                return succeed(connection)
            })
        })
    }

    /**
     * Inicio de la transacción a ejecutar
     * @param {MySQL.Connection} connection - Devuelve la conexión
     */
    static beginTransaction(connection) {
        return new Promise((succeed, fail) =>
        {
            connection.beginTransaction(err =>
                {
                if (err)
                {
                    return fail(err)
                }
                return succeed(connection)
            })
        })
    }
}
