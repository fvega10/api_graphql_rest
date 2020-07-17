const { GraphQLObjectType } = require('graphql')
const vehicleMutation       = require('../Models/vehicles/mutations')

module.exports = new GraphQLObjectType({
    name: 'RootMutationsType',
    fields: {
        addVehicle: vehicleMutation.addVehicle,
        updateVehicle: vehicleMutation.updateVehicle
    }
})