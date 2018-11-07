const assert = require("./assert.js");

describe("Main", function() {
  it("is true", function() {
    assert.equal(
      { foo: "bar", baz: "quux" },
      { foo: "bar", baz: "quux" },
      "Strict deep equal by default"
    );
  });
});
