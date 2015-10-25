window.FollowButton = React.createClass({
  getInitialState: function() {
    return { following: UserStore.isFollowing(this.props.followeeId )};
  },
  componentWillMount: function() {
    UserStore.addFolloweesChangeEventListener(this.updateFollow);
  },
  componentWillUnmount: function() {
    UserStore.removeFolloweesChangeEventListener(this.updateFollow);
  },
  updateFollow: function() {
    this.setState({ following: UserStore.isFollowing(this.props.followeeId) });
  },
  toggleFollow: function() {
    var followeeId = this.props.followeeId;
    var type = this.state.following ? "DELETE" : "POST";
    ApiUtil.toggleFollow(followeeId, type);
  },
  buttonText: function() {
    if (this.state.following) {
      return (
        <div>
          <span className="glyphicon glyphicon-minus"></span>
          <span className="unfollow">&nbsp;Unfollow</span>
        </div>
      );
    } else {
      return (
        <div>
          <span className="glyphicon glyphicon-plus"></span>
          <span className="follow">&nbsp;Follow</span>
        </div>
      );
    }
  },
  buttonClass: function() {
    var klass = "follow-button";
    if (this.state.following) {
      klass += " following";
    }
    return klass;
  },
  button: function() {
    if (this.props.followeeId === window.CURRENT_USERID) {
      return <div/>;
    } else {
      return (
        <div className={this.buttonClass()} onClick={this.toggleFollow}>
          {this.buttonText()}
        </div>
      );
    }
  },
  render: function() {
    return this.button();
  }
});
