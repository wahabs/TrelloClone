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
  }

})
