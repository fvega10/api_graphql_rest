const { 
    GraphQLNonNull,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLInt
} = require('graphql')
const type    = require('./type')
const Vehicle = require('./vehicle')

// Defines the mutations
module.exports =
{
    addVehicle:
    {
        type,
        args:
        {
            color:        { type: new GraphQLNonNull(GraphQLString) },
            year:         { type: new GraphQLNonNull(GraphQLInt)    },
            manufacturer: { type: new GraphQLNonNull(GraphQLString) },
            mileage:      { type: new GraphQLNonNull(GraphQLInt)    },
        },
        resolve: Vehicle.createEntry.bind(Vehicle)
    },
    updateVehicle:
    {
        type,
        args:
        {
            id:           { type: GraphQLID                         },
            color:        { type: new GraphQLNonNull(GraphQLString) },
            year:         { type: new GraphQLNonNull(GraphQLInt)    },
            manufacturer: { type: new GraphQLNonNull(GraphQLString) },
            mileage:      { type: new GraphQLNonNull(GraphQLInt)    },
        },
        resolve: Vehicle.updateEntry.bind(Vehicle)
    }
}