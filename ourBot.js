const maxDynamite = 100;
const numPastMoves = 1;
const randDynamite = 20;
const checkNRounds = 1;

const allMoves = ["R", "P", "S", "W", "D"];
const numMoves = allMoves.length;
const mainMoves = ["R", "P", "S"];
const numMainMoves = mainMoves.length;
const moveMap = { S: "R", P: "S", R: "P", D: "W", W: "" };

const getNLastItems = (iterable, n) =>
  iterable.slice(Math.max(iterable.length - n, 0));

const getRandInt = (max) => Math.floor(Math.random() * max);

class Bot {
  countMoves(rounds) {
    const p1MoveCount = {};
    const p2MoveCount = {};
    for (let i = 0; i < numMoves; i++) {
      p1MoveCount[allMoves[i]] = rounds.filter(
        ({ p1 }) => p1 === allMoves[i]
      ).length;
      p2MoveCount[allMoves[i]] = rounds.filter(
        ({ p2 }) => p2 === allMoves[i]
      ).length;
    }

    return [p1MoveCount, p2MoveCount];
  }
  hasFavouriteMove(moves) {
    const sortable = Object.entries(moves).sort(([, a], [, b]) => b - a);
    return sortable[0][1] !== sortable[1][1];
  }
  hasOpponentWonLastN(rounds, n) {
    return (
      getNLastItems(rounds, n).filter(
        (round) => moveMap[round["p1"]] === round["p2"]
      ).length === n
    );
  }

  getBestMove(opponentMoves) {
    const opponentFavMove = Object.keys(opponentMoves).reduce((a, b) =>
      opponentMoves[a] > opponentMoves[b] ? a : b
    );
    return moveMap[opponentFavMove];
  }

  makeMove(gamestate) {
    const [p1MoveCount] = this.countMoves(gamestate.rounds);
    let [, p2LastMoveCount] = this.countMoves(
      getNLastItems(gamestate.rounds, numPastMoves)
    );

    if (
      gamestate.rounds.length === 0 ||
      (p1MoveCount.D !== maxDynamite && getRandInt(randDynamite) === 0)
    ) {
      return "D";
    }

    let bestMove = mainMoves[getRandInt(numMainMoves)];

    if (
      this.hasFavouriteMove(p2LastMoveCount) &&
      !this.hasOpponentWonLastN(gamestate.rounds, checkNRounds)
    ) {
      bestMove = this.getBestMove(p2LastMoveCount);
    }

    if (bestMove == "") {
      return mainMoves[getRandInt(numMainMoves)];
    }

    return bestMove;
  }
}

module.exports = new Bot();
