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
    // console.log(">>> BREADCRUMBS: 0.5 init GameView");
    this.render();
  },

  render: function() {
    this.delegateEvents();
    // ^ reconnects the DOM event handlers

    // var html = this.template(this.model.toJSON())
    // this.$el.html(html);
    // console.log(">>> BREADCRUMBS: 1 render GameView");

    return this;
  },

  events: {
    'click .move td': 'makeMove',
  },

  makeMove: function(event) {
    event.preventDefault();
    this.trigger('select', this);
    // console.log("You clicked a box, sweet!")
    // console.log("El = ");
    // console.log(this.el);
    console.log(this.model.attributes.activePlayer.letter);
    console.log($(event.target).attr('id'));
    // console.log(event.currentTarget.id);
    this.model.play($(event.target).attr('id'));
    // event.target.append();

    this.listElement = $(event.target);

    var letter = this.model.attributes.activePlayer.letter;

    this.listElement.html(letter);
  }


});

export default GameView;
