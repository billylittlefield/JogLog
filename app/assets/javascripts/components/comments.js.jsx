window.Comments = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return { comments: [], newComment: "" };
  },
  componentWillMount: function() {
    CommentStore.addCommentsChangeListener(this.updateComments);
  },
  componentWillUnmount: function() {
    CommentStore.removeCommentsChangeListener(this.updateComments);
  },
  updateComments: function() {
    this.setState({ comments: CommentStore.comments() });
  },
  createComment: function(e) {
    e.preventDefault();
    ApiUtil.createComment({ body: this.state.newComment,
                            author_id: window.CURRENT_USERID,
                            workout_id: this.props.workoutId });
    this.setState({ newComment: "" });
  },
  render: function() {
    return (
      <div className="comments-container">
        <h2>Comments</h2>
        <ul>
          {_.map(this.state.comments, function(comment) {
            return <li key={comment.id}>{comment.body}</li>;
            }
          )}
        </ul>
        <form onSubmit={this.createComment}>
          <textarea valueLink={this.linkState("newComment")}
                    placeholder="Add a new comment..."/>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
});
