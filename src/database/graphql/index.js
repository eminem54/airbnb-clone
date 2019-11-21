const models = require('../models/index');
const graphql = require('graphql');
const DateTime2 = require('./dateTime');
const { GraphQLScalarType } = require('graphql');
const { getRedisData } = require('../redis/redis');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const DateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'Date custom scalar type',
  parseValue(value) {
    return new Date(value); // value from the client
  },
  serialize(value) {
    return value.getTime(); // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10); // ast value is always in string format
    }
    return null;
  }
});

const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLString },
    PW: { type: GraphQLString },
    NAME: { type: GraphQLString },
    reservation: {
      type: new GraphQLList(reservationType),
      async resolve(parent, args) {
        const data = await models.Reservation.findAll({ where: { userId: parent.userId } });
        return data;
      }
    }
  })
});

const reservationType = new GraphQLObjectType({
  name: 'Reservation',
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLString },
    roomId: { type: GraphQLString },
    start: { type: GraphQLString },
    finish: { type: GraphQLString }
  })
});

const roomType = new GraphQLObjectType({
  name: 'Room',
  fields: () => ({
    id: { type: GraphQLID },
    kind: { type: GraphQLString },
    title: { type: GraphQLString },
    option1: { type: GraphQLString },
    option2: { type: GraphQLString },
    option3: { type: GraphQLString },
    option4: { type: GraphQLString },
    star: { type: GraphQLFloat },
    imgurl: { type: GraphQLString },
    price: { type: GraphQLInt },
    guest: { type: GraphQLInt },
    roomInfo1: { type: GraphQLString },
    roomInfo2: { type: GraphQLString },
    roomInfo3: { type: GraphQLString },
    reservation: {
      type: new GraphQLList(reservationType),
      async resolve(parent, args) {
        const data = await models.Reservation.findAll({ where: { roomId: parent.id } });
        return data;
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: userType,
      args: { userId: { type: GraphQLString } },
      async resolve(parent, args) {
        const data = await models.User.findOne({ where: { userId: args.userId } });
        return data.dataValues;
      }
    },
    reservation: {
      type: reservationType,
      args: { userId: { type: GraphQLString } },
      async resolve(parent, args) {
        const data = await models.Reservation.findOne({ where: { userId: args.userId } });
        return data.dataValues;
      }
    },
    reservationexceptdate: {
      type: new GraphQLList(reservationType),
      args: { startDate: { type: GraphQLString }, finishDate: { type: GraphQLString } },
      async resolve(parent, args) {
        const data = await models.Reservation.findAll({
          where: { start: { [Op.notBetween]: [args.startDate, args.finishDate] } }
        });
        return data;
      }
    },
    room: {
      type: roomType,
      args: { id: { type: GraphQLInt } },
      async resolve(parent, args) {
        const data = await models.Room.findOne({ where: { id: args.id } });
        return data.dataValues;
      }
    },
    rooms: {
      type: new GraphQLList(roomType),
      async resolve(parent, args) {
        const rooms = await getRedisData('rooms');
        return JSON.parse(rooms);
      }
    },
    roomsbyprice: {
      type: new GraphQLList(roomType),
      args: { startPrice: { type: GraphQLString }, endPrice: { type: GraphQLString } },
      async resolve(parent, args) {
        const data = await models.Room.findAll({
          where: { price: { [Op.between]: [parseInt(args.startPrice), parseInt(args.endPrice)] } }
        });
        return data;
      }
    },
    roomsbydate: {
      type: new GraphQLList(roomType),
      args: { startDate: { type: GraphQLString }, finishDate: { type: GraphQLString } },
      async resolve(parent, args) {
        let sendData = await models.Room.findAll();
        const data = await models.Room.findAll({
          include: [
            {
              model: models.Reservation,
              where: {
                [Op.or]: [
                  {
                    [Op.or]: [
                      { start: { [Op.between]: [args.startDate, args.finishDate] } },
                      { finish: { [Op.between]: [args.startDate, args.finishDate] } }
                    ]
                  },
                  {
                    [Op.and]: [
                      { start: { [Op.lt]: args.startDate } },
                      { finish: { [Op.gt]: args.finishDate } }
                    ]
                  }
                ]
              }
            }
          ]
        });
        const ret = sendData.filter(v => {
          for (let i = 0; i < data.length; i += 1) {
            if (v.dataValues.id === data[i].dataValues.id) return false;
          }
          return true;
        });
        return ret;
      }
    },
    roomsbypeople: {
      type: new GraphQLList(roomType),
      args: { guest: { type: GraphQLString } },
      async resolve(parent, args) {
        const data = await models.Room.findAll({
          where: { guest: { [Op.gte]: parseInt(args.guest) } }
        });
        return data;
      }
    },
    roomsbypeopleandprice: {
      type: new GraphQLList(roomType),
      args: {
        guest: { type: GraphQLString },
        startPrice: { type: GraphQLString },
        endPrice: { type: GraphQLString }
      },
      async resolve(parent, args) {
        const data = await models.Room.findAll({
          where: {
            [Op.and]: [
              { price: { [Op.between]: [parseInt(args.startPrice), parseInt(args.endPrice)] } },
              { guest: { [Op.gte]: parseInt(args.guest) } }
            ]
          }
        });
        return data;
      }
    },
    roomsbydateandpeople: {
      type: new GraphQLList(roomType),
      args: {
        guest: { type: GraphQLString },
        startDate: { type: GraphQLString },
        finishDate: { type: GraphQLString }
      },
      async resolve(parent, args) {
        const people = await models.Room.findAll({
          where: { guest: { [Op.gte]: parseInt(args.guest) } }
        });
        const date = await models.Room.findAll({
          include: [
            {
              model: models.Reservation,
              where: {
                [Op.or]: [
                  {
                    [Op.or]: [
                      { start: { [Op.between]: [args.startDate, args.finishDate] } },
                      { finish: { [Op.between]: [args.startDate, args.finishDate] } }
                    ]
                  },
                  {
                    [Op.and]: [
                      { start: { [Op.lt]: args.startDate } },
                      { finish: { [Op.gt]: args.finishDate } }
                    ]
                  }
                ]
              }
            }
          ]
        });
        const ret = people.filter(v => {
          for (let i = 0; i < date.length; i += 1) {
            if (v.dataValues.id === date[i].dataValues.id) return false;
          }
          return true;
        });
        return ret;
      }
    },
    roomsbydateandprice: {
      type: new GraphQLList(roomType),
      args: {
        startDate: { type: GraphQLString },
        finishDate: { type: GraphQLString },
        startPrice: { type: GraphQLString },
        endPrice: { type: GraphQLString }
      },
      async resolve(parent, args) {
        const price = await models.Room.findAll({
          where: { price: { [Op.between]: [parseInt(args.startPrice), parseInt(args.endPrice)] } }
        });
        const date = await models.Room.findAll({
          include: [
            {
              model: models.Reservation,
              where: {
                [Op.or]: [
                  {
                    [Op.or]: [
                      { start: { [Op.between]: [args.startDate, args.finishDate] } },
                      { finish: { [Op.between]: [args.startDate, args.finishDate] } }
                    ]
                  },
                  {
                    [Op.and]: [
                      { start: { [Op.lt]: args.startDate } },
                      { finish: { [Op.gt]: args.finishDate } }
                    ]
                  }
                ]
              }
            }
          ]
        });
        const ret = price.filter(v => {
          for (let i = 0; i < date.length; i += 1) {
            if (v.dataValues.id === date[i].dataValues.id) return false;
          }
          return true;
        });
        return ret;
      }
    },
    roomsbydateandpeopleandprice: {
      type: new GraphQLList(roomType),
      args: {
        guest: { type: GraphQLString },
        startDate: { type: GraphQLString },
        finishDate: { type: GraphQLString },
        startPrice: { type: GraphQLString },
        endPrice: { type: GraphQLString }
      },
      async resolve(parent, args) {
        const peopleAndPrice = await models.Room.findAll({
          where: {
            [Op.and]: [
              { price: { [Op.between]: [parseInt(args.startPrice), parseInt(args.endPrice)] } },
              { guest: { [Op.gte]: parseInt(args.guest) } }
            ]
          }
        });
        const date = await models.Room.findAll({
          include: [
            {
              model: models.Reservation,
              where: {
                [Op.or]: [
                  {
                    [Op.or]: [
                      { start: { [Op.between]: [args.startDate, args.finishDate] } },
                      { finish: { [Op.between]: [args.startDate, args.finishDate] } }
                    ]
                  },
                  {
                    [Op.and]: [
                      { start: { [Op.lt]: args.startDate } },
                      { finish: { [Op.gt]: args.finishDate } }
                    ]
                  }
                ]
              }
            }
          ]
        });
        const ret = peopleAndPrice.filter(v => {
          for (let i = 0; i < date.length; i += 1) {
            if (v.dataValues.id === date[i].dataValues.id) return false;
          }
          return true;
        });
        return ret;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
