TrelloClone.Models.List = Backbone.Model.extend({

  urlRoot: "/api/lists",

  initialize : function(attributes, options) {
    this.board = options.board;
  },

  cards : function() {
    if (!this._cards) {
      this._cards = new TrelloClone.Collections.Cards([], { list: this });
    }
    return this._cards;
  },

  parse: function(resp) {
    if (resp.cards) {
      this.cards().set(resp.cards, { parse: true });
      delete resp.cards;
    }
    return resp;
  },

  cardOrds : function() {
    return this.cards().pluck("ord");
  },

  nextOrd : function() {
    if (Math.max.apply(null, this.cardOrds()) < 0) {
      return 0;
    } else {
      return Math.max.apply(null, this.cardOrds()) + 1;
    }
  }

})
