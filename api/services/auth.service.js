const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcryptService = require('./bcrypt.service');
const { brgy } = require('../../config/brgy');

const createTokens = async (user, secret, secret2) => {
  const createToken = jwt.sign(
    {
      user: _.pick(user, [
        'id',
        'username',
        'is_superuser',
        'barangay',
        'contact_number',
        'contact_person',
        'chairman',
      ]),
    },
    secret,
    {
      expiresIn: '1h',
    },
  );

  const createRefreshToken = jwt.sign(
    {
      user: _.pick(user, 'id'),
    },
    secret2,
    {
      expiresIn: '7d',
    },
  );

  return [createToken, createRefreshToken];
};

const refreshTokens = async (token, refreshToken, models, SECRET, SECRET2) => {
  let userId = 0;
  try {
    const { user: { id } } = jwt.decode(refreshToken);
    userId = id;
  } catch (err) {
    return {};
  }

  if (!userId) {
    return {};
  }

  const user = await models.AuthUser.findOne({ where: { id: userId }, raw: true });

  if (!user) {
    return {};
  }

  const refreshSecret = user.password + SECRET2;

  try {
    jwt.verify(refreshToken, refreshSecret);
  } catch (err) {
    return {};
  }

  const [newToken, newRefreshToken] = await createTokens(user, SECRET, refreshSecret);
  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user,
  };
};

const tryLogin = async (username, password, models, SECRET, SECRET2) => {
  // console.log({ SECRET, SECRET2 });
  const user = await models.AuthUser.findOne({ where: { username }, raw: true });
  if (!user) {
    return {
      ok: false,
      errors: [{ path: 'username', message: 'Wrong username' }],
    };
  }

  if (!bcryptService().comparePassword(password, user.password)) {
    return {
      ok: false,
      errors: [{ path: 'password', message: 'Wrong password' }],
    };
  }

  const refreshTokenSecret = user.password + SECRET2;

  const [token, refreshToken] = await createTokens(user, SECRET, refreshTokenSecret);

  const nav = [];
  if (user.is_superuser) {
    _.forEach(brgy, (value) => {
      nav.push({
        name: value.name,
        url: `/barangay/${value.name}`,
        icon: 'icon-map',
      });
    });
  } else {
    nav.push({
      name: user.barangay,
      url: `/barangay/${user.barangay}`,
      icon: 'icon-map',
    });
  }

  return {
    ok: true,
    token,
    refreshToken,
    nav,
  };
};

module.exports = { createTokens, refreshTokens, tryLogin };
