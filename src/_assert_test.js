const assert = require("./assert.js");

describe("Main", function() {
  it("strict deep equal by default", function() {
    assert.equal({ foo: "bar", baz: "quux" }, { foo: "bar", baz: "quux" });
  });
});
