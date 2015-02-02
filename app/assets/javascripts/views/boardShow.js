TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST["board_show"],

  initialize : function(options) {
    this.collection = this.model.lists();
    this.listenTo(this.model, "sync", this.render)
    this.listenTo(this.collection, "add", this.addList)
    this.model.lists().each(function(list) { this.addList(list) }, this)
    var list = new TrelloClone.Models.List({}, { board: this.model });
    this.addSubview(".new_list", new TrelloClone.Views.ListForm({ model: list }));
  },

  render : function() {
    var content = this.template({ board: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addList: function (list) {
    var listShow = new TrelloClone.Views.ListShow({ model: list});
    this.addSubview('.lists', listShow);
  },

})
