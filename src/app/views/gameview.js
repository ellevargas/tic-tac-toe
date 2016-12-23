import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';

import Game from 'app/models/game';
import Application from 'app/models/application';

const GameView = Backbone.View.extend({
  initialize: function() {
    var whoseTurn = this.model.attributes.activePlayer.name;
    $('#' + whoseTurn).css("text-decoration", "underline");

    this.listenTo(this.model, "change", this.render);
  },

  render: function() {
    this.delegateEvents();
    return this;
  },

  events: {
    'click .move td': 'makeMove',
    'keypress .move td[tabindex]': 'makeMove',

    'click .btn-clear-board': 'clearBoard',
  },

  makeMove: function(event) {
    event.preventDefault();
    this.model.play($(event.target).attr('id'));

    var whoseTurn = this.model.attributes.activePlayer.name;
    $('#' + whoseTurn).css("text-decoration", "none");

    this.moveCell = $(event.target);

    var letter = this.model.attributes.activePlayer.letter;
    if (letter == "X") {
      this.moveCell.html('<img id="X" alt="You have put a stylish bee X!" src="/images/bee-X.png" />');
    } else if (letter == "O") {
      this.moveCell.html('<img id="O" alt="You have placed a snazzy honeycomb O!" src="/images/honeycomb-O.png" />');
    };

    if (this.model.winCheck(this.model.attributes.currentBoard) == true && this.model.attributes.activePlayer.name == "Bumblebee") {
      var gameInfo = { "board": this.model.attributes.currentBoard, "players": ["Bumblebee-X", "Honeycomb-O"], "outcome": "X"};
      this.model.save(gameInfo);
    } else if (this.model.winCheck(this.model.attributes.currentBoard) == true && this.model.attributes.activePlayer.name == "Honeycomb") {
      var gameInfo = { "board": this.model.attributes.currentBoard, "players": ["Bumblebee-X", "Honeycomb-O"], "outcome": "O"};
      this.model.save(gameInfo);
    } else if (this.model.winCheck(this.model.attributes.currentBoard) == false && this.model.attributes.turnCounter == 8) {
      var gameInfo = { "board": this.model.attributes.currentBoard, "players": ["Bumblebee-X", "Honeycomb-O"], "outcome": "draw"};
      this.model.save(gameInfo);
    };

    if (this.model.winCheck(this.model.attributes.currentBoard) == true && this.model.attributes.activePlayer.name == "Bumblebee")  {
      $('#bumblebee-winner-modal').show();
    } else if (this.model.winCheck(this.model.attributes.currentBoard) == true && this.model.attributes.activePlayer.name == "Honeycomb") {
      $('#honeycomb-winner-modal').show();
    } else if (this.model.winCheck(this.model.attributes.currentBoard) == false && this.model.attributes.turnCounter == 8) {
      console.log(this.model.attributes.turnCounter);
      $('#draw-bee').show();
      $('#draw-comb').show();
    } else {
     $('#bumblebee-winner-modal').hide();
     $('#honeycomb-winner-modal').hide();
     $('#draw-bee').hide();
     $('#draw-comb').hide();
    }

    this.model.turnHandler();
    var whoseTurn = this.model.attributes.activePlayer.name;
    $('#' + whoseTurn).css("text-decoration", "underline");
  },

  clearBoard: function(event) {
    if (this.model.attributes.turnCounter % 2 == 0) {
      var inactive = this.model.attributes.inactivePlayer;
      var active = this.model.attributes.activePlayer;
      this.model.attributes.activePlayer = inactive;
      this.model.attributes.inactivePlayer = active;
    };

    this.model.newGame();

    $('#bumblebee-winner-modal').hide();
    $('#honeycomb-winner-modal').hide();
    $('#draw-bee').hide();
    $('#draw-comb').hide();

    var whoseTurn = this.model.attributes.activePlayer.name;
    $('#' + whoseTurn).css("text-decoration", "underline");

    var whoseTurn = this.model.attributes.inactivePlayer.name;
    $('#' + whoseTurn).css("text-decoration", "none");

    this.tableCell = $("td");
    this.tableCell.html('');
  }

});

export default GameView;
