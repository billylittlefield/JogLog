(function(root) {
  'use strict';
  var _comments = {};
  var COMMENTS_CHANGED_EVENT = "COMMENTS_CHANGED_EVENT";

  var updateComments = function(workoutId, comments) {
    var key = "workout" + workoutId;
    _comments[key] = comments;
    CommentStore.emit(COMMENTS_CHANGED_EVENT);
  };

  var addComment = function(comment) {
    var key = "workout" + comment.workout_id;
    if (_comments[key] && _comments[key].length > 0) {
      _comments[key].push(comment);
    } else {
      _comments[key] = [comment];
    }
    CommentStore.emit(COMMENTS_CHANGED_EVENT);
  };

  root.CommentStore = $.extend({}, EventEmitter.prototype, {
    comments: function(workoutId) {
      var key = "workout" + workoutId;
      return _comments[key] ? _comments[key].slice() : [];
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
          updateComments(payload.workoutId, payload.comments);
          break;
        case CommentConstants.COMMENT_ADDED:
          addComment(payload.comment);
          break;
      }
    })
  });

}(this));
