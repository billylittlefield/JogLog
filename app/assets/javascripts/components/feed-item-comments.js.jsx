window.FeedItemComments = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return { showComment: false, comments: this.props.comments, newComment: "" };
  },
  componentWillMount: function() {
    CommentStore.addCommentsChangeListener(this.updateComments);
    ApiUtil.getCommentsForWorkout(this.props.workoutId);
  },
  componentWillUnmount: function() {
    CommentStore.removeCommentsChangeListener(this.updateComments);
  },
  updateComments: function() {
    this.setState({ comments: CommentStore.comments(this.props.workoutId) });
  },
  toggleComments: function() {
    footerId = "workout-" + this.props.workoutId;
    $commentsFooter = $("#" + footerId);
    if ($commentsFooter.hasClass("expanded")) {
      $commentsFooter.removeClass("expanded");
    } else {
      $commentsFooter.addClass("expanded");
    }
    this.forceUpdate();
  },
  comments: function() {
    footerId = "workout-" + this.props.workoutId;
    if ($("#" + footerId).hasClass("expanded")) {
      return (
        <div className="comments-container">
          <ul>
            {this.commentItems()}
          </ul>
          {this.commentForm()}
        </div>
      );
    }
  },
  createComment: function(e) {
    e.preventDefault();
    ApiUtil.createComment({ body: this.state.newComment,
                            author_id: window.CURRENT_USERID,
                            workout_id: this.props.workoutId });
    this.setState({ newComment: "" });
  },
  commentForm: function() {
    return (
      <div className="form-container group">
        <form onSubmit={this.createComment}>
          <textarea valueLink={this.linkState("newComment")}
                    placeholder="Post a new comment..."/>
          <input className="feed-item-comment-submit" type="submit" value="Post"/>
        </form>
      </div>
    );
  },
  commentItems: function() {
    return _.map(this.state.comments, function(comment) {
      return (
        <li key={"comment_" + comment.id}>
          <span>{moment(comment.created_at).fromNow()}</span>
          <div className="comment-content">
            <a href={"#/users/" + comment.author_id}>{comment.author}</a>
            <span>{": " + comment.body}</span>
          </div>
        </li>
      );
    });
  },
  plural: function() {
    return this.state.comments.length === 1 ? "" : "s";
  },
  render: function() {
    var id = "workout-" + this.props.workoutId;
    return (
      <div className="feed-item-footer group" id={id}>
        <div onClick={this.toggleComments} className="feed-item-comments-header no-selection">
          <img src="assets/glyphicons-310-comments2.png" className="glyphicon"/>
          <span>{this.state.comments.length + " Comment" + this.plural()}</span>
          <span className="glyphicon glyphicon-chevron-left"></span>
        </div>
        {this.comments()}
      </div>
    );
  }
});
