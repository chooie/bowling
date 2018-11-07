const STRIKE_SCORE = 10;

exports.run = function run() {
  console.log("Hello, world");
};

exports.getFrameScores = function getFrameScores(chanceScores) {
  const frameScores = [];
  for (let i = 0; i < chanceScores.length; i += 1) {
    const score = chanceScores[i];
    if (isStrike(score)) {
      frameScores.push(exports.getScoreForFrame(score));
    } else {
      // TODO: handle last frame correctly - [Strike Strike Strike], [Strike, Spare], [Strike, x, y], [Spare, x], [x, y]
      const nextScore = chanceScores[i + 1];
      frameScores.push(exports.getScoreForFrame(score, nextScore));
      i += 1;
    }
  }
  return frameScores;
};

exports.getScoreForFrame = function getScoreForFrame(chance1, chance2) {
  if (isStrike(chance1) && isUndefinedOrNull(chance2)) {
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

function isStrike(value) {
  return value === STRIKE_SCORE;
}

function checkArgumentIsPositiveNumber(argName, value) {
  if (!isPositiveNumber(value)) {
    throw new Error(
      `Expected a number but got '${value}' of type '${typeof value}' ` +
        `for argument ${argName}`
    );
  }
}

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
