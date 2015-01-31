TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST["board_show"],

  initialize : function(options) {
    this.listenTo(this.model, "sync change add", this.render)
    this.listenTo(this.model.lists(), "change add", this.render)
  },

  render : function() {
    var content = this.template({ board: this.model });
    this.$el.html(content);

    this.model.lists().each( function(list) {
      // TODO: LIST NOT BEING FETCHED, DOESN'T HAVE AN ID
      var listShow = new TrelloClone.Views.ListShow({model: list});
      this.addSubview(".lists", listShow);
    }, this)

    var list = new TrelloClone.Models.List({}, { board: this.model });
    this.addSubview(".new_list", new TrelloClone.Views.ListForm({ model: list }));

    return this;
  }

})
