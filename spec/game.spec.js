import Game from "game";

describe('Game', function() {

  var testGame;
  beforeEach(function() {
    game = new Game();
  });

  describe('constructor', function() {
    it('constructor exists', function() {
      expect(Game).toBeFunction();
    });

  describe('Game', function() {
    // it('should return player name', function() {
    //   expect(testGame.player1.name).toEqual("ELLE");
    //   expect(testGame.player2.name).toEqual("JESSICA");
    // });

    it('should assign letter X to player 1 and letter O to player 2', function() {
      expect(game.get("player1").letter).toEqual("X");
      expect(game.get("player2").letter).toEqual("O");
      expect(game.get("player1").letter).not.toEqual("O");
      expect(game.get("player2").letter).not.toEqual("X");
    });

  });


  describe('winCheck', function() {
    xit('should return true if there is a winner', function() {
      expect(testGame.winCheck(["X", "X", "X", " ", " ", " ", " ", " ", " "])).toEqual(true);
    });

    xit('should return false with an empty board', function() {
      expect(testGame.winCheck([" ", " ", " ", " ", " ", " ", " ", " ", " "])).toEqual(false);
    });

    xit('should return false if there is not a winner yet', function() {
      expect(testGame.winCheck(["X", "X", " ", "O", "O", " ", " ", " ", " "])).toEqual(false);
    });

    xit('should return false when the game ends in draw', function() {
      expect(testGame.winCheck(["X", "X", "O", "O", "O", "X", "X", "O", "X"])).toEqual(false);
    });
  }); // describe winCheck end


  describe('play', function() {
    xit('should return move in board', function() {
      expect(testGame.play(2)).toEqual([" ", " ", "X", " ", " ", " ", " ", " ", " "]);
      expect(testGame.play(1)).toEqual([" ", "O", "X", " ", " ", " ", " ", " ", " "]);
    });

    xit('should throw an error if move made in spot that is taken', function() {
      expect(testGame.play(2)).toEqual([" ", " ", "X", " ", " ", " ", " ", " ", " "]);
      expect(function() { testGame.play(2)}).toThrow(TypeError("Please choose a valid move."));
    });

    xit('should throw an error if move outside 0-8 are used', function() {
      expect(function() { testGame.play(10)}).toThrow(TypeError("Please choose a valid move."));
    });

    xit('should throw an error if move is a string', function() {
      expect(function() { testGame.play("a")}).toThrow(TypeError("Please choose a valid move."));
    });

    xit('should return the board after a win', function() {
      testGame.play(6);
      testGame.play(4);
      testGame.play(7);
      testGame.play(5);
      expect(testGame.play(8)).toEqual([" ", " ", " ", " ", "O", "O", "X", "X", "X"])
    });

    xit('should return the board after a draw', function() {
      testGame.play(0);
      testGame.play(2);
      testGame.play(1);
      testGame.play(3);
      testGame.play(5);
      testGame.play(4);
      testGame.play(6);
      testGame.play(7);
      expect(testGame.play(8)).toEqual(["X", "X", "O", "O", "O", "X", "X", "O", "X"]);
    });
  }); //describe play end


  describe('turnHandler', function() {
    xit('should increment turnCounter', function() {
      expect(testGame.turnHandler()).toEqual(1);
      expect(testGame.turnHandler()).toEqual(2);
    });

    xit('should swap activePlayer', function() {
      expect(testGame.activePlayer.name).toEqual("ELLE");
      expect(testGame.turnHandler()).toEqual(1);
      expect(testGame.activePlayer.name).toEqual("JESSICA");
      expect(testGame.turnHandler()).toEqual(2);
      expect(testGame.turnHandler()).toEqual(3);
    });
  });


  describe('scoreKeeper', function() {
    xit('should increment scorecard when a player wins/player loses', function() {
      // currentBoard = [" ", " ", " ", " ", "O", "O", "X", "X", "X"];
      testGame.play(6);
      testGame.play(4);
      testGame.play(7);
      testGame.play(5);
      testGame.play(8);
      expect(testGame.activePlayer.scorecard["Win"]).toEqual(1);
      expect(testGame.activePlayer.scorecard["Lose"]).toEqual(0);
      expect(testGame.inactivePlayer.scorecard["Lose"]).toEqual(1);
      expect(testGame.inactivePlayer.scorecard["Win"]).toEqual(0);
    });

    xit('should increment scorecards when game ends in draw', function() {
      // currentBoard = ["X", "X", "O", "O", "O", "X", "X", "O", "X"]
      testGame.play(0);
      testGame.play(2);
      testGame.play(1);
      testGame.play(3);
      testGame.play(5);
      testGame.play(4);
      testGame.play(6);
      testGame.play(7);
      testGame.play(8);
      expect(testGame.activePlayer.scorecard["Draw"]).toEqual(1);
      expect(testGame.inactivePlayer.scorecard["Draw"]).toEqual(1);
      expect(testGame.activePlayer.scorecard["Draw"]).not.toEqual(0);
      expect(testGame.inactivePlayer.scorecard["Draw"]).not.toEqual(0);
    });
  });


  describe('newGame', function() {
    xit('should restart a new game with a clean board', function() {
      testGame.play(6);
      testGame.play(4);
      testGame.play(7);
      testGame.play(5);
      expect(testGame.play(8)).toEqual([" ", " ", " ", " ", "O", "O", "X", "X", "X"]);
      testGame.newGame();
      expect(testGame.play(1)).toEqual([" ", "X", " ", " ", " ", " ", " ", " ", " "]);
      expect(testGame.turnHandler()).toEqual(2);
    });
  });

});
