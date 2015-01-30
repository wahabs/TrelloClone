TrelloClone.Models.Card = Backbone.Model.extend({

  initialize : function(list) {
    this.list = list;
  },

  urlRoot : function() {
    return ("api/boards/" + this.collection.list.collection.board.id
             + "/lists/" + this.collection.list.id
             + "/cards"
    )
  }

})
