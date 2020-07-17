const DBMysql      = require('../../Database/DBMysql')
const mySQLWrapper = require('../../Database/DBWrapper')

class Vehicle extends DBMysql
{
    /**
     * Overrides TABLE_NAME with this class' backing table at MySQL
     */
    static get TABLE_NAME()
    {
        return 'vehicles'
    }
    /**
     * Returns a Vehicle by its ID
     */
    static async getByID(_, {id})
    {
        return await this.find(id)
    }
    /**
     * Returns a list of Vehicles matching the passed fields
     * @param {*} fields - Fields to be matched
     */
    static async findMatching(_, fields)
    {
        // Returns early with all Vehicles if no criteria was passed
        if (Object.keys(fields).length === 0) return this.findAll()    
        // Find matching Vehicles
        return this.findByFields({
            fields
        })
    }
    /**
     * Creates a new Vehicle
     */
    static async createEntry(_, {type, price})
    {
        const connection = await mySQLWrapper.getConnectionFromPool()
        try
        {
            let _result = await this.insert(connection,
            {
                data:
                {
                    type,
                    price
                }
            })

            return this.getByID(_, {id: _result.insertId})
        }
        finally
        {
            // Releases the connection
            if (connection != null) connection.release()
        }
    }
    /**
     * Updates a Vehicle 
     */
    static async updateEntry(_, {id, type, price})
    {
        const connection = await mySQLWrapper.getConnectionFromPool()
        try
        {
            await this.update(connection,
            {
                id,
                data:
                {
                    type,
                    price
                }
            })
            return this.getByID(_, {id})
        }
        finally
        {
            // Releases the connection
            if (connection != null) connection.release()
        }
    }
}
module.exports = Vehicle