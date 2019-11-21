/**
 *
 * @param {*} asyncFunc
 * @description 라우터 비동기 에러처리 함수
 */
const wrap = asyncFn => {
  return async (req, res, next) => {
    try {
      return await asyncFn(req, res, next);
    } catch (e) {
      return next(e);
    }
  };
};

module.exports = {
  wrap
};
