const STRIKE_SCORE = 10;

exports.run = function run() {
  console.log("Hello, world");
};

function checkArgumentIsPositiveNumber(argName, value) {
  if (!isPositiveNumber(value)) {
    throw new Error(
      `Expected a number but got '${value}' of type '${typeof value}' ` +
        `for argument ${argName}`
    );
  }
}

exports.getScoreForFrame = function getScoreForFrame(chance1, chance2) {
  if (chance1 === STRIKE_SCORE && isUndefinedOrNull(chance2)) {
    return "STRIKE";
  }
  checkArgumentIsPositiveNumber("chance1", chance1);
  checkArgumentIsPositiveNumber("chance2", chance2);

  const score = chance1 + chance2;

  if (score === STRIKE_SCORE) {
    return "SPARE";
  }

  throwIfInvalidScore(score, chance1, chance2);

  return score;
};

function throwIfInvalidScore(score, chance1, chance2) {
  if (score > STRIKE_SCORE) {
    throw new Error(
      "Invalid score for frame. First chance was " +
        `${chance1} and second chance was ${chance2}.`
    );
  }
}

function isPositiveNumber(value) {
  return isNumber(value) && value >= 0;
}

function isNumber(value) {
  return !isNaN(value) || isFinite(value);
}

function isUndefinedOrNull(value) {
  return value === undefined || value === null;
}
