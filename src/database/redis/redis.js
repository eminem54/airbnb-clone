const redis = require('redis');
const path = require('path');
const models = require('../models/index');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });

client = redis.createClient(6379, process.env.LOCALHOST);

const initRedis = async () => {
  const rooms = await models.Room.findAll();
  const text = JSON.stringify(rooms);
  client.set('rooms', text);
  console.log('init');
};

const getRedisData = key => {
  return new Promise((resolve, reject) => {
    client.get(key, (err, reply) => {
      if (err) {
        reject(err);
      }
      resolve(reply);
    });
  });
};

module.exports = { client, initRedis, getRedisData };
