TrelloClone.Models.List = Backbone.Model.extend({

  initialize : function(board) {
    this.board = board;
  },

  urlRoot : function() {
    return "api/boards/" + this.collection.board.id + "/lists"
  },

  cards : function() {
    if (!this._cards) {
      this._cards = new TrelloClone.Collection.Cards([], { list: this});
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
