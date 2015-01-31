TrelloClone.Models.List = Backbone.Model.extend({

  initialize : function(attributes, options) {
    this.board = options.board;
  },

  urlRoot : "api/lists",

  cards : function() {
    if (!this._cards) {
      this._cards = new TrelloClone.Collections.Cards([], { list: this });
    }
    return this._cards;
  },

  parse: function(resp) {
    if (resp.cards) {
      this.cards().set(resp.cards);
      delete resp.cards;
    }
    return resp;
  }

})
