const assert = require("./assert.js");
const main = require("./main.js");

describe("Main", function() {
  it("can set the score for a frame", function() {
    assert.throws(function() {
      main.getScoreForFrame(5);
    }, "No second chance attempted should throw and exception");

    assert.equal(main.getScoreForFrame(10), "STRIKE");
    assert.equal(main.getScoreForFrame(7, 3), "SPARE");
    assert.throws(
      main.getScoreForFrame.bind(null, 7, 7),
      /Invalid score/,
      "Scores greater than whatever strike should be rejected"
    );
    assert.throws(
      main.getScoreForFrame.bind(null, 1, { hello: "world" }),
      "FIRST"
    );
    assert.throws(
      main.getScoreForFrame.bind(null, "Not valid", { hello: "world" }),
      "SECOND"
    );
    assert.equal(main.getScoreForFrame(4, 3), 7, "Valid Score");
  });

  it("can determine the scores from an array of numbers", function() {
    const twentyZeroesScore = main.getFrameScores(repeat(0, 20));
    assert.equal(twentyZeroesScore, repeat(0, 10));

    const twelveTensScore = main.getFrameScores(repeat(10, 12));
    assert.equal(twelveTensScore, repeat("STRIKE", 12));
  });
});

function repeat(value, numberOfTimes) {
  const array = [];
  for (let i = 0; i < numberOfTimes; i += 1) {
    array.push(value);
  }
  return array;
}
