TrelloClone.Models.Board = Backbone.Model.extend({
  urlRoot: "api/boards",

  lists : function() {
    if (!this._lists) {
      this._lists = new TrelloClone.Collections.Lists([], { board: this });
    }
    return this._lists;
  },


  parse : function(resp) {
    if (resp.lists) {
      this.lists().set(resp.lists, {parse: true});
      delete resp.lists;
    }
    return resp;
  },

  moveCard : function(senderListID, receiverListID, cardID) {
    var senderList = this.lists().get(senderListID);
    var card = senderList.cards().get(cardID);
    var receiverList = this.lists().get(receiverListID);
    receiverList.cards().add(senderList.cards().remove(card));
    card.set("list_id", receiverList.id);
    card.list = receiverList;
    card.save();
  },

  listOrds : function() {
    return this.lists().pluck("ord");
  },

  nextOrd : function() {
    if (Math.max.apply(null, this.listOrds()) < 0) {
      return 0;
    } else {
      return Math.max.apply(null, this.listOrds()) + 1;
    }
  }

})
