const { graphqlHTTP } = require('express-graphql')
const router          = require('express').Router()
const util            = require('../Util/Util')
const schema          = require('../Schema/index')
router.get('/', graphqlHTTP({
    schema,
    graphiql: !util.isProduction()
}))
router.post('/', graphqlHTTP({
    schema,
    graphiql: false
}))
module.exports = router