const crypto = require('crypto');
const fs = require('fs');

let hash = crypto.createHash('sha256');
hash.update(fs.readFileSync('.env.development'));
const cacheVersion = hash.digest('hex');

module.exports = { // eslint-disable-line import/no-commonjs
    cacheVersion,
};
