const assert = require("assert");

module.exports = Object.assign({}, assert, { equal: assert.deepStrictEqual });
