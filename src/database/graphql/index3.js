const Graphql = require('graphql');
const dataType = require('graphql-custom-types');
const { getUser, getUsers } = require('../../model/dbModule');
var { makeExecutableSchema } = require('graphql-tools');
const models = require('../models/index');
/*
https://engineering.huiseoul.com/%ED%95%9C-%EB%8B%A8%EA%B3%84%EC%94%A9-%EB%B0%B0%EC%9B%8C%EB%B3%B4%EB%8A%94-graphql-421ed6215008
참고
*/
const schemaString = `
scalar Date

type MyType {
   created: Date
}
`;

const resolverMap = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value); // ast value is always in string format
      }
      return null;
    }
  })
};
const typeDefs = `
type user{
  id: Int,
  userId: String,
  PW: String,
  NAME: String,
  reservation: [reservation]
}
type room{
  id: Int,
  kind: String,
  title: String,
  option: String,
  star: Float,
  imgurl: String,
  price: Int,
  guest: Int,
  roomInfo: String
  reservation: [reservation]
}
type reservation{
  id: Int,
  userId: String,
  roomId: String,
  start: String,
  finish: String
}
type Query{
  user(userId:String!):user
  users:[user]
  reservation(userId:String!):[reservation]
}
`;

`  filter_date(checkIn:Date, checkout: Date){
  list: [Room]
}`;
const resolvers = {
  Query: {
    async user(_, { userId }) {
      const data = await getUser(userId);
      return data;
    },
    async users() {
      return await getUsers();
    },
    async reservation(_, { userId }) {
      const data = await models.Reservation.findAll({ where: { userId: userId } });
      return data;
    }
  }
};

const schema = makeExecutableSchema({
  //typeDefs와 resolvers를 결합해서 하나의 스키마로 만들어 줍니다. 이때 중복되는 Type의 경우에는 한번만 실행됩니다.
  typeDefs,
  resolvers
});
module.exports = schema;
