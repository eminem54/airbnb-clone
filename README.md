<h1 align="center">Welcome to membership-airbnb 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/eminem54/membership-airbnb#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/eminem54/membership-airbnb/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/eminem54/membership-airbnb/blob/master/LICENSE" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/github/license/eminem54/membership-airbnb" />
  </a>
</p>

## 🏠 [Welcome Airbnb](http://106.10.58.167/)

- 서버에 시퀄라이즈가 외래키를 만들지 못하는 문제가 있음.
- 배포환경에서 날짜핉터가 동작하지 않음
- 그 외 필터는 모두 동작

## Make it Work, Make it Right, Make it Fast.

```sh
id: test1
pw: 123123
```

## Install

```sh
npm install
.env 작성
mysql airbnb 스키마 생성
npx sequelize db:migrate
npx sequelize db:seed:all
서버배포시 airbnb/src/serverAddress.js 서버 주소로 수정
airbnb/ npm run build
NginX => airbnb/build
```

## Stack

```sh
mysql
sequelize sequelize-cli
redis
GraphQL
bcrypt
jwt

apollo
react functional components hooks api
styld-components
```

## Author

- Github: [@eminem54](https://github.com/eminem54)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/eminem54/membership-airbnb/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

This project is [ISC](https://github.com/eminem54/membership-airbnb/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
