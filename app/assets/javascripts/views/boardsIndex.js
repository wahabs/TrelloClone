TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({
  template: JST["boards_index"],

  initialize : function() {
    this.listenTo(this.collection, "sync remove", this.render);
    this.listenTo(this.collection, "add", this.addBoard);
    this.listenTo(this.collection, "remove", this.removeBoard);
  },

  render: function() {
    var content = this.template({ boards: this.collection });
    this.$el.html(content);
    this.collection.each( function(board) { this.addBoard(board) }, this)
    this.addSubview(".new_board", new TrelloClone.Views.BoardForm());
    return this;
  },

  addBoard : function(board) {
    var item = new TrelloClone.Views.BoardsIndexItem({ model: board });
    this.addSubview("#boards", item);
  },

  removeBoard : function(board) {
    var that = this;
    var subviewToRemove = _.findWhere(that.subviews("#boards"), { model: board } );
    this.removeSubview("#boards", subviewToRemove);
  }

})
