TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
  template: JST["list_show"],
  tagName: "li",

  initialize : function(options) {
    this.boardListIndex = options.boardListIndex;
    this.listenTo(this.model, "sync change add", this.render)
    this.listenTo(this.model.cards(), "change add", this.render)
  },

  render : function() {
    var content = this.template({ list: this.model });
    this.$el.html(content);
    this.model.cards().each(function(card) {
      var cardShow = new TrelloClone.Views.CardShow({ model: card});
      this.addSubview(".cards", cardShow);
    }, this)
    var card = new TrelloClone.Models.Card({}, { list: this.model });
    this.addSubview(".new_card", new TrelloClone.Views.CardForm({ model: card }));
    return this;
  }

})
