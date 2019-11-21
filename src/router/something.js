const router = require('express').Router;
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: path.join(__dirname, '/../../.env') });

const rou = router();
rou.get('/real', function(req, res, next) {
  let token = req.cookies.user;

  let decoded = jwt.verify(token, process.env.SECRET_KEY);
  if (decoded) {
    res.send('권한이 있어서 API 수행 가능');
  } else {
    res.send('권한이 없습니다.');
  }
});

module.exports = { rou };
