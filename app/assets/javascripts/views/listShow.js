TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
  template: JST["list_show"],
  tagName: "li",
  className: "list-show",
  initialize : function(options) {
    this.listenTo(this.model, "sync change", this.render);
    this.listenTo(this.model.cards(), "add", this.addCardShow);
    this.listenTo(this.model.cards(), "remove", this.removeCardShow);
    this.listenTo(this.model.cards(), "sync add remove sort", this.render);

    this.model.cards().each(function(card) { this.addCardShow(card) }, this);
    var card = new TrelloClone.Models.Card({}, { list: this.model });
    this.addSubview(".new_card", new TrelloClone.Views.CardForm({ model: card }));

  },

  render : function() {
    var content = this.template({ list: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addCardShow : function(card) {
    var cardShow = new TrelloClone.Views.CardShow({ model: card });
    this.addSubview(".cards", cardShow);
  },

  removeCardShow : function(card) {
    var that = this;
    var subviewToRemove = _.findWhere(that.subviews(".cards"), { model: card } );
    this.removeSubview(".cards", subviewToRemove);
  }

})
