TrelloClone.Collections.Cards = Backbone.Collection.extend({

  initialize : function(models, options) {
    this.list = options.list;
  },

  url: 'api/cards',

  model: TrelloClone.Models.Card,

  sortBy : function(card) {
    card.get("ord");
  },

  getOrFetch: function (id) {
    var card = this.get(id),
      cards = this;
    if(!card) {
      card = new TrelloClone.Models.Card({ id: id });
      card.fetch({
        success: function () {
          cards.add(card);
        },
      });
    } else {
      card.fetch();
    }
    return card;
  }

})
