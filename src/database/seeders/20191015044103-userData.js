'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkInsert('Users', [
      {
        userId: 'eminem54',
        PW: '$2b$05$NhA8NcrPD2q85dCHYs9J2OSQrA80hNjfG7y.ZXPwgJ9kApe7pVXy2',
        NAME: '지영'
      },
      {
        userId: 'test1',
        PW: '$2b$05$NhA8NcrPD2q85dCHYs9J2OSQrA80hNjfG7y.ZXPwgJ9kApe7pVXy2',
        NAME: '재은'
      },
      {
        userId: 'test2',
        PW: '$2b$05$NhA8NcrPD2q85dCHYs9J2OSQrA80hNjfG7y.ZXPwgJ9kApe7pVXy2',
        NAME: '건우'
      },
      {
        userId: 'test3',
        PW: '$2b$05$NhA8NcrPD2q85dCHYs9J2OSQrA80hNjfG7y.ZXPwgJ9kApe7pVXy2',
        NAME: '승현'
      },
      {
        userId: 'test4',
        PW: '$2b$05$NhA8NcrPD2q85dCHYs9J2OSQrA80hNjfG7y.ZXPwgJ9kApe7pVXy2',
        NAME: '승원'
      },
      {
        userId: 'test5',
        PW: '$2b$05$NhA8NcrPD2q85dCHYs9J2OSQrA80hNjfG7y.ZXPwgJ9kApe7pVXy2',
        NAME: '재원'
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
