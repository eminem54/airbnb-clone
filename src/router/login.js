const router = require('express').Router;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { wrap } = require('../middleware/global');
const { getUser, getUsers } = require('../model/dbModule');

const login = router();

login.post(
  '/login',
  wrap(async (req, res, next) => {
    const userInfo = await getUser(req.body.id);
    if (!userInfo) {
      return res.status(180).send({});
    }

    const data = userInfo.dataValues;
    const login = await bcrypt.compare(req.body.pw, data.PW);
    if (!login) {
      return res.status(180).send({});
    }

    let token = jwt.sign(
      {
        idx: data.id,
        userId: data.userId,
        name: data.NAME
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '1m'
      }
    );

    res.cookie('user', token);
    res.status(200).send({});
  })
);

module.exports = { login };
