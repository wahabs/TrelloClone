TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({
  template: JST["boards_index"],

  initialize : function() {
    this.listenTo(this.collection, "sync", this.render)
    //this.subviews = {};
  },

  render: function() {
    var content = this.template({ boards: this.collection });
    this.$el.html(content);

    this.collection.each( function(board) {
      var item = new TrelloClone.Views.BoardsIndexItem({ model: board});
      this.addSubview($("#boards"), item);
    }, this)

    this.addSubview($("#new_board"), new TrelloClone.Views.BoardForm());
    return this;
  }

})
