const { GraphQLObjectType } = require('graphql')
const vehicleQueries = require('../Models/vehicles/queries')

module.exports = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        vehicle: vehicleQueries.vehicle,
        vehicles: vehicleQueries.vehicles
    }
})