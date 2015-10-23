window.FeedItemComments = React.createClass({
  getInitialState: function() {
    return { showComment: false, comments: this.props.comments };
  },
  toggleComments: function() {
    this.setState({ showComments: !this.state.showComments });
  },
  comments: function() {
    if (this.state.showComments) {
      return (
        <div>
          <ul>
            {this.commentItems()}
          </ul>
        </div>
      );
    }
  },
  commentItems: function() {
    return _.map(this.state.comments, function(comment) {
      return (
        <li>
          <div>
            {comment.author + " posted " + moment(comment.created_at).fromNow()}
          </div>
          <div>
            {comment.body}
          </div>
        </li>
      );
    });
  },
  render: function() {
    return (
      <div onClick={this.toggleComments} className="feed-item-comments">
        <img src="assets/glyphicons-310-comments2.png" className="glyphicon"/>
        <div>
          <span>{this.props.comments.length} Comments</span>
        </div>
        {this.comments()}
      </div>
    );
  }
});
