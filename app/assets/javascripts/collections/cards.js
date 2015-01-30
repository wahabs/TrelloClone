TrelloClone.Collections.Cards = Backbone.Collection.extend({

  initialize : function(models, options) {
    this.list = options.list;
  },

  url : function() {
    return ("api/boards/" + this.collection.list.collection.board.id
             + "/lists/" + this.collection.list.id
             + "/cards"
    )
  },

  model: TrelloClone.Models.Card

})
