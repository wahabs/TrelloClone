TrelloClone.Views.CardForm = Backbone.View.extend({
  template: JST["card_form"],
  tagName: "form",
  className: "card-form",
  events: {
    "submit" : "createCard"
  },

  initialize : function(options) {
    // this.list_id = options.list_id;
  },

  render : function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  createCard : function(event) {
    event.preventDefault();
    var that = this;
    var formData = $(event.currentTarget).serializeJSON();
    that.model.set(formData);

    // Can't get list ID in a proper fashion. Fix this later.
    var list_id = that.model.list.id ||
                  (that.model.list.cards().first() && that.model.list.cards().first().get("list_id")) ||
                  null;
    that.model.set("list_id", list_id);
    that.model.save({}, {
      success: function() {
        that.model.list.cards().push(that.model);
        Backbone.history.navigate(
         "api/boards/" + that.model.list.get("board_id"), { trigger: true }
        )
      }
    });
  }

})
