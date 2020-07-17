let {
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLList
} = require('graphql')

// Defines the type
module.exports = new GraphQLObjectType({
    name: 'Vehicle',
    description: 'A Vehicle',
    fields:
    {
        id:
        {
            type: new GraphQLNonNull(GraphQLID)
        },
        color:
        {
            type: new GraphQLNonNull(GraphQLString)
        },
        year:
        {
            type: new GraphQLNonNull(GraphQLInt)
        },
        manufacturer:
        {
            type: new GraphQLNonNull(GraphQLString)
        },
        mileage:
        {
            type: new GraphQLNonNull(GraphQLInt)
        }
    }
})