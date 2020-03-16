const _ = require('lodash');

module.exports = {
  formatErrors: (e) => /* return console.info(e.errors); */ e.errors.map((x) => _.pick(x, ['path', 'message'])),
};
