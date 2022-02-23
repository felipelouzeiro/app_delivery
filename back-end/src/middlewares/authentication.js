const { verifyToken } = require('../utils/auth');
const { unauthorized } = require('../utils/dictionary');
const errorConstructor = require('../utils/errorConstructor');

const authentication = async (req, _res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) throw errorConstructor(unauthorized, 'missing auth token');
    
    const user = await verifyToken(authorization);

    if (!user) throw errorConstructor(unauthorized, 'expired token');

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authentication,
};
