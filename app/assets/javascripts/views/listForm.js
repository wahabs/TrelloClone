TrelloClone.Views.ListForm = Backbone.View.extend({
  template: JST["list_form"],
  tagName: "form",

  events: {
    "submit" : "createList"
  },

  render : function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  createList : function(event) {
    var that = this;
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    this.$('input#title').val('');
    that.model.set(formData);
    that.model.set("board_id", that.model.board.id);
    that.model.set("ord", that.model.board.nextOrd());
    that.model.save({}, {
      success: function() {
        that.model.board.lists().add(that.model);
        Backbone.history.navigate(
         "api/boards/" + that.model.get("board_id"), { trigger: true }
        )
        that.model = new TrelloClone.Models.List({}, { board: that.model.board });
      }
    });
  }

})
