const beatMap = {
    "R": "P",
    "S": "R",
    "P": "S",
    "D": "W",
    "W": "P"
}

class Bot {
    makeMove(gamestate) {
        if (gamestate.rounds.length === 0) {
            return "P";
        } else {
            return beatMap[gamestate.rounds[gamestate.rounds.length - 1].p2];
        }
    }
}

module.exports = new Bot();