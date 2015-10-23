(function(root) {
  'use strict';
  var _comments = [];
  var COMMENTS_CHANGED_EVENT = "COMMENTS_CHANGED_EVENT";

  var updateComments = function(comments) {
    _comments = comments;
    CommentStore.emit(COMMENTS_CHANGED_EVENT);
  };

  var addComment = function(comment) {
    _comments.push(comment);
    CommentStore.emit(COMMENTS_CHANGED_EVENT);
  };

  root.CommentStore = $.extend({}, EventEmitter.prototype, {
    comments: function() {
      return _comments.slice();
    },
    addCommentsChangeListener: function(callback) {
      this.on(COMMENTS_CHANGED_EVENT, callback);
    },
    removeCommentsChangeListener: function(callback) {
      this.removeListener(COMMENTS_CHANGED_EVENT, callback);
    },
    dispatcherId: AppDispatcher.register(function(payload) {
      switch (payload.actionType) {
        case CommentConstants.COMMENTS_RECEIVED:
          updateComments(payload.comments);
          break;
        case CommentConstants.COMMENT_ADDED:
          addComment(payload.comment);
          break;
      }
    })
  });

}(this));
