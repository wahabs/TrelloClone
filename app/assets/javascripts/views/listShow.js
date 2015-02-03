TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
  template: JST["list_show"],
  tagName: "li",
  className: "list-show",

  events: {
    "click button.list-delete" : "destroyList",
    "sortreceive .cards" : "receiveCard",
    "sortupdate" : "updateOrds"
  },

  initialize : function(options) {
    this.board = options.board;
    this.listenTo(this.model, "sync change", this.render);
    this.listenTo(this.model.cards(), "add", this.addCard);
    this.listenTo(this.model.cards(), "remove", this.removeCard);
    this.listenTo(this.model.cards(), "sync add remove sort", this.render);

    this.model.cards().each(function(card) { this.addCard(card) }, this);
    var card = new TrelloClone.Models.Card({}, { list: this.model });
    this.addSubview(".new_card", new TrelloClone.Views.CardForm({ model: card }));

  },

  onRender : function() {
    Backbone.CompositeView.prototype.onRender.call(this);
    this.$(".cards").sortable({
      connectWith: ".cards",
    });
  },

  render : function() {
    var content = this.template({ list: this.model });
    this.$el.html(content);
    this.attachSubviews();
    this.onRender();
    return this;
  },

  destroyList : function(event) {
    this.model.destroy();
  },

  addCard : function(card) {
    var cardShow = new TrelloClone.Views.CardShow({ model: card });
    this.addSubview(".cards", cardShow);
  },

  removeCard : function(card) {
    var that = this;
    var subviewToRemove = _.findWhere(that.subviews(".cards"), { model: card } );
    this.removeSubview(".cards", subviewToRemove);
  },

  receiveCard : function(event, ui) {
    var cardID = ui.item.find(".card_title").data("id");
    var senderListID = ui.sender.data("list-id");
    var receiverListID = this.model.id;
    this.board.moveCard(senderListID, receiverListID, cardID);
  },

  updateOrds : function(event, ui) {
    var that = this;

    _(that.$(".cards").children()).each( function(card, i) {
      var oldOrd = $(card).find(".card_title").data("ord");
      var cardModel = that.model.cards().findWhere({ord: oldOrd});
      cardModel.set("ord", i);
      cardModel.save();
    });

    that.model.cards().sort();
  }

})
