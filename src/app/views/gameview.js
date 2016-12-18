import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';

import Game from 'app/models/game';
import Application from 'app/models/application';

const GameView = Backbone.View.extend({
  initialize: function() {
    console.log('GameView got initialized');

    // this.template = options.template;

    // this.detailsTemplate = _.template($('#tmpl-contact-details').html());
    // this.listElement = $('#contact-details');

    this.listenTo(this.model, "change", this.render);
    console.log(">>> BREADCRUMBS: 0.5");
  },

  render: function() {
    this.delegateEvents();
    // ^ reconnects the DOM event handlers

    // var html = this.template(this.model.toJSON())
    // this.$el.html(html);
    return this;
  },

  events: {
    'click #0': 'markMove',
    'click #0': 'onClick'
  },

  onClick: function(event) {
    this.trigger('select', this);
    console.log("At least you're in onClick");
    // We return false to tell jQuery not to run any more event handlers.
    // Otherwise, it would run the 'click' event handler on RolodexView
    // as well.
    return false;
  },

  markMove: function(event) {
    event.preventDefault();
    console.log("You clicked a box, sweet!")
  }


});

export default GameView;
