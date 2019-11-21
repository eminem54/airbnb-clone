const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const { index } = require('./router/router');

require('dotenv').config({ path: path.join(__dirname, '/../.env') });

const app = express();

// morgan logger 설정
app.use(logger('dev'));

// cors 설정
app.use(cors());

// 바디 파서
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 쿠키파서 설정
app.use(cookieParser('secret code'));

// view 경로 리소스 경로 설정
app.use(express.static(path.join(__dirname, '/../dist')));
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'pug');

// 메인 라우터 설정
app.use(index);

// 서버 시작
const port = process.env.SERVER_PORT;
app.listen(port, () => {
  console.log('Express listening on port', port);
});
