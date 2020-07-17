const mysql            = require('./DBWrapper')
const { sqlConstants } = require('../Util/SQLConstant')
class DBMysql
{
    /**
     * Método permite sobreescribir cuando la columa ID sea diferente de 'id'
     */
    static get PRIMARY_KEY()
    {
        return "id"
    }
    /**
     * Se obtiene un registro según el 'id' que se pase por parámetro
     * @param {Number} id - El ID a consultar
     */
    static async find(id)
    {
        return (await mysql.createQuery({
            query: `SELECT * FROM ?? WHERE ?? = ? LIMIT 1;`,
            params: [this.TABLE_NAME, this.PRIMARY_KEY, id]
        })).shift()
    }
    /**
     * Retonar todos los datos almacenados en la tabla = TABLE_NAME
     * TABLE_NAME se define en la clases de la carpeta Mutation/??? ???.js
     */
    static findAll()
    {
        return mysql.createQuery({
            query: `SELECT * FROM ??;`,
            params: [this.TABLE_NAME]
        });
    }
    /**
     * obtener datos según filtros
     * @param {Object} fields - Filtro de busqueda
     * @param {Object} limit - Número de datos a devolver
     * @param {Object} order - Orden de los datos que viene en la consulta a mysql
     */
    static findByFields({fields, limit, order})
    {
        let baseQuery = `SELECT * FROM ?? WHERE `
        let params = [this.TABLE_NAME]
        Object.keys(fields).forEach((key, index) =>
        {
            baseQuery += `${key} = ?`
            params.push(fields[key])
            if (index + 1 !== Object.keys(fields).length) baseQuery += " AND "
        })
        if (order != null && order.by != null && order.direction != null)
        {
            baseQuery += ` ORDER BY ??`
            baseQuery += order.direction === sqlConstants.DESC ? " DESC" : " ASC"
            params.push(order.by)
        }
        if (limit != null && !isNaN(limit))
        {
            baseQuery += " LIMIT ?"
            params.push(limit)
        }
        return mysql.createQuery({
            query: baseQuery,
            params
        })
    }
    /**
     * Modificar un registro
     * @param {MySQL.Connection} connection - La conexión en que se hará el update. Debería de hacer un released inmediatamente en transacción
     * @param {Object} data - Los datos a modificar
     * @param {Number} id - El ID del registro a modificar
     */
    static update(connection, {data, id})
    {
        return mysql.createTransactionalQuery({
            query: `UPDATE ??
                    SET ?
                    WHERE ?? = ?;`,
            params: [this.TABLE_NAME, data, this.PRIMARY_KEY, id],
            connection
        })
    }
    /**
     * Agregar un registro
     * @param {MySQL.Connection} connection - La conexión que insertará el registro
     * @param {Object} data - Los datos a insertar
     */
    static insert(connection, {data})
    {
        return mysql.createTransactionalQuery({
            query: `INSERT INTO ${this.TABLE_NAME}
                    SET ?;`,
            params: [data],
            connection
        })
    }
    /**
     * Eliminar un registro
     * @param {MySQL.Connection} connection - La conexión que eliminará el registro
     * @param {Number} id - El ID a eliminar
     */
    static delete(connection, {id})
    {
        return mysql.createTransactionalQuery({
            query: `DELETE FROM  ??
                    WHERE ?? = ?;`,
            params: [this.TABLE_NAME,this.PRIMARY_KEY, id],
            connection
        })
    }
}
module.exports = DBMysql