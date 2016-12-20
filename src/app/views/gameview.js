import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';

import Game from 'app/models/game';
import Application from 'app/models/application';

const GameView = Backbone.View.extend({
  initialize: function() {
    // console.log('GameView got initialized');
    // this.setElement($('#0'));
    // this.template = options.template;
    // this.detailsTemplate = _.template($('.move').html());

    this.listenTo(this.model, "change", this.render);
    // this.render();

    this.listenTo(this.model, "update", this.render);

  },

  render: function() {
    this.delegateEvents();
    // ^ reconnects the DOM event handlers

    // var html = this.template(this.model.toJSON())
    // this.$el.html(html);

    return this;
  },

  events: {
    'click .move td': 'makeMove',
    'keypress .move td[tabindex]': 'makeMove',
    'click .clear-board': 'clearBoard',
    'click .new-session': 'newSession'
  },

  makeMove: function(event) {
    event.preventDefault();
    this.trigger('select', this);
    console.log("You clicked " + $(event.target).attr('id'));

    // console.log("You clicked a box, sweet!")
    // console.log("El = ");
    // console.log(this.el);
    // console.log("The current letter is" + this.model.attributes.activePlayer.letter);
    // console.log(event.currentTarget.id);
    // event.target.append();

    this.listElement = $(event.target);

    var letter = this.model.attributes.activePlayer.letter;

    this.listElement.html(letter);
    this.model.play($(event.target).attr('id'));
  },

  clearBoard: function(event) {
    console.log("I tried to clear the board!");
    this.model.clearBoard();
  },

  newSession: function(event) {
    console.log("I tried to make a new session!")
  }


});

export default GameView;
