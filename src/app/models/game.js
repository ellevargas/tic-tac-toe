import Backbone from 'backbone';

const Game = Backbone.Model.extend({

  initialize: function() {
    this.set("currentBoard", [" ", " ", " ", " ", " ", " ", " ", " ", " "]);
    this.set("turnCounter", 0);

    this.set("player1", {name: "Bee", letter: "X"});
    // this.get("player1").name;
    this.set("player2", {name: "Hive", letter: "O"});

    this.set("activePlayer", this.get("player1"));
    this.set("inactivePlayer", this.get("player2"));

    this.set("scorecard",
      {player1: { "Win":0, "Lose": 0, "Draw": 0}, 
      player2: { "Win":0, "Lose": 0, "Draw": 0}})

    // this.set("scorecard", { "Win":0, "Lose": 0, "Draw": 0});
  },

  play: function(move) {
    if (move >= 0 && move < 9 && this.get("currentBoard")[move] == " ") {
      var board = this.get("currentBoard");
      board[move] = this.get("activePlayer").letter;
      this.set("currentBoard", board);
      console.log("Marked with " + this.get("activePlayer").letter);
      if (this.winCheck(this.get("currentBoard")) == false && this.get("turnCounter") < 9) {
        this.turnHandler();
      };
      this.scoreKeeper();
      return this.get("currentBoard");
    } else {
      throw new TypeError("Please choose a valid move.");
    };
  },

  winCheck: function(board) {
    if (board[0] == board[1] &&  board[1] == board[2] && board[0] != " ") {
      return true;
    } else if (board[3] == board[4] && board[4] == board[5] && board[3] != " ") {
      return true;
    } else if (board[6] == board[7] && board[7] == board[8] && board[6] != " ") {
      return true;
    } else if (board[0] == board[3] && board[3] == board[6] && board[0] != " ") {
      return true;
    } else if (board[1] == board[4] && board[4] == board[7] && board[1] != " ") {
      return true;
    } else if (board[2] == board[5] && board[5] == board[8] && board[2] != " ") {
      return true;
    } else if (board[2] == board[4] && board[4] == board[6] && board[2] != " ") {
      return true;
    } else if (board[0] == board[4] && board[4] == board[8] && board[0] != " ") {
      return true;
    } else {
      return false;
    }
  },

  turnHandler: function () {
    this.set("turnCounter", this.get("turnCounter") + 1);
    if (this.get("turnCounter") % 2 == 0) {
      this.set("activePlayer", this.get("player1"));
      // this.activePlayer = this.player1;
      this.set("inactivePlayer", this.get("player2"));
      // this.inactivePlayer = this.player2;
    } else {
      this.set("activePlayer", this.get("player2"));
      // this.activePlayer = this.player2;
      this.set("inactivePlayer", this.get("player1"));
      // this.inactivePlayer = this.player1;
    };
    return this.get("turnCounter");
  },

  scoreKeeper: function() {
    if (this.winCheck(this.get("currentBoard")) == true) {
      this.set("activePlayer", this.get("activePlayer").scorecard["Win"] + 1);
      this.set("inactivePlayer", this.get("inactivePlayer").scorecard["Lose"] + 1);
    } else if (this.get("turnCounter") == 8 && this.winCheck(this.get("currentBoard")) == false) {
      this.set("activePlayer", this.get("activePlayer").scorecard["Draw"] + 1);
      this.set("inactivePlayer", this.get("inactivePlayer").scorecard["Draw"] + 1);
    }
  },

  newGame: function() {
    this.set("currentBoard", [" ", " ", " ", " ", " ", " ", " ", " ", " "]);
    this.set("turnCounter", 0);
    this.set("activePlayer", this.get("inactivePlayer"));
  }

});

export default Game;
