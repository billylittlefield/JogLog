window.FollowButton = React.createClass({
  displayName: "FollowButton",

  getInitialState: function () {
    return { following: UserStore.isFollowing(this.props.followeeId) };
  },
  componentWillMount: function () {
    UserStore.addFolloweesChangeEventListener(this.updateFollow);
  },
  componentWillUnmount: function () {
    UserStore.removeFolloweesChangeEventListener(this.updateFollow);
  },
  updateFollow: function () {
    this.setState({ following: UserStore.isFollowing(this.props.followeeId) });
  },
  toggleFollow: function () {
    var followeeId = this.props.followeeId;
    var type = this.state.following ? "DELETE" : "POST";
    ApiUtil.toggleFollow(followeeId, type);
  },
  buttonText: function () {
    return this.state.following ? React.createElement(
      "span",
      { className: "unfollow" },
      "Unfollow"
    ) : React.createElement(
      "span",
      { className: "follow" },
      "Follow"
    );
  },
  bsStyle: function () {
    return this.state.following ? "danger" : "success";
  },
  button: function () {
    if (this.props.followeeId === window.CURRENT_USERID) {
      return React.createElement("div", null);
    } else {
      return React.createElement(
        ReactBootstrap.Button,
        { bsStyle: this.bsStyle(),
          onClick: this.toggleFollow },
        this.buttonText()
      );
    }
  },
  render: function () {
    return this.button();
  }
});