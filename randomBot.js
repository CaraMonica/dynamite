const moves = ["R", "P", "S", "D", "W"];
const nMoves = moves.length;

const nonDynamiteMoves = ["R", "P", "S", "W"];
const nNonDynamiteMoves = nonDynamiteMoves.length;

function randomMove() {
    // Generate a random integer between 0 and 4 (the length of the moves array)
    const randomInt = Math.floor(Math.random() * nMoves);

    return moves[randomInt];
}

function randomNonDynamiteMove() {
    // Generate a random integer between 0 and 3 (the length of the nonDynamiteMoves array)
    const randomInt = Math.floor(Math.random() * nNonDynamiteMoves);

    return nonDynamiteMoves[randomInt];
}

function howManyDynamites(gamestate) {
    let nDynamites = 0;

    for (let i = 0; i < gamestate.rounds.length; i++) {
        if (gamestate.rounds[i].p1 === "D") {
            nDynamites++;
        }
    }

    return nDynamites;
}

class Bot {
    makeMove(gamestate) {
        if (howManyDynamites(gamestate) < 100) {
            return randomMove();
        } else {
            return randomNonDynamiteMove();
        }
    }
}

module.exports = new Bot();