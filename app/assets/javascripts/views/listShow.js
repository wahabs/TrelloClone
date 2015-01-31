TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
  template: JST["list_show"],
  tagName: "li",

  initialize : function(options) {
    this.boardListIndex = options.boardListIndex;
    this.listenTo(this.model, "sync change", this.render)
    this.listenTo(this.model.cards(), "add", this.addCard)
    this.listenTo(this.model.cards(), "remove", this.removeCard)
    this.listenTo(this.model.cards(), "sync add remove", this.render)
  },

  render : function() {
    var content = this.template({ list: this.model });
    this.$el.html(content);
    this.model.cards().each(function(card) { this.addCard(card) }, this)
    var card = new TrelloClone.Models.Card({}, { list: this.model });
    this.addSubview(".new_card", new TrelloClone.Views.CardForm({ model: card }));
    return this;
  },

  addCard : function(card) {
    var cardShow = new TrelloClone.Views.CardShow({ model: card });
    this.addSubview(".cards", cardShow);
  },

  removeCard : function(card) {
    var that = this;
    var subviewToRemove = _.findWhere(that.subviews(".cards"), { model: card } );
    this.removeSubview(".cards", subviewToRemove);
  }

})
