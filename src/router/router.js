const router = require('express').Router;
const { login } = require('./login');
const { rou } = require('./something');
const graphqlHTTP = require('express-graphql');
const schema = require('../database/graphql/index');
const index = router();
const { client, initRedis } = require('../database/redis/redis');

initRedis();

index.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
    tracing: true, // 모니터링을 위한 config
    cacheControl: true // cache을 위한 config
  })
);

index.use(login);
index.use(rou);

module.exports = { index };
