TrelloClone.Views.CardForm = Backbone.View.extend({
  template: JST["card_form"],
  tagName: "form",

  events: {
    "submit" : "createCard"
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
    that.model.set("list_id", that.model.list.id);
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
