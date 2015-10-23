window.Comments = React.createClass({
  displayName: "Comments",

  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function () {
    return { comments: [], newComment: "" };
  },
  componentWillMount: function () {
    CommentStore.addCommentsChangeListener(this.updateComments);
  },
  componentWillUnmount: function () {
    CommentStore.removeCommentsChangeListener(this.updateComments);
  },
  updateComments: function () {
    this.setState({ comments: CommentStore.comments() });
  },
  createComment: function (e) {
    e.preventDefault();
    ApiUtil.createComment({ body: this.state.newComment,
      author_id: window.CURRENT_USERID,
      workout_id: this.props.workoutId });
    this.setState({ newComment: "" });
  },
  render: function () {
    return React.createElement(
      "div",
      { className: "comments-container" },
      React.createElement(
        "h2",
        null,
        "Comments"
      ),
      React.createElement(
        "ul",
        null,
        _.map(this.state.comments, function (comment) {
          return React.createElement(
            "li",
            { key: comment.id },
            comment.body
          );
        })
      ),
      React.createElement(
        "form",
        { onSubmit: this.createComment },
        React.createElement("textarea", { valueLink: this.linkState("newComment"),
          placeholder: "Add a new comment..." }),
        React.createElement("input", { type: "submit", value: "Submit" })
      )
    );
  }
});