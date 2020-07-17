const { GraphQLList,
        GraphQLID,
        GraphQLString,
        GraphQLInt }   = require('graphql')
const type             = require('./type')
const mutation         = require('./mutations')
const Vehicle          = require("./vehicle")

// Se definen las queries
module.exports =
{
    vehicles:
    {
        type: new GraphQLList(type),
        args:
        {
            color:
            {
                type: GraphQLString
            },
            year:
            {
                type: GraphQLInt
            },
            manufacturer:
            {
                type: GraphQLString
            },
            mileage:
            {
                type: GraphQLInt
            }
        },
        resolve: Vehicle.findMatching.bind(Vehicle)
    },
    vehicle: 
    {
        type,
        args:
        {
            id:
            {
                type: GraphQLID
            }
        },
        resolve: Vehicle.getByID.bind(Vehicle)
    }
}