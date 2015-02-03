TrelloClone.Views.CardForm = Backbone.View.extend({
  template: JST["card_form"],
  tagName: "form",
  className: "card-form",
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
    that.$("input[type='text']").val("");
    that.model.set(formData);
    that.model.set("list_id", that.model.list.id);
    that.model.set("ord", that.model.list.nextOrd());
    that.model.save({}, {
      success: function() {
        that.model.list.cards().add(that.model);
        Backbone.history.navigate(
         "api/boards/" + that.model.list.get("board_id"), { trigger: true }
        )
        that.model = new TrelloClone.Models.Card({}, { list: that.model.list });
      }
    });
  }

})
